const hiddenName = Symbol('hiddenName');
const hiddenEmail = Symbol('hiddenEmail');
const hiddenHwResults = Symbol('hiddenHwResults');

function Student(name, email) {
  this[hiddenName] = name;
  this[hiddenEmail] = email;
  this[hiddenHwResults] = [];
  this.getName = () => this[hiddenName];
  this.getEmail = () => this[hiddenEmail];

  this.addHomeworkResult = (topic, success) => {
    this[hiddenHwResults].push({
      topic,
      success
    });
  }

  this.getHomeworkResult = () => this[hiddenHwResults]
}

const hiddenStudentList = Symbol('hiddenStudentList')
const hiddenFaildLimit = Symbol('hiddenFaildLimit')

function FrontendLab(students, failedLimit) {
  this[hiddenStudentList] = [];

  for (let student of students) {
    let {
      name,
      email
    } = student;
    this[hiddenStudentList].push(new Student(name, email))
  }

  this[hiddenFaildLimit] = failedLimit

  this.printStudentsList = () => {
    for (let student of this[hiddenStudentList]) {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`)
      console.log(student.getHomeworkResult())
    }
  }

  this.addHomeworkResults = (homeworkResult) => {
    const {
      topic,
      results
    } = homeworkResult;
    for (let student of this[hiddenStudentList]) {
      let email = student.getEmail()
      student.addHomeworkResult(topic, results.filter((val) => val.email === email)[0].success)
    }
  }

  this.printStudentsEligibleForTest = () => {
    let succeedStudent = this[hiddenStudentList].filter((student) => {
      return student.getHomeworkResult().filter((item) => item.success === false).length <= this[hiddenFaildLimit]
    });
    for (let student of succeedStudent) {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`)
    }
  }
}