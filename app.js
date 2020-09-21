/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const planet = require('./routes/planet.route');

const app = express();

const url = 'mongodb+srv://starwarsREST:C2NZVT8Yvwoubb7G@cluster0.ghco0.gcp.mongodb.net/planets?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(planet);

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});
