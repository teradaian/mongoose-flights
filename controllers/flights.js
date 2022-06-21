import { Flight } from '../models/flight.js'
import { Destination } from '../models/destination.js'

export {
    addToFlight,
    createFlight as create,
    createTicket,
    deleteDestination,
    deleteFlight as delete,
    deleteTicket,
    index,
    newFlight as new,
    showFlight as show,
    showTicket,
}

function index(req, res){
    Flight.find(({}), (err, flights) => {
        res.render('flights/index', { err, flights, title: 'All Flights' })
    })
    .sort({ departs: 'ascending' })
}

function newFlight(req, res){
    res.render('flights/new', {err: null, title: 'New Flight'})
}

function createFlight(req, res){
    const flight = new Flight(req.body)
    flight.save(err => {
      if (err) return res.render('flights/new', {err, invalidAirline: req.body.airline})
      res.redirect(`/flights/${flight._id}`)
    })
}

function deleteFlight(req, res){
    Flight.findByIdAndDelete(req.params.id, () => {
      res.redirect('/flights')
    })
}

function deleteTicket(req, res){
  Flight.find({}, (err, flight) => {
    console.log(flight)
    flight[0].tickets.remove({_id: req.params.id})
    flight[0].save(err => {
      res.redirect('/flights')
    })
  })
}

function showFlight(req, res){
    Flight.findById(req.params.id)
    .populate('destinations')
    .exec((err, flight) => {
      Destination.find({_id: {$nin: flight.destinations}}, (err, newDestination) => {
        res.render('flights/show', {
          err, flight, newDestination, title: 'Flight Details' 
      })
    })
    })
}

const showTicket = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
    res.render('flights/ticket', {
      error, flight, title: 'Ticket Details' 
    })
  } catch (error) {
    console.log(error)
    res.redirect(`/flights`)
  }
}

const createTicket = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
    await flight.tickets.push(req.body)
    await flight.save()
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect(`/flights/${req.params.id}`)
  }
}

const addToFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
    await flight.destinations.push(req.body.destinationId)
    await flight.save()
  } catch (error) {
    console.log(error)
  } finally {
    res.redirect(`/flights/${req.params.id}`)
  }
}

const deleteDestination = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
    await flight.destinations.remove(req.params.did)
    await flight.save()
  } catch (error) {
    console.log(error)
  } finally {
    res.redirect('/flights')
  }
}