const firstFriends = require('./../data/friends.js');
let friends = firstFriends.slice();
module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });
    
    app.get('/api/clear', function(req, res) {
        friends = firstFriends.slice();
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
        let newFriend = req.body;
        //console.log(newFriend);
        res.json(findFriend(newFriend));
        friends.push(newFriend);
    });
}

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