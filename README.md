# airtable-api-proxy

## Firebase Functions with Babel config to target the correct Execution Environment

Based on the work of [jthegedus](https://github.com/jthegedus/blog-code/blob/master/firebase-functions-es6-babel)

Use Babel to target the correct execution environment for Cloud Functions for
Firebase and use modern languages features (ES6+) to develop.

Here is the accompanying
[Medium post](https://medium.com/@jthegedus/es6-in-cloud-functions-for-firebase-2-415d15205468).

## Project Layout Description

I suggest developing your Cloud Functions in the `src/functions/` directory and output everything to a `dist/functions/` folder. By using a single root `package.json` we remove the need for maintaining and possibly merging two or more for the Functions themselves and other code, like a frontend app.

Use `@babel/core`, `@babel/cli` and `@babel/preset-env` with some npm scripts to compile to the Cloud Functions server runtime of NodeJS v6.11.5. The output directory, `dist/functions/` is created on compilation in the deploy step (yarn deploy).

Firebase predeploy scripts are used in the `firebase.json` to coordinate which npm scripts get called before deploying to ensure everything is built.

## Download & Install

```shell
# Clone this dir
git clone git@github.com:enspiral/airtable-api-proxy.git
cd airtable-api-proxy
npm install
```

## Login to the Firebase CLI

If you're using `firebase-tools` globally, then skip to the [_Deploy to Firebase_](#deploy-to-firebase) step.

```shell
npm run login
```

## Local Testing

```shell
npm run serve
```

## Deploy to Firebase

Update `.firebaserc` to use your Firebase project id.

```shell
npm run deploy
```