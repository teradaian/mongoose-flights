import { Flight } from '../models/flight.js'

export {
    newFlight as new,
    createFlight as create,
    index,
    deleteFlight as delete
}

function index(req, res){
    Flight.find({...req.body}, (err, flights) => {
        res.render('flights/index', { err, flights })
    })
}

function newFlight(req, res){
    // I know this is gimmicky but I didn't want to build out a whole try catch thing for this lab sry sry
    let err = null
    res.render('flights/new', {err})
}

function createFlight(req, res){
        const flight = new Flight(req.body)
        flight.save(err => {
          if (err) {
            return res.render('flights/new', {err, invalidAirline: req.body.airline})
          }
          res.redirect('/flights')
        })
}

function deleteFlight(req, res){
        Flight.findByIdAndDelete(req.params.id, (err, flight) => {
          res.redirect('/flights')
        })
}