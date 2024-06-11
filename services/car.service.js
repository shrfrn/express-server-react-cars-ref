import { utilService } from "./util.service.js"

export const carService = {
    query,
    getById,
    remove,
    save,
}

var cars = utilService.readJsonFile('./data/car.json')

function query() {
    return Promise.resolve(cars)
}

function getById(carId) {
    const car = cars.find(car => car._id === carId)
    return Promise.resolve(car)
}

function remove(carId) {
    const idx = cars.findIndex(car => car._id === carId)
    cars.splice(idx, 1)
    return _saveCarsToFile()
}

function save(carToSave) {
    if(carToSave._id) {
        const idx = cars.findIndex(car => car._id === carToSave._id)
        cars.splice(idx, 1, carToSave)
    } else {
        carToSave._id = utilService.makeId(),
        cars.push(carToSave)
    }
    return _saveCarsToFile()
        .then(() => carToSave)
}

function _saveCarsToFile() {
    return utilService.writeJsonFile('./data/car.json', cars)
}