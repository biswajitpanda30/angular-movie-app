import { StringWithCommas } from './string-with-commas.pipe';

describe('StringWithCommas', () => {
  const pipe = new StringWithCommas();

  it('should replace commas in string with |', () => {
    expect(pipe.transform('ABC,CDE')).toEqual('ABC | CDE');
  });

  it('should test when no commas present it should return the original string', () => {
    expect(pipe.transform('ABC')).toEqual('ABC');
  });
});
