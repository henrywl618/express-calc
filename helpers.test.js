const {getNums, getAvg, getMedian, getMode} = require('./helpers');

describe('test operations',()=>{

    const numbers = [1,2,2,2,3,3,4,5];

    test("mean operation",()=>{
        expect(getAvg(numbers)).toEqual(2.75);
    });

    test("median operation", ()=>{
        expect(getMedian(numbers)).toEqual(2.5);
    });

    test("mode operation", ()=>{
        expect(getMode(numbers)).toEqual(2);
    });
});