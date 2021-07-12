import mongoose from 'mongoose'
export { Destination }

const destinationSchema = new mongoose.Schema({
    airport: { type: String, required: true, unique: true}
}, { timestamps: true })

const Destination = mongoose.model('Destination', destinationSchema)