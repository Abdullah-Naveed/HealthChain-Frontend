const fs = require("fs-extra"); // gives file system access
const path = require("path");
const solc = require("solc"); // solidity compiler

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); //deletes everything inside the build folder

const contractPath = path.resolve(__dirname, "contracts", "MedicalRecordContract.sol");
const sourceCode = fs.readFileSync(contractPath, "utf8"); // get source code from file
const contractOutput = solc.compile(sourceCode, 1).contracts; //only care about contracts output from compiler

fs.ensureDirSync(buildPath); //checks if a directory exists, if not it creates it

for (let contract in contractOutput) {
    //for in loop used to iterate over keys of an object
    fs.outputJsonSync(
        //writes json file
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        contractOutput[contract]
    );
}
