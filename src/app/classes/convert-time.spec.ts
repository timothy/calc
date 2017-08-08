import {ConvertTime} from './convert-time';

describe('ConvertTime', () => {
  it('should create an instance', () => {
    expect(new ConvertTime()).toBeTruthy();
  });

  describe('Dec2Hour tests', () => {
    it('Positive input upper bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Hour(5.86)).toEqual(5);
    });

    it('Positive input lower bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Hour(5.2)).toEqual(5);
    });

    it('Negative input upper bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Hour(-5.86)).toEqual(-5);
    });

    it('Negative input lower bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Hour(-5.1)).toEqual(-5);
    });
  });


  describe('Dec2Min tests', () => {
    it('Positive input upper bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Min(5.86)).toEqual(52);
    });

    it('Positive input lower bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Min(5.1)).toEqual(6);
    });

    it('Negative input upper bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Min(-5.86)).toEqual(-52);
    });

    it('Negative input lower bound', () => {
      // const convert = new ConvertTime();
      expect(ConvertTime.Dec2Min(-5.1)).toEqual(-6);
    });
  });

});
