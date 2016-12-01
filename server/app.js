var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

const app = express();

// Database model

const modelSchema = mongoose.Schema({
    text: {type: String, required: true},
    complete: {type: Boolean}
});

const Model = mongoose.model('Model', modelSchema);


// Database utils

function setUpConnection() {
    mongoose.connect(`mongodb://localhost/models`);
}

function listModels(id) {
    return Model.find();
}

function createModel(data) {
    const model = new Model({
        text: data.text,
        complete: false
    });

    return model.save();
}

function deleteModel(id) {
    return Model.findById(id).remove();
}

setUpConnection();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.get('/models', (req, res) => {
    listModels().then(data => {res.send(data)});
});

app.post('/models', (req, res) => {
    createModel(req.body).then(data => {res.send(data)});
});

app.delete('/models/:id', (req, res) => {
    deleteModel(req.params.id).then(data => {res.send(data)});
});

const server = app.listen(8080, ()=> {
    console.log('server is up and running on port 8080')
});