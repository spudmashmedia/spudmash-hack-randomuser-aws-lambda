# AWS Lambda function for API Gateway 
A sample Lambda function designed for API Gateway

## Requirements

- Nodejs 6.10  (TIP: use NVM to manage your node environment)
- node_modules:
    - request
    - request-promise

## Installation

1) run **build.sh***

```
> sh build.sh
```

3) in AWS Lambda console, create a new lambda, ignore the blueprint, instead of writing code in textbox, select upload zip, upload fn-my-lambda.zip. continue with the wizard steps.


## Notes
### AWS Lambda | Configuration | Handler ###
  
This name is derived from ```[filename].[exports.<name>]```

For this function:

**filename:**  index.js  (we only use 'index')

**exports:**   exports.handler (we only use 'handler')

 the string value finally added to AWS Lambda configuration Handler text box is: **"index.handler"**
  
### How to create Test ###
  
To mimick the API Gateway body payload, make sure in API Gateway | your method |Integration Request | Body Mapping Template | Content-Type |set to'application/json' + Generate tempate: Method Request Passthrough

Result of this is the ability to access the query strings values, headers etc...in JSON object format
  
Note: if you fire off a test from API Gateway test harness, you can see the Request Body payload (input for the Lambda)
  
e.g. IF the API method had a question string of count=10, you can access "count" in the Lambda by ```event.params.querystring.count```  (will return '10')
   

### Off topic: AWS Gateway, Custom Domain Name ###

To mask the auto gen API Gateway hostname with a custom one like 'api.myhostname.com',
goto: API Gateway | Custom Domain Names| Create Custom Domain Name.

The gotcha here is, you need to create a ACM Certificate in North Virginia (us-east-1) -> which also means your API needs to reside in North Virginia.
However once setup, your API can point to Lambdas in ANY region.

Once you press create, it will take > 1hour (although it says 40mins, it took 1-2hours) to create as it is creating a Cloudfront service and replicating across the CDN.

once completed, copy the **Distributed Domain Name** and head over to Route53 to create an A record with an alias to distributed domain name.
Once set, api should be accessible via 'api.myhostname.com'

Also note, access can still be achieved via:
- distributed domain name
- api gateway generated name

so make sure each route utilises a Usage Plan + accessed by an API Key (trivial setup).

### Off topic : AWS API Gateway, making modifications ###
when ever you tweak something in the API, make sure you redeploy to appropriate staging environment. Changes do not automatically replicate!!!

- especially important if you've just turned on "Use API Key" for a method - endpoints will remain unprotected until you redeploy!!!!!!!!


### Off topic: AWS API Gateway Usage Plan Quota throttling

- To reset a Usage Plan when calls exceed limit, goto Usage Plan | API Keys | choose key | Click Exension | grant extension by number

Or Hard Reset:

```Edit | disable Quota | renable Quota | Save```


## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History
- V1



## License
Copyright @ 2017 Spudmash Media Pty Ltd