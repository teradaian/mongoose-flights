import { Destination } from '../models/destination.js'

export {
    index,
    newDestination as new,
    createDestination as create,
    deleteDestination as delete,
}

function index(req, res){
    Destination.find({}, (err, destinations) => {
        res.render('destinations', { err, destinations })
    })
}

function newDestination(req, res){
    Destination.find({}, (err, destinations) => {
        res.render("destinations/new", {
            err, destinations, title: "Add Destination"
        })
    })
}

function createDestination(req, res){
        const destination = new Destination(req.body)
        destination.save(err => {
          if (err) return res.render('destinations/new', {err, invalidDestination: req.body.airport})
          res.redirect('/destinations')
        })
}

function deleteDestination(req, res){
    Destination.findByIdAndDelete(req.params.id, () => {
      res.redirect('/destinations')
    })
}

