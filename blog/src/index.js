const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const exphbs = require("express-handlebars");
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware')
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
// Custom middlewares
app.use(SortMiddleware)


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
//template engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            

            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type: 'default'
                const icons = {
                    default : 'ti-arrows-vertical',
                    asc: 'ti-download',
                    desc: 'ti-upload'
                }

                const types ={
                    default : 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]


                return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`
            }
        },
    }),
);
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
