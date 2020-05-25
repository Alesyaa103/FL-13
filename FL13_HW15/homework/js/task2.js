function Vehicle(color, engine, maxSpeed = 70) {
  this.color = color;
  this.engine = engine;
  this.maxSpeed = maxSpeed;

  Object.defineProperties(this, {
    'currentSpeed': {
      value: 0,
      writable: true
    },
    'driveID': {
      value: null,
      writable: true
    },
    'stopID': {
      value: null,
      writable: true
    }
  })
}

Vehicle.prototype.warningMessage = function (currentSpeed) {
  if (currentSpeed >= this.maxSpeed) {
    console.log('speed is too high, SLOW DOWN')
  }
}

Vehicle.prototype.afterDriveMessage = function (speed) {
  console.log(`Vehicle is stopped. Maximum speed during the drive was ${speed}`)
}

Vehicle.prototype.upgradeEngine = function (newEngine, maxSpeed) {
  if (!this.driveID || !this.stopID) {
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
  }
}

Vehicle.prototype.getInfo = function () {
  return window.assign({}, this)
}

Vehicle.prototype.drive = function () {
  if (this instanceof Motorcycle) {
    console.log('Let’s drive')
  }
  this.currentSpeed = 0;
  this.driveID = setInterval(() => {
    this.currentSpeed += 20;
    console.log(this.currentSpeed)
    this.warningMessage(this.currentSpeed)
    if (this instanceof Motorcycle && this.currentSpeed - this.maxSpeed >= 30) {
      console.log('Engine overheating')
    }
  }, 2000)
}

Vehicle.prototype.stop = function () {
  const maxDriveSpeed = this.currentSpeed;
  clearTimeout(this.driveID);
  this.driveID = null
  this.stopID = setInterval(() => {
    if (this.currentSpeed >= 0) {
      this.currentSpeed -= 20
    } else {
      clearTimeout(this.stopID)
      this.stopID = null;
      this.currentSpeed = 0;
      this.afterDriveMessage(maxDriveSpeed);
    }
  })
}

function Car(color, engine, model, maxSpeed = 80) {
  Vehicle.call(this, color, engine, maxSpeed);
  this.model = model;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.afterDriveMessage = function (speed) {
  console.log(`Car ${this.model} is stopped. Maximum speed during the drive was ${speed}`);
}

Car.prototype.drive = function () {
  if (!this.driveID || !this.stopID) {
    Vehicle.prototype.drive.call(this);
  }
}

Car.prototype.changeColor = function (newColor) {
  this.color = newColor;
}

function Motorcycle(color, engine, model, maxSpeed = 90) {
  Vehicle.call(this, color, engine, maxSpeed);
  this.model = model;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;

Motorcycle.prototype.afterDriveMessage = function () {
  console.log(`Motorcycle ${this.model} is stopped. Good drive`)
}