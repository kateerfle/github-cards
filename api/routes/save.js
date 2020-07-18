var express = require('express');
var mongoose = require('mongoose');
const linkClickInfo = require('../models/linkClickInfo');
var router = express.Router();
var ClickInfo = mongoose.model('ClickInfo');

router.post('/', async (req,res) => {
//router.use(function (req, res) {
  //router.get('/', async (req,res) => {
    console.log(req.body);
  const clickInfo = new ClickInfo(req.body);
  //const clickInfo = await ClickInfo.find({});
  try {
    await clickInfo.save();
    res.send(clickInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.get('/', function(req, res, next) {
//     res.send(res.save());
// });

// function save(mongooseConnection) {
//     let linkClickInfo = require('../models/linkClickInfo')
//     let model = new linkClickInfo({
//         url: ''
//       })
      
//       model.save()
//          .then(doc => {
//            console.log(doc)
//          })
//          .catch(err => {
//            console.error(err)
//          })
//          //send model to database
// }

module.exports = router;