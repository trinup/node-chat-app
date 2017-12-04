const express = require('express');
const path = require('path');

// console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '..', '/public');
// console.log(publicPath);

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});
