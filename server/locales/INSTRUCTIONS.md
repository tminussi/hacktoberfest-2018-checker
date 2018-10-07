# How to add a new language

To add a new language, you need to create a directory named after the language you want to add (eg: if you want to add French, create a dir **server/locales/fr**) and create the files **client.json** and **server.json** (or copy them from another language).

Then import the **server.json** file in **server/locales/index.js** and add its code to the whitelist.

You will also need to add your language in the client project, in the _LOCALES_OPTIONS_ constant at the top of **client/src/app/index.js**
