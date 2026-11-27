/*
 * Full Name: Benedict Matthew O. Zacarias
 * Section: IV-BSIT-A
 * Activity Code: N2: Modular Calculator
 * Date: November 16, 2026
 */




const os = require("os"); 
const ops = require("./operations");
const { formatResult } = require("./formatter");


const args = process.argv.slice(2);
const operation = args[0];
const num1 = parseFloat(args[1]);
const num2 = parseFloat(args[2]);

console.log(`Host Machine: ${os.hostname()}`);

if (!operation || isNaN(num1) || isNaN(num2)) {
    console.log("Paggamit: node index.js <add|subtract|multiply|divide|average> <num1> <num2>");
    process.exit(1);
}

let result;

switch (operation) {
    case "add":
        result = ops.add(num1, num2);
        break;
    case "subtract":
        result = ops.subtract(num1, num2);
        break;
    case "multiply":
        result = ops.multiply(num1, num2);
        break;
    case "divide":
        result = ops.divide(num1, num2);
        if (result === null) {
            console.error("Error: Hindi pwedeng mag-divide sa zero!");
            process.exit(1);
        }
        break;
    case "average":
        result = ops.average(num1, num2);
        break;
    default:
        console.error(`Error: Hindi kilalang operation ang '${operation}'.`);
        process.exit(1);
}

console.log(formatResult(operation, num1, num2, result));
