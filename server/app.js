const express = require('express');
const cors = require('cors');
const vcitaRoutes = require('./vcita.service');
const app = express();

const port = 5001;

app.use(cors());
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/vcita", vcitaRoutes.vcitaRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
