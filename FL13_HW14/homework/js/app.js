function Student(name, email) {
  this._name = name;
  this._email = email;
  this._homeworkResults = []
  this.getName = () => this._name;
  this.getEmail = () => this._email;

  this.addHomeworkResult = (topic, success) => {
    this._homeworkResults.push({
      topic,
      success
    });
  }

  this.getHomeworkResult = () => this._homeworkResults
}

function FrontendLab(students, failedLimit) {
  this._studentsList = [];

  for (let student of students) {
    let {
      name,
      email
    } = student;
    this._studentsList.push(new Student(name, email))
  }

  this._failedHomeworksLimit = failedLimit

  this.printStudentsList = () => {
    for (let student of this._studentsList) {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`)
      console.log(student.getHomeworkResult())
    }
  }

  this.addHomeworkResults = (homeworkResult) => {
    const {
      topic,
      results
    } = homeworkResult;
    for (let student of this._studentsList) {
      let email = student.getEmail()
      student.addHomeworkResult(topic, results.filter((val) => val.email === email)[0].success)
    }
  }

  this.printStudentsEligibleForTest = () => {
    let succeedStudent = this._studentsList.filter((student) => {
      return student.getHomeworkResult().filter((item) => item.success === false).length <= this._failedHomeworksLimit
    });
    for (let student of succeedStudent) {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`)
    }
  }
}