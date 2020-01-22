const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const urlRouter = require("./routes/url.route");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(urlRouter)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));