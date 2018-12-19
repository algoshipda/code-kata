import { equal } from 'assert';
import firstNonRepeatingLetter from './first-non-repeating-character';

describe('Simple Tests', () => {
  it('should handle simple tests', () => {
    equal(firstNonRepeatingLetter('a'), 'a');
    equal(firstNonRepeatingLetter('stress'), 't');
    equal(firstNonRepeatingLetter('moonmen'), 'e');
    equal(firstNonRepeatingLetter('7p6ue7p6ue5mzh5mzhrjwsrjws19i19idhkppdhkppg9xsfg9xsfg7wehg7wehted9dted9ddoqccdoqcc0savn0savnyhx7yhx72'), '2');
  });
});
