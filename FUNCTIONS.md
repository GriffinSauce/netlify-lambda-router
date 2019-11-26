# Functions

Notes about the functions.

## Input event:

```
{
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name"
    "headers": { <Incoming request headers> }
    "queryStringParameters": { <Query string parameters> }
    "body": "A JSON string of the request payload."
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}
```

## Return output:

```
{
    "isBase64Encoded": boolean,
    "statusCode": 200 | 204 | 400 | etc,
    "headers": { <headers> },
    "body": string
}
```
