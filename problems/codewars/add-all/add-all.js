// https://www.codewars.com/kata/add-all

const map = (x, fn) => fn(x);
const rec = (numbers, sum) => {
  if (numbers.length <= 1) return sum;
  return rec(...map(numbers.slice(0).sort((a, b) => a - b),
    ([a, b, ...rest]) => [rest.concat(a + b), sum + a + b]));
};

function addAll(numbers) {
  return rec(numbers, 0);
}

addAll([1, 2, 3, 4, 5]);
