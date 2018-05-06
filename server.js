const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let friends = require('./app/data/friends.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('app/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'/app/public/home.html'));   
});

app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname,'/app/public/survey.html'));
});

app.get('/api/friends', function(req, res) {
    res.json(friends);
});

app.post('/api/friends', function(req, res) {
    let newFriend = req.body;
    //console.log(newFriend);
    res.json(findFriend(newFriend));
    friends.push(newFriend);
});

app.listen(PORT, function() {
    console.log('listening on http://localhost:' + PORT);
});

function findFriend (friendObj) {
    let answers = friendObj.answers;
    let foundFriend;
    let oldDif;
    for (let i = 0; i < friends.length; i++) {
        let newDif = 0;
        for (let j = 0; j < friends[i].answers.length; j++) {
            let answerA = parseInt(answers[j]);
            let answerB = parseInt(friends[i].answers[j]);
            let difference = Math.abs(answerA - answerB);
            newDif += difference;
        }//end answers loop
        if(oldDif == undefined) {
            oldDif = newDif;
        }
        if(oldDif >= newDif) {
            oldDif = newDif;
            foundFriend = friends[i];            
        }
    }//end friends loop
    return foundFriend;
} //end findFriend fx