![App-front](doc-images/App-front.JPG)

# hacktoberfest-2018-checker

This checks your progress through Hacktoberfest 2018!

The project is very simple and great for beginners. Experienced people are also welcome, of course; afterall, there's always room for improvement.

It uses NodeJS and AWS Lambda. In order to mock AWS Lambda's behaviour, this project uses the https://serverless.com/ framework.

Feel free to create a pull request to help improve this project.

## How to run

1. Navigate to the `server` directory of the project and run `npm install` in your command prompt
2. Navigate to the `client` directory of the project and open the `index.html` file in your web browser

## Other features

- If you use Visual Stuido Code, just open the directory and hit F5. VSC will start debugging at port 3000.

- If you are someone who prefers the CLI, run:

```
$: npm run local
$: npm run local -- --port 5000 # optionally on a diffrent port
```

By default, this starts the server on port 3000. If you prefer
to change it you can, by passing `--port 3001` and also remember to update
the port address in `index.js` which is in the frontend `client` folder.


## Backend Testing

For unit tests, watch, and coverage, run the following:

```
npm test
npm test -- --watch
npm test -- --coverage
```

_Currently, `coverage` is only for `server` folder._

### Frontend

- Navigate to the **client** directory of the project and and run **npm install** and **npm start**

You can see the page in **http://localhost:8080/**

## Contributing

Take a look at the [CONTRIBUTING.md](https://github.com/tminussi/hacktoberfest-2018-checker/blob/master/CONTRIBUTING.md) file for any questions that may arise. You're also free to update that file as needed!

## Helpful Resources

- [Git API](https://developer.github.com/v3/?)
- [Serverless](https://serverless.com/framework/docs/)
