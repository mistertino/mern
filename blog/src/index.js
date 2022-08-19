const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const exphbs = require("express-handlebars");
const { engine } = require('express-handlebars');
const db = require('./config/db/index');
const app = express();
const port = 3000;

const route = require('./routes/index');

db.connect();
app.use(morgan('combined'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
// app.get("/", (req, res) => {
//     res.render("home");
// });

// // app.get("/news", (req, res) => {
// //   res.render("news");
// // });

// app.get("/search", (req, res) => {
//   // console.log(req.query);
//   res.render("search");
// });

// app.post("/search", (req, res) => {
//   console.log(req.body);
//   res.send("");
// });

