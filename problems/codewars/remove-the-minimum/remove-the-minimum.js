// https://www.codewars.com/kata/remove-the-minimum

function removeSmallest(numbers) {
  const m = Math.min(...numbers);
  const idx = numbers.indexOf(m);
  return numbers.filter((a, i) => i !== idx);
}

removeSmallest([1, 2, 3, 4, 5]);
