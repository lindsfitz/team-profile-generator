// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Intern extends Employee {
    constructor(name,id,email,school){
        super(name,id,email);
        this.school = school;
    }

    getSchool(){
        return this.school;
    }
}

// const Misha = new Intern('Misha',39,'mishagirl','UCLA')

// Misha.getSchool();
// Misha.getRole();
// Misha.getId();

module.exports = Intern;