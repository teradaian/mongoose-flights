import mongoose from 'mongoose'

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const db = mongoose.connection
db.on('connected', () => {
    console.log(`Connected to ${db.name}`)
})
