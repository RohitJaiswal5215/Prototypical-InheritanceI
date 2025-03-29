function Car(make, model, year, type) {
    this.make = make
    this.model = model
    this.year = year
    this.type = type
    this.isAvailable = true
  }
  
  
  function Customer(name) {
    this.name = name
    this.rentedCars = []
  }
  
  
  Customer.prototype.rentCar = function(car) {
    if (car.isAvailable) {
      car.isAvailable = false
      this.rentedCars.push(car)
      console.log(`${this.name} rented a ${car.make} ${car.model}.`)
    } else {
      console.log(`${car.make} ${car.model} is already rented.`)
    }
  }
  
  
  Customer.prototype.returnCar = function(car) {
    setTimeout(() => {
      car.isAvailable = true
      this.rentedCars = this.rentedCars.filter(c => c !== car)
      console.log(`${this.name} returned the ${car.make} ${car.model}.`)
    }, 2000)
  }
  
  function PremiumCustomer(name, discountRate) {
    Customer.call(this, name)
    this.discountRate = discountRate
  }
  
  PremiumCustomer.prototype = Object.create(Customer.prototype)
  PremiumCustomer.prototype.constructor = PremiumCustomer
  
  
  const baseRentalPrice = 50
  const carTypeRates = {
    SUV: 1.5,
    Sedan: 1.0,
    Truck: 2.0,
  }
  
  function calculateRentalPrice(car, days, customer) {
    let rate = carTypeRates[car.type] || 1.0
    let price = baseRentalPrice * rate * days
    if (customer instanceof PremiumCustomer) {
      price *= 1 - customer.discountRate
    }
    return price.toFixed(2)
  }
  
  // Maintenance function
  function Maintenance(car, delay) {
    setTimeout(() => {
      car.isAvailable = true
      console.log(`${car.make} ${car.model} is now available after maintenance.`)
    }, delay)
  }
  
 
  const car1 = new Car('Toyota', 'Corolla', 2020, 'Sedan')
  const car2 = new Car('Honda', 'CR-V', 2022, 'SUV')
  const car3 = new Car('Ford', 'F-150', 2021, 'Truck')
  
  const customer1 = new Customer('Alice')
  const premiumCustomer1 = new PremiumCustomer('Bob', 0.1)
  
  customer1.rentCar(car1);
  premiumCustomer1.rentCar(car2)
  
  console.log('Rental price for Bob:', calculateRentalPrice(car2, 3, premiumCustomer1))
  
  customer1.returnCar(car1)
  Maintenance(car3, 3000)