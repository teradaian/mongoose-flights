import mongoose from 'mongoose'
export { Flight }

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    seat: {type: String, match: /[A-F][1-9]\d?/},
    price: {type: Number, min: 0}
})

const flightSchema = new Schema({
    airline: {type: String, required: true, enum: {
        values: ['American', 'Southwest', 'Delta', 'United', 'Hawaiian', 'Alaskan Airlines'],
        message: 'Invalid Airline'
    }},
    airport: {type: String, default: 'SEA'},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: Date,
    tickets: {type: [ticketSchema]},
}, { timestamps: true })

const Flight = mongoose.model('Flight', flightSchema)
