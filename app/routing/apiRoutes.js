// Data for Friends

var friendData = require("../data/friends");

module.exports = function(app) {
    //get data
    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    //Post new data
    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;

        var allFriends = [];
        //looping all friends from friendData
        for(var i = 0; i < friendData.length; i++) {

            var totalDifference = 0;

            //Comparing new friend to current friend
            var scoreData = friendData[i].scores;
            for(var j = 0; j < scoreData.length; j++) {
                var searchFriend = parseInt(scoreData[j])
                var testFriend = parseInt(newFriend.scores[j])

                var diffQuestion = Math.abs(searchFriend - testFriend);
                totalDifference += diffQuestion;
            }
            //added to allFriends for later check
            allFriends.push(totalDifference);

        }
        //Find closest friends
        res.json(closestFriend(allFriends));

        //Prevent matching friend with itself
        friendData.push(newFriend);
    });

    function closestFriend(arr) {
        //smallest totalDifference
        var min = Math.min.apply(null, arr);

        var indices = [];
        var index = arr.indexOf(min);
        while (index != -1) {
            indices.push(index);
            index = arr.indexOf(min, index + 1);
        }
        var closest = [];
        for (var i = 0; i < indices.length; i++) {
            var closeIndex = indices[i];
            closest.push(friendData[closeIndex]);
        }
        return closest;
    }
};