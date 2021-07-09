import { Flight } from '../models/flight.js'

export {
    newFlight as new,
    createFlight as create,
    index,
    deleteFlight as delete,
    showFlight as show,
    createTicket,
    showTicket,
    deleteTicket
}

function index(req, res){
    Flight.find(({}), (err, flights) => {
        res.render('flights/index', { err, flights, title: 'All Flights' })
    }).sort({ departs: 'ascending' })
}

function newFlight(req, res){
    // I know this is gimmicky but I didn't want to build out a whole try catch thing for this lab sry sry
    let err = null
    res.render('flights/new', {err, title: 'New Flight'})
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

function deleteTicket(req, res){
  Flight.find({}, (err, flight) => {
    flight[0].tickets.remove({_id: req.params.id})
    flight[0].save(err => {
      console.log(flight)
      res.redirect('/flights')
    })
})
}

function showFlight(req, res){
    Flight.findById(req.params.id, (err, flight) => {
      res.render('flights/show', { err, flight, title: 'Flight Details' })
    })
}

function showTicket(req, res){
    Flight.findById(req.params.id, (err, flight) => {
      res.render('flights/ticket', {flight, title: 'Add Ticket'})
    })
}

function createTicket(req, res){
    Flight.findById(req.params.id, (err, flight) => {
      flight.tickets.push(req.body)
      console.log(req.body, 'created')
      flight.save(err => {
        res.redirect(`/flights/${flight._id}`)
        })
    })
}