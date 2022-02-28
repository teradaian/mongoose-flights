import mongoose from 'mongoose'
export { Flight }

const Schema = mongoose.Schema

const validAirlines = ['American', 'Southwest', 'Delta', 'United', 'Hawaiian', 'Alaskan Airlines', 'Spirit', 'IcelandAir']

function setDefaultDepartureDate(){
    const today = new Date()
    const defaultDate = today.getFullYear() + 1
    return today.setFullYear(defaultDate)
}

const ticketSchema = new Schema({
    seat: {type: String, match: /[A-F][1-9]\d?/},
    price: {type: Number, min: 0}
})

const flightSchema = new Schema({
    airline: {type: String, required: true, enum: {
        values: [...validAirlines],
        message: 'Invalid Airline!'
    }},
    airport: {type: String, default: 'SEA'},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: {type: Date, default: setDefaultDepartureDate()},
    tickets: {type: [ticketSchema]},
    destinations: [{type: Schema.Types.ObjectId, ref: 'Destination'}],
}, { timestamps: true })

const Flight = mongoose.model('Flight', flightSchema)
