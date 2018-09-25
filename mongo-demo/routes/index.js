var express = require('express');
var router = express.Router();
var googleModel = require('../model/class')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/class', (req, res) => {
  let {pn=1, size=10} = req.query
  pn = parseInt(pn)
  size = parseInt(size)

  googleModel.find().limit(size).skip((pn-1)*size).then(data => {
    res.json({
      code: 200,
      data
    })
  })
})

router.get('/class/:id', (req, res) => {
  const {id} = req.params

  googleModel.findById(id).then(doc => {
    res.json({
      code: 200,
      data: doc
    })
  })
})

router.post('/class', (req, res) => {
  let {name, age, sex, desc} = req.body

  googleModel.create({name, age, sex, desc}).then(data => {
    res.json({
      code: 200,
      data
    })
  })
})

router.put('/class/:id', (req, res) => {
  let {desc} = req.body
  let {id} = req.params

  googleModel.updateOne({_id: id}, {$set: {desc}}).then(doc => {
    console.log(doc)
    res.json({
      code: 200,
      doc: doc
    })
  })
})

router.delete('/class/:id', (req, res) => {
  const {id} = req.params
  googleModel.deleteOne({_id: id}).then(desc => {
    console.log(desc)
    res.json({
      code: 200,
      desc
    })
  })
})

module.exports = router;
