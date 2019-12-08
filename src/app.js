const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const locationInfo = require('./utils/geocode');
const climateInfo = require('./utils/forecast');


//to call express method it retuns some values and methods to app
const app = express();
const port = process.env.PORT || 3000;

// setting the path to our required directories
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialsPath)

// sets the view engine to load templates dynamically
app.set('view engine', 'hbs');

// usually express looks for views folder in root(WEB-server in this app)/views
// to change views folder to different path or rename its folder and make express to look to our own 
// folder we can mention the path here  
app.set('views', viewsPath)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// this is used to server  static template from our specified path
app.use(express.static(publicDirectoryPath))



app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        footer:'rohith'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'about me',
        footer:'rohith'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'help me',
        footer:'rohith'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide address'
        })
    }
    locationInfo.geocode(req.query.address, (data)=>{
        var  longitude = data.features[0].center[0];
        var  latitude = data.features[0].center[1]
       climateInfo.forecast(latitude, longitude, (data)=>{
        res.send(data);
       })
    })

})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title:'error',
        footer:'rohith'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title:'error',
        footer:'rohith'
    })
})

app.listen(3000, ()=>{
    console.log('server started at port number 3000')
})