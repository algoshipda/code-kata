import { equal } from 'assert';
import interpret from './befunge-interpreter';

describe('Your Interpreter', () => {
  it('should handle simple case', () => {
    equal(interpret([
      '>987v>.v',
      'v456<  :',
      '>321 ^ _@',
    ].join('\n')), '123456789');
  });

  it('should handle Hello World', () => {
    equal(interpret([
      '>              v',
      'v  ,,,,,"Hello"<',
      '>48*,          v',
      'v,,,,,,"World!"<',
      '>25*,@',
    ].join('\n')), 'Hello World!\n');
  });

  it('should handle quine', () => {
    equal(interpret('01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@'),
      '01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@');
  });
});
