let express = require('express')
let api_routes = require('./routes/api.js')
let path = require('path')

// create your web app
let app = express()

let vueClientPath = path.join(__dirname,'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))
//app will pass and understand json
app.use(express.json())

app.use('/api', api_routes)

app.use(function (req, res, next){
    //respond with a 404 to anyb other request
    res.status(404).send('Not found')
})

app.use(function (err, req, res,next){
    console.error(err.stack)
    res.status(500).send('Server error')
})
// code to create server to run app PORT
let server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port ', server.address().port)
})