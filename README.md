# **Welcome to Nodejs Log Parser! 👋**
## About
A log parser command line application built using Node.js and TypeScript which parses the input log file (see Input Example) to a JSON file.
The application finds all the log messages with the level error and print them into the output file (see Output Format).
The log file format includes a timestamp, log level, transaction ID, and details.

## **Run Locally**
Clone the project:
```bash
git clone http://berbob-gmbh-wzzqse@git.codesubmit.io/berbob-gmbh/nodejs-logger-hzpvkj
```

Go to the project directory:
```bash
cd nodejs-logger-hzpvkj 
```

Install dependencies:
```bash
npm i 
```

Build the app:
```bash
npm run build
```

Navigate to entry point directory:
```bash
cd dist 
```

Execute the app with the command:
```bash
node parser.js --input PATH_TO_LOG_FILE --output PATH_TO_OUTPUT_FILE
```

## Input Format

```text
<ISO Date> - <Log Level> - {"transactionId: "<UUID>", "details": "<message event/action description>", "err": "<Optional, error description>", ...<additional log information>}
```

## Input Example

```text
2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request user orders list","userId": 10}
2021-08-09T02:12:51.255Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is started"}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request the user information","userId": 16}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"User information is gathered","user":{"id":10,"name":"Alice"}}
2021-08-09T02:12:51.258Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request user orders list","userId":16}
2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}
2021-08-09T02:12:51.259Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user": {"id": 16, "name": "Michael"}}
2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}
2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}
2021-08-09T02:12:51.265Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}
```

## Output Format

```text
[{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId: "<UUID>", "err": "<Error message>" }]
```

## Output Example

```text
[{"timestamp":1628475171259,"loglevel":"error","transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","err":"Not found"}]
```
