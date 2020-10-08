const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//array variable
const ansArr = [];


//use inquirer to prompt user through questions
inquirer.prompt([
    {
        input: "input",
        name: "username",
        message: "What is your name?"
    },
    {
        input: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        input: "input",
        name: "id",
        message: "What is your employee id?"
    },
    {
        input: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        input: "list",
        name: "role",
        message: "What is your role with the company?",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        input: "input",
        name: "officeNumber",
        message: "What is your office number?",
        when: function (response) {
            return response.role === "Manager"
        }
    },
    {
        input: "input",
        name: "github",
        message: "What is your github username?",
        when: function (response) {
            return response.role === "Engineer"
        }
    },
    {
        input: "input",
        name: "school",
        message: "What school are you attending?",
        when: function (response) {
            return response.role === "Intern"
        }
    },
    //this question will let the user add more team members
    {
        type: "confirm",
        name: "addMore",
        message: "Would you like to add another employee?"
    }
    //this will push the user answers to the answer array
]).then(function (res) {
    switch (res.role) {
        case "Manager":
            const newManager = new Manager(res.name, red.id, res.email, res.officeNumber);
            ansArr.push(newManager);
            break;

        case "Engineer":
            const newEngineer = new Engineer(res.name, res.id, res.email, res.github);
            ansArr.push(newEngineer);
            break;

        case "Intern":
            const newIntern = new Intern(res.name, res.id, res.email, res.school);
            ansArr.push(newIntern);
            break;

        default:
                console.log("err");

    }

    if (response.addMore === true) {
        start();
    } else {
        const renderArr = render(ansArr);
        fs.writeFile(outputPath, html, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Team profile generated!")
            };
    });
};

});

start();

//this function renders the html file 


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


