/**
 * AWS Lambda
 * Name:            fn-randomuser
 * Author:          Spudmash Media
 * Version:         2017 v1
 * Description:     proxy function to 'randomuser.me' api
 * Notes:           
 * 
 *  ### AWS Lambda | Configuration | Handler ###
 * 
 *      this name is derived from
 * 
 *      [filename].[exports.<name>]
 * 
 *      for this function:
 *      filename:  index.js  (we only use 'index')
 *      exports:   exports.handler (we only use 'handler')
 * 
 *      the string value finally added to AWS Lambda configuration Handler text box is: "index.handler"
 * 
 * ### How to create Test ###
 * 
 *  to mimick the API Gateway body payload, make sure in API Gateway | your method | Integration Request | Body Mapping Template | Content-Type |set to 'application/json' + Generate tempate: Method Request Passthrough
 * 
 *  result of this is the ability to access the query strings values, headers etc... in JSON object format
 * 
 * Note, if you fire off a test from API Gateway test harness, you can see the Request Body payload (input for the Lambda)
 * 
 *  e.g. IF the API method had a question string of count=10, you can access "count" in the Lambda by event.params.querystring.count  (will return '10')
 *  
 *  ### Create Lambda Deployment package ###
 * 
 *  In terminal/console, run 'zip -r ../packagename.zip *',  then upload to Lambda console.
 * 
 */

var aws = require('aws-sdk');           // this node module is already present in Lambda environment, no need to add to node_modules folder
var rp = require('request-promise');    // additional node module, will need to npm i --save request-promise 

exports.handler = (event, context, callback) => {

    console.log('===before rp');

    console.log('event:', event);
    console.log('Body:', event.body);
    console.log('Headers:', event.headers);
    console.log('Method:', event.method);
    console.log('Params:', event.params);
    console.log('Query:', event.query);
    console.log('ENV TOP_TEN: ', process.env.TOP);

    var targetUrl = 'https://randomuser.me/api/';

    //TOP {x} route
    if(process.env.TOP !== undefined){
        targetUrl += "?results=" + process.env.TOP;
    }
    // Standard search
    else if (event.params !== undefined) {
        console.log('>>>query string: ' + event.params);
        targetUrl += "?results=" + event.params.querystring.c;
        console.log('>>>targetUrl: ' + targetUrl);
    }

    rp(targetUrl)
        .then(function (htmlString) {
            console.log('===+++rp then: ' + htmlString);
            callback(null, JSON.parse(htmlString));
        })
        .catch(function (err) {
            console.log('===+++rp else: ' + err);
            callback(err, null);
        })
    console.log('===rp end');
};