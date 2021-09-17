const express = require("express");
const app = express();

//parse json data
app.use(express.json());
//parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Homepage");
});
app.get("/dogs", (req, res) => {
    console.log("You asked for /dogs!");
    console.log(req);
    res.send("<h1>I am dog woof woof</h1>");
});

app.get("/chickens", (req, res) => {
    res.send("Bock!! bock bock(get request)");
});

app.post("/chickens", function createchicken(req, res) {
    res.send("You created a new chicken (not really) (post request)");
});
const greetings = {
    en: "hello",
    fr: "bonjour",
    ic: "hallo",
    ja: "konnichiwa",
};

// paramerters example
app.get("/greet/:language/:color", (req, res) => {
    console.log(req.params);
    const lang = req.params.language;
    const color = req.params.color;
    const greeting = greetings[lang];
    console.log(lang, color);
    if (!greeting) return res.send("INVALID LANGUAGE");

    return res.send(greeting.toUpperCase());
});

//  query string example
// '/search?term=pig&sort=cute"
app.get("/search", (req, res) => {
    console.log(req.query);
    // sample: { term: 'pig', sort: 'cute' } // = default values
    const { term = "piggies", sort = "top" } = req.query;
    return res.send(`Search Page! Term is: ${term}, sort is: ${sort}`);
});

// headers example
app.get("/show-me-headers", (req, res) => {
    console.log(req.rawHeaders);
    console.log(req.headers);
    res.send(req.headers);
});
// req.headers sample:
// {
//     "host": "127.0.0.1:3000",
//     "connection": "keep-alive",
//     "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "upgrade-insecure-requests": "1",
//     "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//     "sec-fetch-site": "none",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-user": "?1",
//     "sec-fetch-dest": "document",
//     "accept-encoding": "gzip, deflate, br",
//     "accept-language": "en-US,en;q=0.9",
//     "if-none-match": "W/\"305-F6WUsNSi5mwkBwbJRoM1sb3y8lI\""
//   }

app.get("/show-language", (req, res) => {
    const lang = req.headers["accept-language"];
    res.send(`your language preference is: ${lang}`);
});

app.post("/register", (req, res) => {
    res.send(req.body);
});

// responding with json | res.json
const CANDIES = [
    { name: "snickers", qty: 43, price: 1.5 },
    { name: "skittles", qty: 26, price: 0.99 },
];

app.get("/candies", (req, res) => {
    res.json(CANDIES);
});

app.post("/candies", (req, res) => {
    // status code

    if (req.body.name.toLowerCase() === "circus peanuts") {
        res.status(403).json({ msg: "horrible choice" });
    }
    CANDIES.push(req.body);
    res.status(201).json(CANDIES);
});

//app.listen should be at the end of the file
app.listen(3000, function () {
    console.log("App on port 3000");
});
