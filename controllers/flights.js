import { Flight } from "../models/flight.js"


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
    .then(flights => {
        console.log(flights)
        res.render('flights/show',{
            flights: flights,
            title: 'Flights Detail'
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
        res.render('/flights')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}


export {
    newFlight as new,
    create,
    index,
    show,
    deleteFlight as delete,
}