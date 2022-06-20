import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema({
    airline:{
        type: String,
        enum:['american','Southwest','United']
    },
    airport:{ 
        type: String,
        enum: ['AUS','DFW','LAX','SAN'],
        default: 'DEN'
    },
    flightNo:{
        type: Number, 
        required: true, min:10, max:9999
    },
    departs:{
        type: Date,
    }
}, {
    timestamps: true,
}) 

const Flight = mongoose.model('Flight',flightSchema)

export {
    Flight
}