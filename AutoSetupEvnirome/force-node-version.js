/*
 * TODO: Check if nvm is installed and suggest to install by this CLI code.
 * In case that developer dont't have nvm installed and ".nvmrc" automatically switch node version
 *
 * NOTE: In any case there there is: "engines.node": "REQUIRED_NODE_VERSION" is already defined at "pakage.json"
 * May be added to "preinstall": "node ./path/to/AutoSetupEvnirome.js",
*/
const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const requiredVersion = fs.readFileSync('.nvmrc', 'utf8').trim();

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkNvmInstallation() {
  try {
    // TODO: Better check if nvm is installed by attempting to get its version
    execSync('nvm --version', { stdio: 'ignore' }); // Ignore output
    console.log('nvm is already installed.');
  } catch (error) {
    console.error('nvm (Node Version Manager) is not installed.');
    askToInstallNvm();
  }
}

function askToInstallNvm() {
    read.question('Do you want to install The "nvm" package (yes, no): ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      installNvm();
      read.close();
      forceNodeVersion();
    } else {
      console.log('nvm installation skipped.');
      read.close();
    }
  });
  
}

function installNvm() {
  try {
    console.log('Attempt to install nvm...');
    execSync('curead -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash');
    console.info(`
        The "nvm" is installed\n
        Congrats, it's useful toll\m
        now it can automatically use ".nvmrc" config. 
        _________
        You might want to source the nvm script depending on your shell, e.g., for bash: source ~/.nvm/nvm.sh
        For "Deeper Shell Integration" follow https://github.com/nvm-sh/nvm?tab=readme-ov-file#deeper-shell-integration
    `);
  } catch (error) {
    console.error('Failed to install nvm:', error.message);
  }
}

function forceNodeVersion() {
  execSync('nvm install ' + requiredVersion)
  execSync('nvm use ' + requiredVersion)
}

checkNvmInstallation();



