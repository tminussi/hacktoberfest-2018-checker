# hacktoberfest-2018-checker

It checks your progress through Hacktoberfest 2018!

The project is very simple and great for beginners (experienced people are also welcome, of course. Afterall, there's always room for improvement).

It uses NodeJS and AWS Lambda. In order to mock AWS Lambda's behaviour, I am using the https://serverless.com/ framework.

Feel free to create a PR and help improving this project.

## How to run

### Backend

- Navigate to the **server** directory of the project and run **npm install**

If you use VisualCode, just open it and hit F5. It will start debugging at port 3000. If you don't, run **serverless offline start** from the command line and it will start a server at port 3000.

### Frontend

- Navigate to the **client** directory of the project and and run **npm install** and **npm start**

You can see the page in **http://localhost:8080/**

## Contributing

Take a look into the [CONTRIBUTING.md](https://github.com/tminussi/hacktoberfest-2018-checker/blob/master/CONTRIBUTING.md) file for any questions that may arise. You're also free to update that file.
