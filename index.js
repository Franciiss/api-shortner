const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const urlRouter = require("./routes/url.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(urlRouter)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`));