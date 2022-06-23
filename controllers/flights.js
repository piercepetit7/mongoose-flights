import { Flight } from "../models/flight.js"

import { Meal } from '../models/meal.js'

function newFlight(req, res) {
    res.render("flights/new",{
        title: 'Add Flights'
    })
}
function create(req, res) {
    console.log(req.body)
    Flight.create(req.body)
    .then(flight => {
        console.log("created flight:", flight)
        res.redirect("/flights");
    })
    .catch(err => {
        console.log(err)
        res.redirect('/flights')
    })
}

function index(req, res) {
    Flight.find({})
    .then(flights => {
        res.render('flights/index',{
            flights: flights,
            title: 'All flights',
        })
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
    .populate('food')
    .then(flight => {
        Meal.find({_id: {$nin: flight.meals}})
        .then(meals => {
            res.render('flights/show',{
                title: 'Flight Info',
                flight: flight,
                meals: meals,
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function deleteFlight(req, res) {
    console.log('deter')
    Flight.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/flights')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function edit(req,res) {
    console.log('edit me')
    Flight.findById(req.params.id)
    .then(flight => {
        res.render('flights/edit',{
        flight : flight,
        title: "Edit Flight" })
    })
}
function update(req,res) {
    Flight.findByIdAndUpdate(req.params.id, req.body,{new: true})
    .then(flight =>{
        res.redirect(`/flights/${req.params.id}`)
    })
}
function createTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.push(req.body)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}
function addToFood(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.food.push(req.body.mealId)
        flight.save()
            .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

export {
    newFlight as new,
    create,
    index,
    show,
    deleteFlight as delete,
    edit,
    update,
    createTicket,
    addToFood,
}