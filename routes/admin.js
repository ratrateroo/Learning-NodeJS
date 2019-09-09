const express = require('express');
const router = express.Router();

//routing
router.get('/add-product', (req, res, next) => {
    
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>');
    
});
//.post() for post request only, can only access it through /add-product POST
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;