## Table of Contents  
- [How to run](#run-project)  
- [About node versions](#about-node-versions)
- [WIP force-node-version.js implementation](#wip-force-node-version-implementation)
- [GitHub Actions](#github-actions)
- [App versions](#app-versions)
- [jsDoc generation](#repo-also-contains-a-lot-of-comments-and-jsdoc-generation)
- [Proposed improvements](#proposed-improvements)

---

### Run project
Install dep
`npm i`
or 
`yarn`

Run the app
`npm start`
or
`yarn start`

Build
`npm build`
`yarn build`

Build docs
`npm run docs`

### About node versions
Most compatable node version to run this app is defined at `package.json` at `engines.node` section
In addition project uses `.nvmrc` in case if `nvm` is installed and [Deeper Shell Integration](https://github.com/nvm-sh/nvm?tab=readme-ov-file#deeper-shell-integration) is configured.

Also repo contains [WIP implementation of force-node-version.js](#wip-force-node-version.js-implementation)

### WIP force-node-version implementation
file `_draft/force-node-version.js`
It's tries to autmatically install `nvm` in case if developer do not use have Node Version Manager installed
and then set developer's node version to the same as defeined at `.nvmrc`

### GitHub Actions
Repo uses GitHub Actions to publish app and docs to the gh-pages.
Latest version is published at https://shapkarin.github.io/jsweb3
Generated JSDoc can be found at https://shapkarin.github.io/jsweb3/jsdoc/

### App versions
The first version was made as basic monolit react App 
and can be found at [simple-version branch](https://github.com/shapkarin/jsweb3/tree/simple-version) - that works well with `SnackBar Notification`

The latest version is refactored a lot abd decomposied but there is a bug with SnackBar Notification 
Yes, notifications are not nessesary for the assigment but it's nice to have and it works well at `simple-version branch`
<img width="405" alt="Screenshot 2024-02-14 at 01 21 58" src="https://github.com/shapkarin/jsweb3/assets/1463086/77a8122a-ee3d-4559-b866-0b098b9d91dc">
<img width="430" alt="Screenshot 2024-02-14 at 01 22 11" src="https://github.com/shapkarin/jsweb3/assets/1463086/ad237dff-8bff-4a80-84cb-e2506603566b">

### Repo also contains a lot of comments and jsDoc generation
To generate docs locally run `npm run jsdocs`
Docs can be found at `./jsdocs` folder.
In addition react-styleguidist and storybook can be added 
Also deployed on https://shapkarin.github.io/jsweb3/jsdoc/

### Proposed improvements
I wonder to get the balance in real time, to update it not based on events from a particular application.
But better to do that using the server side for better performance.
JS realtime balance basic example implementation can be found `./_draft/realtimeBalance.js`

- Share states
  - Add [React Providers and Contexts](https://react.dev/reference/react/createContext) to share states
  - or use state managment, for example [Redux](https://redux.js.org/) + [Redux-Toolkit](https://redux-toolkit.js.org/)
- Server Side (on Go - I'm primarily attracted to its performance) 
- 100% protection against circumvention of Infura Restrict Project ID (API Key) Key Permissions which uses Access-Control-Allow-Origin to protect against exploitation of my infura key.
- Also in the future the server can be used for benefits offered by Project Secret (API Secret or Private Key).

Advantages of using the server side, as well as realtime balance:
- Even though it is possible to simply request the balance on the client, with each interaction with the dApp we create, there is a problem with a large number of different dApps used by the user at the same time or sending tokens directly from the wallet, it is more useful to know the balance not based on interactions with a particular dApp. 
- Even though this can be implemented on the client, the server is better suited for heavy computations assuming the speed I want to achieve by showing the wallet balance in real time. 
- Even though infura allows for Access-Control-Allow-Origin to restrict requests from other domains, there is a possibility of exploiting the api key.
