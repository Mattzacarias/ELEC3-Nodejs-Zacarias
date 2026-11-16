/*
 * Full Name: Benedict Matthew O. Zacarias
 * Section: IV-BSIT-A
 * Activity Code: N2 - Modular Calculator
 * Date: November 16, 2026
 */



// Inaayos ang display ng sagot depende sa operation
function formatResult(op, a, b, result) {
    const symbols = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/"
    };

    if (op === "average") {
        return `Average ng ${a} at ${b} = ${result}`;
    }
    return `${a} ${symbols[op]} ${b} = ${result}`;
}

module.exports = { formatResult };
