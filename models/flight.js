import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    seat: {type: String, match: /[A-F][1-9]\d?/},
    price: { type: Number,min:0}
},{
    timestamps: true,
})


const flightSchema = new Schema({
    airline:{
        type: String,
        enum:['American','Southwest','United'],
    },
    airport:{ 
        type: String,
        enum: ['AUS','DFW','LAX','SAN','DEN'],
        default: 'DEN',
    },
    flightNo:{
        type: Number, 
        min:10, max:9999,
        required: true
    },
    departs:{
        type: Date,
    },
    tickets:[ticketSchema],
	food: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
}, {
    timestamps: true,
}) 

const Flight = mongoose.model('Flight',flightSchema)

export {
    Flight
}