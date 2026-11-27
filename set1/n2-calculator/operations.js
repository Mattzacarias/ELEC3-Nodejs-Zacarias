/*
 * Full Name: Benedict Matthew O. Zacarias
 * Section: IV-BSIT-A
 * Activity Code: N2: Modular Calculator
 * Date: November 16, 2026
 */




// Nagdadagdag ng dalawang numero
function add(a, b) {
    return a + b;
}

// Nagbabawas ng dalawang numero
function subtract(a, b) {
    return a - b;
}

// Nagmu-multiply ng dalawang numero
function multiply(a, b) {
    return a * b;
}

// Nagdi-divide ng dalawang numero (may check kung zero ang divisor)
function divide(a, b) {
    if (b === 0) {
        return null; // Senyales na bawal mag-divide sa zero
    }
    return a / b;
}

// Kinukuha ang average ng dalawang numero
function average(a, b) {
    return (a + b) / 2;
}

module.exports = { add, subtract, multiply, divide, average };
