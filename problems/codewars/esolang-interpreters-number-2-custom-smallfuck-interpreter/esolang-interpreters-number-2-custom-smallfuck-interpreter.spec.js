import { equal } from 'assert';
import interpreter from './esolang-interpreters-number-2-custom-smallfuck-interpreter';

describe('Your Interpreter', () => {
  it('should work for some example test cases', () => {
    equal(interpreter('*', '00101100'), '10101100');
    equal(interpreter('>*>*', '00101100'), '01001100');
    equal(interpreter('*>*>*>*>*>*>*>*', '00101100'), '11010011');
    equal(interpreter('*>*>>*>>>*>*', '00101100'), '11111111');
    equal(interpreter('>>>>>*<*<<*', '00101100'), '00000000');
  });
});
