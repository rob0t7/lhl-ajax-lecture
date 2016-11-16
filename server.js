'use strict'

let express        = require("express")
let app            = express()
let bodyParser     = require('body-parser')
let errorHandler   = require('errorhandler')
let methodOverride = require('method-override')
let morgan         = require('morgan')
let hostname       = process.env.HOSTNAME || '0.0.0.0'
let port           = parseInt(process.env.PORT, 10) || 5000
let publicDir      = process.argv[2] || __dirname + '/public'
let path           = require('path')


let testBreweries = {
  1: {
    id: 1,
    name: 'Brewery 1',
    description: 'Brewery 1 description. It is awesome',
    imageURL: 'https://media-cdn.tripadvisor.com/media/photo-s/08/3e/ac/d2/sawdust-city-brewing.jpg'
  },
  2: {
    id: 2,
    name: 'Brewery 2',
    description: 'Brewery 2 Description',
    imageURL: 'http://www.blogto.com/listings/bars/assets_c/2016/06/20160519-896-Henderson14-thumb-896xauto-118630.jpg'
  }
}
let nextBreweryID = 3;

// attach middleware
app.use(morgan('dev'))
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(publicDir))
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}))


app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

// Our API Routes (i.e. fill me in..)
app.get("/breweries", (req, res) => {
  let output = []
  for (let id in testBreweries) {
    output.push(testBreweries[id])
  }
  res.json(output)
})

app.get('/breweries/:id', (req, res) => {
  res.json(testBreweries[req.params.id])
})

app.post('/breweries', (req, res) => {
  let brewery = {
    id: nextBreweryID++,
    name: req.body.name,
    description: req.body.description,
    imageURL: req.body.imageURL
  }
  testBreweries[brewery.id] = brewery
  res.status(201).json(brewery)
})

// start the server
app.listen(port, hostname, function(){
  console.log("Serving %s listening at http://%s:%s", publicDir, hostname, port)
})
