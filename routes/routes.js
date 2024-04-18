let express = require('express');
let router = express.Router();
let controller = require('../controller/controller');

router.post('/', async function(req, res) {
    let result = await controller.insertCat(req,res);
    res.json({statusCode: 201, message: 'success', data: result});
});

router.get('/', async function(req, res){
    let result = await controller.getAllCats(req,res);
    res.json({statusCode: 200, message: 'success', data: result});
});

module.exports = router;