const ExpressError = require('./expressError');
const fs = require('fs');
const { resourceLimits } = require('worker_threads');

const getNums = (string)=>{
    const nums = string.split(',');  
    return nums.map( number => {
        //throw an error if any passed in value is not a valid number
        if (isNaN(number)) throw new ExpressError(`${number} is not a number!`,400);
        return parseInt(number)});
};

const getAvg = (numbersArr) =>{

    const sum = numbersArr.reduce((initialValue, nextValue)=>{

        return initialValue + nextValue
    }, 0);

    return sum / numbersArr.length;
};

const getMedian = (numbersArr) =>{
    const length = numbersArr.length;

    if(length % 2 === 0){
        const middleIndex = length / 2;
        return getAvg([numbersArr[middleIndex], numbersArr[middleIndex-1]]);

    } else {
        const middleIndex = Math.floor( length / 2)
        return numbersArr[middleIndex];
    }
}

const getMode = (numbersArr)=>{
    const numberCount = new Map();
    let highestCount = 0;
    let mode;

    for(let num of numbersArr){
        numberCount.set(num, (numberCount.get(num) + 1) || 1)
    };

    numberCount.forEach((value, key)=>{
        if(value > highestCount){
            highestCount = value;
            mode = key;
        }
    })

    return mode;
};

const saveResult = (result)=>{
    const newResult = {...result,
                       'timestamp': new Date().toLocaleString(),}
    fs.appendFile('./results.json',`\n${JSON.stringify(newResult)}`,'utf8',(err)=>{
        if(err){
            console.log(err);
        }
    })
};

module.exports = {getNums, getAvg, getMedian, getMode, saveResult};