const Employee = require('./lib/Employee');
const generateHTML = require('./util/generateHtml');
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const teamMembers = [];


function startApp() {
    // WHEN I start the application
    // THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
    console.log("Welcome to the Team Profile Generator! Let's get started.")
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the team manager's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the manager's Employee ID?",
            name: "id"
        },
        {
            type: 'input',
            message: "Please enter the manager's email address.",
            name: "email"
        },
        {
            type: 'input',
            message: "Enter the office number of the manager",
            name: "officeNum"
        },
    ]).then((res) => {
        var manager = new Manager(res.name, res.id, res.email, res.officeNum);

        /* ADD GENERATED MANAGER TO AN ARRAY */
        teamMembers.push(manager);

        console.log(`Your manager, ${res.name}, has been added!`);

        // WHEN I enter the team manager’s name, employee ID, email address, and office number
        // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
        menu();
    })
}


function addEngineer() {
    console.log("Ok, let's add an Engineer to the team!")
    //WHEN I select the engineer option
    // THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, 

    inquirer.prompt([
        {
            type: 'input',
            message: "What is the Engineer's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the Engineer's Employee ID?",
            name: "id"
        },
        {
            type: 'input',
            message: "Please enter the Engineer's email address.",
            name: "email"
        },
        {
            type: 'input',
            message: "Enter the Github username of the Engineer",
            name: "github"
        },
    ]).then((res) => {
        var engineer = new Engineer(res.name, res.id, res.email, res.github);

        /* ADD GENERATED ENGINEER TO AN ARRAY */
        teamMembers.push(engineer);

        console.log(`Your engineer, ${res.name}, has been added!`);

        //and I am taken back to the menu
        menu();
    })


}

function addIntern() {
    console.log("Ok, let's add and Intern to the team.")
    // WHEN I select the intern option
    // THEN I am prompted to enter the intern’s name, ID, email, and school,
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the Intern's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the Intern's Employee ID?",
            name: "id"
        },
        {
            type: 'input',
            message: "Please enter the Intern's email address.",
            name: "email"
        },
        {
            type: 'input',
            message: "Enter the school the intern attends.",
            name: "school"
        },
    ]).then((res) => {
        var intern = new Intern(res.name, res.id, res.email, res.school);
        /* ADD GENERATED INTERN TO AN ARRAY */
        teamMembers.push(intern);

        console.log(`Your intern, ${res.name}, has been added!`);

        //and I am taken back to the menu
        menu();
    })
}


function menu() {
    //THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Add an Engineer', 'Add an Intern', 'Finish Building My Team'],
            name: 'menuChoice'
        }
    ).then((res) => {
        if (res.menuChoice === 'Add an Engineer') {
            addEngineer();
        } else if (res.menuChoice === 'Add an Intern') {
            addIntern();
        } else {
            finishTeam();
        }
    })
}


function finishTeam() {
    fs.writeFile(`index.html`,generateHTML(teamMembers), error => error ? console.log(error) : console.log('Your Team Profile has been generated as an HTML document!'))
}

startApp();