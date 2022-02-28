import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

router.get('/new', flightCtrl.new)
router.get('/:id/ticket', flightCtrl.showTicket)
router.post('/:id/destinations', flightCtrl.addToFlight)
router.post('/:id', flightCtrl.createTicket)
router.get('/:id', flightCtrl.show)
router.get('/', flightCtrl.index)
router.post('/', flightCtrl.create)
router.delete('/:id/destinations/:did', flightCtrl.deleteDestination)
router.delete('/:id/ticket', flightCtrl.deleteTicket)
router.delete('/:id', flightCtrl.delete)


export { router }
