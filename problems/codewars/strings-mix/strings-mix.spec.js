import { equal } from 'assert';
import mix from './strings-mix';

describe('test1', () => {
  it('should handle1', () => {
    equal(mix('Are they here', 'yes, they are here'), '2:eeeee/2:yy/=:hh/=:rr');
  });

  it('should handle2', () => {
    equal(mix('looping is fun but dangerous', 'less dangerous than coding'), '1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg');
  });
  it('should handle3', () => {
    equal(mix(' In many languages', " there's a pair of functions"), '1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt');
  });
  it('should handle4', () => {
    equal(mix('Lords of the Fallen', 'gamekult'), '1:ee/1:ll/1:oo');
  });
  it('should handle5', () => {
    equal(mix('codewars', 'codewars'), '');
  });
  it('should handle6', () => {
    equal(mix('A generation must confront the looming ', 'codewarrs'), '1:nnnnn/1:ooooo/1:tttt/1:eee/1:gg/1:ii/1:mm/=:rr');
  });
});
