'use strict';

const express = require('express');
const router = express.Router();

let Contact = require('../models/Contact');

//get list
router.get('/', function(req, res) {
    Contact.find().then(function(contacts) {
        res.json(contacts);
    });
});

// create
router.post('/', function(req, res) {
    if (req.body.name === undefined || req.body.number === undefined || req.body.email === undefined) {
        res.send('cannot be null');
        return;
    }
    new Contact(req.body).save().then(function(newContact) {
        res.json(newContact);
    });
    // new Contact({
    //     name: req.body.name,
    //     email: req.body.email,
    //     number: req.body.number
    // })
});

// delete one
router.delete('/:id', function(req, res) {
    let id = req.params.id;
    Contact.remove({
        _id: id
    }).then(() => {
        res.send('success');
    });
});

router.get('/:id', function(req, res) {
    let id = req.params.id
    /*    Contact.findOne({
            _id: id
        }, function(err, result) { //note params
            res.json(result);
        });*/

    // note promise then will return result
    Contact.findOne({
        _id: id
    }).then(result => {
        res.json(result);
    });
});

router.put('/:id', function(req, res) {
    let id = req.params.id;
    Contact.update({
        _id: id
    }, {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    }).then(result => {
        res.json(result);
    });

});

module.exports = router;
