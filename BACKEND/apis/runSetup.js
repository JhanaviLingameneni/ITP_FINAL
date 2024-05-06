
const { exec } = require('child_process');
const fs = require('fs');

function runSetupCommand(argument, callback) {
    exec(`xc s vm ${argument}` , (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error executing command: ${error || stderr}`);
            callback(new Error('Command execution failed'));
            return;
        }
        callback(null, stdout);
    });
}

module.exports = runSetupCommand;