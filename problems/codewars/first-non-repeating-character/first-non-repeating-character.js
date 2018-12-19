export default function firstNonRepeatingLetter(s) {
  const scode = s.toLowerCase()
    .split('');
  const count = scode
    .reduce((acc, cur) => ({
      ...acc,
      [cur]: (acc[cur] || 0) + 1,
    }), {});
  return s[scode.findIndex(a => count[a] === 1)] || '';
}
