const express = require('express');
const path = require("path");

const app = express();

app.use("/scripts", express.static(path.resolve(__dirname, "scripts")));
app.use("/styles", express.static(path.resolve(__dirname, "styles")));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"))
});

app.listen(process.env.PORT || 5060, () => {
  console.log('Example app listening on port 5060!')
});