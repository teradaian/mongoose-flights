import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

router.get('/new', flightCtrl.new)

export {
  router
}
