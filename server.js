const express = require('express')
const app = express()
const mongoose = require('mongoose');
const request = require('request');
const path = require('path');
const Person = require('./models/persons');
//Database Connection
const dbURI = 'mongodb+srv://taksmen:taksmen@cluster0.qtbjw.mongodb.net/takeru?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(8080))
    .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine' , 'ejs')
function timeanddate(objects)
    {
        var timeFormat = 
        {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: objects["timezone"]
        }

        var dateFormat = 
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: objects["timezone"]
        }

        var datetime = new Date(objects["datetime"])
        
        var date = new Intl.DateTimeFormat('en-US', dateFormat).format(datetime)
        var time = new Intl.DateTimeFormat('en-US', timeFormat).format(datetime)

        return [time, date];

    }
function splitStr(str){
    var string = str.split('/')[1];
    return string;
}
console.dir
(
    app.locals.date // = > date
)
console.dir
(
    app.locals.nationality // = > nationality
)
console.dir
(
    app.locals.search // = > locate
)
app.get('/datalist', (req, res) => {
    request('http://worldtimeapi.org/api/timezone/'+search.Place, function(error, response, body) {
        const info = JSON.parse(body)
        img = splitStr(search.Place)
        information = timeanddate(info)
        Person.find()
            .then((result) => {
                res.render('datalist', {title: 'Data List', time: information[0], date: information[1], image: img, persons: result})
            })
            .catch((err) => {
                console.log(err);
            })
    })
    console.log(search.Place)
});
app.post('/append', (req, res) => {
    const person = new Person(req.body);
    console.log(req.body);
    person.save()
        .then((result) => {
            res.redirect('/datalist');
        })
        .catch((err) => {
            console.log(err);
        })
});
app.get('/newdata', function(req, res) {
    if (search.Place == "Europe/Amsterdam")
        {
            nationality = 'Dutch';
        }
    else if(search.Place == "Asia/Tokyo")
        {
            nationality = 'Japanese';
        }
    else if(search.Place == "Asia/Seoul")
        {
            nationality = 'Korean';
        }
    else if (search.Place == "Asia/Singapore")
        {
            nationality = 'Singaporean';
        }
    else if (search.Place == 'Asia/Manila')
        {
            nationality = 'Filipino';
        }
    
    res.render("newdata", {title: 'Add New Person', nationality: nationality});
});
app.get('/viewdata/:id', (req, res) => {
    const person_id = req.params.id;
    console.log(person_id)
    Person.findById(person_id)
    .then(result => {
        console.log(result);
        res.render('viewdata', {title: 'View Person', preview: result});
    }).catch(err => {
        console.log(err);
    })
});
app.post('/lookup', (req, res) => {
    res.render('viewdata');
});
app.get('/', function(req, res) {   
    res.render('', {title: 'Home'})
});
app.post('/datalist', (req, res) => {
    search = req.body
    res.redirect('datalist')    
});
app.use((req, res) => {
    res.render('404', {title: 'Error'})
});

