import express from 'express'
import cookieParser from 'cookie-parser'

import { carService } from './services/car.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())

// Express Routing:

app.get('/puki', (req, res) => {
    var visitCount = req.cookies.visitCount || 0
    res.cookie('visitCount', ++visitCount, { maxAge: 5000 })
	res.send(`<h1>Welcome Puki ${visitCount}</h1>`)
})

app.get('/api/car', (req, res) => {
    carService.query()
        .then(cars => res.send(cars))
        .catch(err => {
            loggerService.error(err)
            res.status(400).send('Couldnt get cars...')
        })
})

app.get('/api/car/save', (req, res) => {
    const { _id, vendor, speed } = req.query
    const carToSave = { _id, vendor, speed: +speed }

    carService.save(carToSave)
        .then(savedCar => res.send(savedCar))
})

app.get('/api/car/:id', (req, res) => {
    const { id } = req.params

    const car = carService.getById(id)
	    .then(car => res.send(car))
})

app.get('/api/car/:id/remove', (req, res) => {
    const { id } = req.params

	carService.remove(id)
        .then(() => res.send(`Car ${id} deleted...`))
})

const port = 3030
app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}/`))