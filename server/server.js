const express = require ('express');
const fs = require ('fs');
const app = express ();
app.use (express.json ()); //Определение JSON
app.use ('/', express.static ('public'));

app.get ('/api/products', (req, res) => {
    fs.readFile ('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send (data);
        }
    })
});

app.get ('/api/cart', (req, res) => {
    fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send (data);
        }
    })
});
const handler = require ('./handler');

app.post ('/api/cart', (req, res) => {
    handler (req, res, 'add', 'server/db/userCart.json');
    //handler(req,res,'stats', 'server/db/stats.json');
});

app.put ('/api/cart/:id', (req, res) => {
    handler (req, res, 'change', 'server/db/userCart.json');
    //handler(req,res,'stats', 'server/db/stats.json');
});

app.post ('/api/stats', (req, res) => {
    handler(req,res,'stats', 'server/db/stats.json');
});

app.listen (3000, () => ('listening at port 3000...'));
