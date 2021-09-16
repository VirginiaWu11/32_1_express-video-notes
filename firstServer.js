const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Homepage");
});
app.get("/dogs", (req, res) => {
    console.log("You asked for /dogs!");
    console.log(req);
    res.send("<h1>I am dog woof woof</h1>");
});

//app.listen should be at the end of the file
app.listen(3000, function () {
    console.log("App on port 3000");
});

app.get("/chickens", (req, res) => {
    res.send("Bock!! bock bock(get request)");
});

app.post("/chickens", function createchicken(req, res) {
    res.send("You created a new chicken (not really) (post request)");
});
