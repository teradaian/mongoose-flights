import { Flight } from '../models/flight.js'

export {
    newFlight as new,
    createFlight as create,
    index
}

function index(req, res){
    Flight.find({...req.body}, (err, flights) => {
        res.render('flights/index', { err, flights })
    })
}

function newFlight(req, res){
    res.render('flights/new')
}

function createFlight(req, res){
        const flight = new Flight(req.body)
        flight.save(err => {
          if (err) return res.render('flights/new')
          res.redirect('/flights')
        })
}