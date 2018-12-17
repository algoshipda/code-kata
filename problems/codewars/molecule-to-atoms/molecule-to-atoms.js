// https://www.codewars.com/kata/molecule-to-atoms

function* tokenize(form) {
  const negate = fn => (...args) => !fn(...args);
  const minus = (a, b) => a.charCodeAt(0) - b.charCodeAt(0);
  const isRange = (x, l, r) => l <= x && x < r;
  const is = (x, l, r) => c => isRange(minus(c, x), l, r);
  const isUpper = is('A', 0, 26);
  const isLower = is('a', 0, 26);
  const isDigit = is('0', 0, 10);
  const stubTrue = () => true;
  const atom = x => ['a', x];
  const num = x => ['n', parseInt(x, 10)];
  const bracket = x => ['b', '({['.includes(x) ? '(' : ')'];

  const f = `${form}#`.split('');
  let idx = 0;
  const len = form.length;
  const mat = x => ([fn]) => fn(x);
  while (idx < len) {
    const [, cond, mapper] = [
      [isUpper, isLower, atom],
      [isDigit, isDigit, num],
      [stubTrue, negate(stubTrue), bracket],
    ].find(mat(form[idx]));
    const nxt = f.slice(idx + 1).findIndex(negate(cond)) + idx + 1;
    yield mapper(form.substring(idx, nxt));
    idx = nxt;
  }
}

function parseMolecule(formula) {
  // do your science here
  const last = x => x[x.length - 1];
  const drop = x => x.slice(0, x.length - 1);
  const mergeOp = (acc, [k, v]) => ({ ...acc, [k]: (acc[k] || 0) + v });
  const mergeAll = arr => arr.reduce(mergeOp, {});
  const merge = arr => mergeAll(
    arr.reduce((acc, cur) => acc.concat(Object.entries(cur)), []),
  );
  const mult = (m, n) => mergeAll(Object.entries(m).map(([k, v]) => [k, v * n]));
  const map = (a, fn) => fn(a);
  const devide = (arr, idx) => [arr.slice(0, idx), arr.slice(idx + 1)];

  const fns = {
    a: (prv, cur) => prv.concat({ [cur]: 1 }),
    n: (prv, cur) => drop(prv).concat(mult(last(prv), cur)),
    b: (prv, cur) => (cur === '('
      ? prv.concat(cur)
      : map(devide(prv, prv.lastIndexOf('(')),
        ([left, right]) => left.concat(merge(right)))
    ),
  };
  const ans = Array
    .from(tokenize(formula))
    .reduce((stk, [t, v]) => fns[t](stk, v), []);
  return merge(ans);
}

parseMolecule('H2O');
