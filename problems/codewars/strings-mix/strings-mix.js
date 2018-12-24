// https://www.codewars.com/kata/strings-mix

const isLower = (c) => {
  const v = c.charCodeAt() - 'a'.charCodeAt();
  return 0 <= v && v < 26;
};

const m = s => s.split('')
  .filter(isLower)
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: (acc[cur] || 0) + 1,
  }), {});

function mix(s1, s2) {
  const m1 = m(s1);
  const m2 = m(s2);
  const used = Array.from(new Set([...Object.keys(m1), ...Object.keys(m2)]).keys());

  const prefix = (a, b) => {
    if (a === b) return '=';
    return a < b ? '2' : '1';
  };

  const merged = used.reduce((acc, k) => {
    const c1 = m1[k] || 0;
    const c2 = m2[k] || 0;
    const max = Math.max(c1, c2);
    if (max <= 1) return acc;
    return {
      ...acc,
      [k]: [prefix(c1, c2), max],
    };
  }, {});

  const ord = x => '12='.indexOf(x);

  return Object.entries(merged)
    .map(([k, [p, v]]) => [k.repeat(v)].concat([p, v]))
    .sort(([c1, p1, v1], [c2, p2, v2]) => {
      if (v1 !== v2) return v2 - v1;
      if (p1 !== p2) return ord(p1) - ord(p2);
      return c1.localeCompare(c2);
    })
    .map(([c, p]) => `${p}:${c}`)
    .join('/');
};

export default mix;
