// https://www.codewars.com/kata/befunge-interpreter

const takeRight = (a, n = 1) => a.slice(a.length - n);
const last = a => a[a.length - 1];
const dropRight = (a, n = 1) => a.slice(0, a.length - n);
const concat = (a, b) => a.concat(b);
const copy = a => JSON.parse(JSON.stringify(a));

function reducer() {
  const transition = {};
  const binaryOp = fn => (state) => {
    const { stack } = state;
    const [b, a] = takeRight(stack, 2);
    return Object.assign({}, state, {
      stack: concat(dropRight(stack, 2), fn(a, b)),
    });
  };

  for (let i = 0; i < 10; i += 1) {
    transition[i] = (state) => {
      const { stack } = state;
      return Object.assign({}, state, {
        stack: concat(stack, i),
      });
    };
  }

  [
    ['+', (a, b) => a + b],
    ['-', (a, b) => b - a],
    ['*', (a, b) => a * b],
    ['/', (a, b) => (a ? Math.floor(b / a) : 0)],
    ['%', (a, b) => (a ? b % a : 0)],
    ['`', (a, b) => (b > a ? 1 : 0)],
  ].forEach(([op, fn]) => {
    transition[op] = binaryOp(fn);
  });

  transition['!'] = (state) => {
    const { stack } = state;
    return Object.assign({}, state, {
      stack: concat(dropRight(stack), last(stack) ? 0 : 1),
    });
  };

  const changeDir = (dx, dy) => state => Object.assign({}, state, {
    dx,
    dy,
  });

  const goFn = [
    ['>', [0, 1]],
    ['v', [1, 0]],
    ['<', [0, -1]],
    ['^', [-1, 0]],
  ];
  goFn.forEach(([op, [ndx, ndy]]) => {
    transition[op] = changeDir(ndx, ndy);
  });

  transition['?'] = (state) => {
    const [dx, dy] = goFn[Math.floor(Math.random() * 4)][1];
    return Object.assign({}, state, {
      dx,
      dy,
    });
  };

  transition['_'] = (state) => {
    const { stack } = state;
    return Object.assign({}, state, {
      stack: dropRight(stack),
      dx: 0,
      dy: last(stack) === 0 ? 1 : -1,
    });
  };

  transition['|'] = (state) => {
    const { stack } = state;
    return Object.assign({}, state, {
      stack: dropRight(stack),
      dx: last(stack) === 0 ? 1 : -1,
      dy: 0,
    });
  };

  transition[':'] = (state) => {
    const { stack } = state;
    return Object.assign({}, state, {
      stack: concat(stack, (last(stack) || 0)),
    });
  };

  transition['\\'] = (state) => {
    const { stack } = state;
    const [a, b] = takeRight(stack, 2);
    return Object.assign({}, state, {
      stack: concat(dropRight(stack, 2), [b || 0, a]),
    });
  };

  transition['$'] = (state) => {
    const { stack } = state;
    return Object.assign({}, state, {
      stack: dropRight(stack),
    });
  };

  transition[' '] = state => state;

  transition['.'] = (state) => {
    const { output, stack } = state;
    return Object.assign({}, state, {
      output: concat(output, last(stack)),
      stack: dropRight(stack),
    });
  };

  transition[','] = (state) => {
    const { output, stack } = state;
    return Object.assign({}, state, {
      output: concat(output, String.fromCharCode(last(stack))),
      stack: dropRight(stack),
    });
  };

  transition['p'] = (state) => {
    const { stack, code } = state;
    const [v, x, y] = takeRight(stack, 3);
    const c = copy(code);
    c[y][x] = String.fromCharCode(v);
    return Object.assign({}, state, {
      code: c,
      stack: dropRight(stack, 3),
    });
  };

  transition['g'] = (state) => {
    const { stack, code } = state;
    const [x, y] = takeRight(stack, 2);
    return Object.assign({}, state, {
      stack: concat(dropRight(stack, 2), code[y][x].charCodeAt()),
    });
  };

  return (state) => {
    const { stack, code, x, y, skip, string } = state;
    const c = code[x][y];
    const ns = (function f() {
      if (skip) return Object.assign({}, state, { skip: false });
      if (c === '#') return Object.assign({}, state, { skip: true });
      if (c === '"') return Object.assign({}, state, { string: !string });
      if (string) {
        return Object.assign({}, state, {
          stack: concat(stack, c.charCodeAt()),
        });
      }
      return transition[c](state);
    }());
    const nx = ns.dx + x;
    const ny = ns.dy + y;
    return {
      ...ns,
      x: nx,
      y: ny,
    };
  };
}

function interpret(_code) {
  const code = _code.split('\n').map(s => s.split(''));

  let state = {
    string: false,
    skip: false,
    output: [],
    stack: [],
    code,
    dx: 0,
    dy: 1,
    x: 0,
    y: 0,
  };

  const r = reducer();
  while (state.code[state.x][state.y] !== '@') {
    state = r(state);
  }
  return state.output.join('');
}

export default interpret;
