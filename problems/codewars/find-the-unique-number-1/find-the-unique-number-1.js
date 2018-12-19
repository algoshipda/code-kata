// https://www.codewars.com/kata/find-the-unique-number-1

function findUniq(arr) {
  // do magic
  const a = arr.slice(0).sort();
  return a[0] === a[1] ? a.pop() : a[0];
}

findUniq([1, 1, 1, 2, 1]);
