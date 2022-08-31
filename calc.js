const express = require('express');
const ExpressError = require('./expressError');
const {getNums, getAvg, getMedian, getMode, saveResult} = require('./helpers');
const app = express();

app.get('/', (req, resp, next)=>{
    return resp.send("Homepage")
});

app.get('/mean', (req, resp, next)=>{
    try {
        if(req.query.nums === undefined || req.query.nums === "") {
            throw new ExpressError("Numbers are required",400);
        };
        const numbers = getNums(req.query.nums);
        const mean = getAvg(numbers);
        const result = {operation:"mean",
                        value:mean};
        
        if(req.query.save === "true") saveResult(result);
        return resp.json(result);
    } catch (err) {
        return next(err)
    }

});

app.get('/median', (req, resp, next)=>{
    const numbers = getNums(req.query.nums);
    const median = getMedian(numbers);
    const result = {operation:"median",
                    value:median};

    if(req.query.save === "true") saveResult(result);
    return resp.json(result);
});

app.get('/mode', (req, resp, next)=>{
    const numbers = getNums(req.query.nums);
    const mode = getMode(numbers);
    const result = {operation:"mode",
                    value:mode};

    if(req.query.save === "true") saveResult(result);
    return resp.json(result);
});

app.get('/all', (req, resp, next)=>{
    const numbers = getNums(req.query.nums);
    const mean = getAvg(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const result = {operation:"all",
                    mean:mean,
                    median:median,
                    mode: mode,};
    debugger;
    if(req.query.save === "true") saveResult(result);
    return resp.json(result);
});

// 404 handler
app.use((req, res, next) => {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
  });

// global error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

app.listen(3000, ()=>{
    console.log('App on port 3000');
  }) 