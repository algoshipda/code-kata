// https://www.codewars.com/kata/esolang-interpreters-number-2-custom-smallfuck-interpreter

function interpreter(code, _tape) {
  const tape = _tape.split('').map(x => parseInt(x, 10));
  const mat = (() => {
    const stk = [];
    const ret = {};
    for (let i = 0; i < code.length; i += 1) {
      if (code[i] === '[') {
        stk.push(i);
      } else if (code[i] === ']') {
        const [a, b] = [stk.pop(), i];
        ret[a] = b;
        ret[b] = a;
      }
    }
    return ret;
  })();
  let p = 0;
  for (let i = 0; i < code.length && 0 <= p && p < tape.length; i += 1) {
    switch (code[i]) {
      case '*': tape[p] = 1 - tape[p];
        break;
      case '<': p -= 1;
        break;
      case '>': p += 1;
        break;
      case '[': if (!tape[p]) i = mat[i];
        break;
      case ']': if (tape[p]) i = mat[i];
        break;
      default:
    }
  }
  return tape.join('');
}

export default interpreter;
