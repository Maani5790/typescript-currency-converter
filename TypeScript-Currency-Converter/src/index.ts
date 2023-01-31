#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const runAnimation = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    })
};

async function welcome() {
    let animation = chalkAnimation.rainbow("Welcome to Currency Converter:");
    await runAnimation();

    animation.stop();
};

await welcome();

let convertion = {
    "PKR": {
        "USD": 0.0044,
        "GBP": 0.0037,
        "PKR": 1
    },
    "USD": {
        "GBP": 1.21,
        "PKR": 220.79,
        "USD": 1
    },
    "GBP": {
        "PKR": 225.50,
        "USD": 0.83,
        "GBP": 1
    }
};

interface userInput {
    fromCurrency: "PKR" | "USD" | "GBP",
    toCurrency: "PKR" | "USD" | "GBP",
    amount: number
};

const answer: userInput = await inquirer.prompt([
    {
        name: "fromCurrency",
        type: "list",
        choices: ["PKR", "USD", "GBP"],
        message: "Select Your Currency: \n"
    },
    {
        name: "toCurrency",
        type: "list",
        choices: ["PKR", "USD", "GBP"],
        message: "Select Your Convert Currency: \n"
    },
    {
        name: "amount",
        type: "number",
        message: "Enter Your Amount: \n",
        validate: (answer) => {
            if (isNaN(answer)) {
                return "Please Enter A Number";
            }
            return true;
        }
    },
]);

const { fromCurrency, toCurrency, amount } = answer;

if (fromCurrency && toCurrency && amount) {

    let result = convertion[fromCurrency][toCurrency] * amount;
    console.log(chalk.cyan(`Your Convertion From ${fromCurrency} To ${toCurrency} Is ${result}`));

} else {
    console.log(chalk.red("Invalid Inputs"));
}