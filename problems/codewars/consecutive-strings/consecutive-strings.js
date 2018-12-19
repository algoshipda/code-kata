// https://www.codewars.com/kata/consecutive-strings

export default function longestConsec(strarr, k) {
  const n = strarr.length;
  if (n === 0 || k > n || k <= 0) return '';
  let ans = '';
  for (let i = 0; i + k <= n; i += 1) {
    const s = strarr.slice(i, i + k).join('');
    if (ans.length < s.length) {
      ans = s;
    }
  }
  return ans;
}
