# Adding a new language

To add a new language, you need to create a directory named after the language you want to add (eg: if you want to add French, create a dir **server/locales/fr**) and create/copy from another language the files **client.json** and **server.json**.

You will also need to add your language on the client side, in the _LOCALES_OPTIONS_ constant at the top of **client/src/app/index.js**, and on the server
side in the **server/locales/index.js** in the _resource_ object (like we did with _en_)
