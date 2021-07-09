import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

router.get('/new', flightCtrl.new)
router.get('/', flightCtrl.index)
router.post('/', flightCtrl.create)
router.delete('/:id', flightCtrl.delete)

export {
  router
}
