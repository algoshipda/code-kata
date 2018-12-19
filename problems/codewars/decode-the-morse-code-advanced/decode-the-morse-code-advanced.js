// https://www.codewars.com/kata/decode-the-morse-code-advanced

/* global MORSE_CODE */
function decodeBits(_bits) {
  const bits = _bits.replace(/^0+|0+$/gm, '');
  const period = ((bi) => {
    let cnt = 0;
    const s = new Set();
    for (let i = 0; i < bi.length; i += 1) {
      if (i === 0 || bi[i] !== bi[i - 1]) cnt = 0;
      cnt += 1;
      if (i + 1 === bi.length || bi[i] !== bi[i + 1]) s.add(cnt);
    }
    const keys = Array.from(s.keys()).sort((a, b) => a - b);
    if (keys.length % 2 === 1) return keys[0];
    if (keys[0] * 3 === keys[1] || keys[0] * 7 === keys[1]) return keys[0];
    return keys[1] / 3;
  })(bits);

  const d = x => x.split('0').map(q => (q.length === 1 ? '.' : '-')).join('');
  const chars = c => c.split('0'.repeat(3))
    .map(d)
    .join(' ');
  const words = s => s.split('0'.repeat(7))
    .map(chars)
    .join(' '.repeat(3));
  const norm = bits.split('')
    .filter((a, i) => i % period === 0)
    .join('');
  return words(norm);
}

function decodeMorse(morseCode) {
  return morseCode.split(' '.repeat(3))
    .map(w => w.split(' ').map(c => MORSE_CODE[c]).join(''))
    .join(' ');
}
