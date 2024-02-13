### Run projects
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

Most compatable node version to run this app is defined at `package.json` at `engines.node` section
In addition project uses `.nvmrc` in case if `nvm` is installed and [Deeper Shell Integration](https://github.com/nvm-sh/nvm?tab=readme-ov-file#deeper-shell-integration) is configured.

Also repo contains [WIP implementation of force-node-version.js](wip-force-node-version.js-implementation)

### GitHub Actions
Repo uses GitHub Actions to publish app and docs to the gh-pages.

### App versions
The first version was made as basic monolit react App 
and can be found at first commit hash 2f67e05848bad01e903e77ec94afeef8453f1c81
It works well with SnackBar Notification as well
The latest version is refactored a lot abd decomposied but there is a but with SnackBar Notification (it doesn't shows)
decopose version commits goes from commit hash 78cb4a785d7dc102ae624ab7986ad1fbfafb13dd

### Repo also contains a lot of comments and jsDoc generation
To generate docs locally run `npm run jsdocs`
Docs can be found at `./jsdocs` folder.
In addition react-styleguidist and storybook can be added 
Also deployed on `/jsdoc` route.

### WIP force-node-version.js implementation
file `_draft/force-node-version.js`
It's tries to autmatically install `nvm` in case if developer do not use have Node Version Manager installed
and then set developer's node version to the same as defeined at `.nvmrc`

### SUggestion improvements
I wonder to get the balance in real time, to update it not based on events from a particular application.
But better to do that using the server side for better performance.
JS realtime balance basic example implementation can be found `./_draft/realtimeBalance.js`

- Server Side (on Go - I'm primarily attracted to its performance) 
- 100% protection against circumvention of Infura Restrict Project ID (API Key) Key Permissions which uses Access-Control-Allow-Origin to protect against exploitation of my infura key.
- Also in the future the server can be used for benefits offered by Project Secret (API Secret or Private Key).

Advantages of using the server side, as well as realtime balance:
- Even though it is possible to simply request the balance on the client, with each interaction with the dApp we create, there is a problem with a large number of different dApps used by the user at the same time or sending tokens directly from the wallet, it is more useful to know the balance not based on interactions with a particular dApp. 
- Even though this can be implemented on the client, the server is better suited for heavy computations assuming the speed I want to achieve by showing the wallet balance in real time. 
- Even though infura allows for Access-Control-Allow-Origin to restrict requests from other domains, there is a possibility of exploiting the api key.