import { Flight } from "../models/flight.js"


function newFlight(req, res) {
    res.render("flights/new",{
        title: 'Add Flights'
    })
}
function create(req, res) {
    console.log(req.body);
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render("flights/new");
        console.log(flight);
        res.redirect("flights/");
    });
  
}

function index(req, res) {
    Flight.find({})
    .then(flights => {
        res.render('flights/index',{
            flights: flights,
            title: 'All Movies',
        })
    })
}

function show(req, res) {
    flight.findById(req.params.id)
    .then(fight => {
        res.render('flights/show')
        
    })
}


export {
    newFlight as new,
    create,
    index,
}