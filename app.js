const express = require("express");
const exphbs = require("express-handlebars");
const splitter = require("./split-sql");
const translator = require("./translator");

const app = express();

// Handlebars middleware.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route.
app.get('/', (req, res) =>
{
    res.render('index');
});

// Process the query.
app.post('/explain', (req, res) =>
{
    var query = req.body.query;
    tokens = splitter(query);
    explanation = translator(query);
    res.render('explain', {query: query, tokens: tokens, explanation: explanation});
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Started server on port ${PORT}`));