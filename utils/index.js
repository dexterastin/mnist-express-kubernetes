const fs = require("fs");
const {PythonShell} = require("python-shell");

module.exports = {
    downloadImage: async (base64Data, hash) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./images/${hash}.png`, base64Data, 'base64', (err) => {
                resolve();
            });
            resolve();
        });
    },

    runPython: imageHash => {
        console.log(imageHash);
        return new Promise((resolve, reject) => {
            PythonShell.run(
                "/workspace/models/evaluation.py",
                {args: [imageHash]},
                async (err, result) => {
                    if (err) {
                        if (err.traceback === undefined) {
                            console.log(err.message);
                        } else {
                            console.log(err.traceback);
                        }
                    }
                    const predict = await result[result.length - 1];
                    console.log(predict);
                    resolve(predict);
                }
            );
        });
    }
};


