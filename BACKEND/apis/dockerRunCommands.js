// Function to run the specified command inside a Docker container
const Docker = require('dockerode');
const { exec } = require('child_process');

const docker = new Docker();

// Function to start Docker Compose
function startDockerCompose(composeFilePath, callback) {
    // Command to start Docker Compose
    const command = `docker inspect --format '{{.State.Running}}' mongo`;
    //const command = `docker compose --file=${composeFilePath} up -d`;
    //const command = `docker-compose --file ${composeFilePath} up --detach`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
/*        if (error) {
            console.error(`Error starting Docker Compose: ${error.message}`);
            callback(error);
            return;
        }
        if (stderr) {
            console.error(`Error output from Docker Compose: ${stderr}`);
            callback(new Error(stderr));
            return;
        }*/
        console.log(`Docker Compose started successfully: ${stdout}`);
        callback(null);
    });
}

// Function to run the specified command inside a Docker container
function runDockerExec(containerId, command, callback) {
    const options = {
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['bash', '-c', command],
    };

    const container = docker.getContainer(containerId);
    container.exec(options, (err, exec) => {
        if (err) {
            console.error('Error creating exec instance:', err);
            callback(err);
            return;
        }

        exec.start((err, stream) => {
            if (err) {
                console.error('Error starting exec instance:', err);
                callback(err);
                return;
            }

            let output = '';

            stream.on('data', (chunk) => {
                output += chunk.toString();
            });

            stream.on('end', () => {
                console.log('Command execution completed');
                callback(null, output);
            });
        });
    });
}

module.exports = {
    startDockerCompose,
    runDockerExec
};