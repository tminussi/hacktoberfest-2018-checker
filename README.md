![App-front](doc-images/App-front.JPG)

# hacktoberfest-2018-checker

It checks your progress through Hacktoberfest 2018!

The project is very simple and great for beginners (experienced people are also welcome, of course. Afterall, there's always room for improvement).

It uses NodeJS and AWS Lambda. In order to mock AWS Lambda's behaviour, I am using the https://serverless.com/ framework.

Feel free to create a PR and help improving this project.

## How to run

1. Navigate to the **server** directory of the project and run **npm install** in your command prompt
2. Navigate to the **client** directory of the project and open the **index.html** file in your web browser

## Other features

- If you use VisualCode, just open it and hit F5. It will start debugging at port 3000.

- If you are someone who prefers the cli just run
```
$: npm run local
$: npm run local -- --port 5000 # optionally on a diffrent port

 ```
This also by default starts the server on port 3000, but if you prefer
to change it you can, by passing --port 3001 and also remember to update
the port address index.js in frontend client folder.


## Backend Testing

Unit tests, watch and coverage:
```
npm test
npm test -- --watch
npm test -- --coverage
```

Currently, coverage is 100% for `server` folder.

## Contributing

Take a look into the [CONTRIBUTING.md](https://github.com/tminussi/hacktoberfest-2018-checker/blob/master/CONTRIBUTING.md) file for any questions that may arise. You're also free to update that file.

## Helpful Resources

- [Git API](https://developer.github.com/v3/?)
- [Serverless](https://serverless.com/framework/docs/)
