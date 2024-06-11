const BASE_URL = '/api/car'

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            }
            console.log(cars)
            return cars
        })
}

function get(carId) {
    console.log(carId)
    return axios.get(BASE_URL + '/' + carId)
        .then(res => res.data)
}

function remove(carId) {
    return axios.get(BASE_URL + '/' + carId + '/remove')
        .then(res => res.data)
}

function save(car) {
    const queryStr = `/save?vendor=${car.vendor}&speed=${car.speed}&_id=${car._id || ''}`
    return axios.get(BASE_URL + queryStr)
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}