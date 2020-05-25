const name = Symbol('name');
const email = Symbol('email');
const homeworkResults = Symbol('homeworkResults');

function Student(name, email) {
  this[name] = name;
  this[email] = email;
  this[homeworkResults] = [];
  this.getName = () => this[name];
  this.getEmail = () => this[email];

  this.addHomeworkResult = (topic, success) => {
    this[homeworkResults].push({
      topic,
      success
    });
  }

  this.getHomeworkResult = () => this[homeworkResults]
}

const studentsList = Symbol('studentsList')
const failedHomeworksLimit = Symbol('failedHomeworksLimit ')

function FrontendLab(students, failedLimit) {
  this[studentsList] = [];

  for (let student of students) {
    let {
      name,
      email
    } = student;
    this[studentsList].push(new Student(name, email))
  }

  this[failedHomeworksLimit ] = failedLimit

  this.printStudentsList = () => {
    for (let student of this[studentsList]) {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`)
      console.log(student.getHomeworkResult())
    }
  }

  this.addHomeworkResults = (homeworkResult) => {
    const {
      topic,
      results
    } = homeworkResult;
    for (let student of this[studentsList]) {
      let email = student.getEmail()
      student.addHomeworkResult(topic, results.filter((val) => val.email === email)[0].success)
    }
  }

  this.printStudentsEligibleForTest = () => {
    let succeedStudent = this[studentsList].filter((student) => {
      return student.getHomeworkResult().filter((item) => item.success === false).length <= this[failedHomeworksLimit ]
    });
    for (let student of succeedStudent) {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`)
    }
  }
}