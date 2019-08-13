const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

var storage = {};

app.use(express.urlencoded());

app.get('/', (req,res) => res.sendFile(__dirname + '/client/index.html'));

app.post('/', (req,res) => {
    var report = JSON.parse(req.body.data);
    // store all possible keys at every heirarchy in here using mapKeys
    var keyHolder = [];
    // store values for individuals inside arrays and store these arrays inside here
    var output = [];
    // build a line for an individual in here. push to output and set back to empty
    var csv = [];
    var mapKeys = (obj) => {
        for (var key in obj) {
            if (!keyHolder.includes(key) && key !== 'children') {
                keyHolder.push(key);
            }
        }
        if (obj.children) {
            for (var i = 0; i < obj.children.length; i++) {
                mapKeys(obj.children[i]);
            }
        } else {
            return;
        }
    }
    mapKeys(report);
    var csvLine = (obj) => {
        for (var i = 0; i < keyHolder.length; i++) {
            var flag = false;
            for (var key in obj) {
                if (keyHolder[i] === key) {
                    csv.push(obj[key]);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                csv.push(null);
            }
        }
        output.push(csv);
        csv = [];
        if (obj.children) {
            for (var j = 0; j < obj.children.length; j++) {
                csvLine(obj.children[j]);
            }
        } else {
            return;
        }
    }
    csvLine(report);
    var outputStr = '';
    for (var k = 0; k < keyHolder.length; k++) {
        if (k + 1 === keyHolder.length) {
            outputStr = outputStr + keyHolder[k] + '\n';
        } else {
            outputStr = outputStr + keyHolder[k] + ', ';
        }
    }
    for (var i = 0; i < output.length; i++) {
        for (var j = 0; j < output[i].length; j++) {
            if (j + 1 === output[i].length) {
                outputStr = outputStr + output[i][j] + '\n';
            } else {
                outputStr = outputStr + output[i][j] + ', ';
            }
        }
    }
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(outputStr);
})

app.listen(port, () => console.log(`Listening on port ${port}`));



