// https://www.codewars.com/kata/prize-draw

function rank(st, we, n) {
  if (st.length === 0) return 'No participants';
  if (n > we.length) return 'Not enough participants';
  const arr = st.split(',').map(s => s.trim());
  const zip = (a, b) => {
    const ret = [];
    const len = a.length;

    for (let i = 0; i < len; i += 1) {
      ret[i] = [a[i], b[i]];
    }
    return ret;
  };
  const score = str => str.length + str.split('').reduce((acc, cur) => acc + cur.charCodeAt(0) - 'a'.charCodeAt(0) + 1, 0);
  return zip(arr, we).map(([name, w]) => [name, score(name.toLowerCase()) * w])
    .sort(([af, as], [bf, bs]) => (bs - as) * 10000
      + af.toLowerCase().localeCompare(bf.toLowerCase()))[n - 1][0];
}

rank('Addison,Jayden,Sofia,Michael,Andrew,Lily,Benjamin', [4, 2, 1, 4, 3, 1, 2], 4);
