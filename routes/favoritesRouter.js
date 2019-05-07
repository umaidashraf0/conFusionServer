const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const util = require('util');

const Favorites = require('../models/favorites');
var authenticate = require('../authenticate');
const cors = require('./cors');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Favorites.find({ 'user._id': req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ 'user': req.user._id}, (err, favorites) => {
        if (err) {
            return next(err);
        }
        // no document yet exists
        if (favorites == null) {
            console.log('no favorites exist against this user!!!')
            console.log(util.inspect(favorites, {showHidden: false, depth: null}))
            Favorites.create( { 'user': req.user._id, 'dishes': req.body } )
            .then((favouriteDishes) => {
                console.log('Favourite Dishes Added ', util.inspect(favouriteDishes, {showHidden: false, depth: null}));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favouriteDishes);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        //some favourite dishes exist against this user already, let's update those
        else {
            console.log('some favs exist!!!');
            console.log(util.inspect(favorites, {showHidden: false, depth: null}))
            Favorites.findOneAndUpdate(favorites._id, {
                $set: {
                    'user': req.user._id,
                    'dishes': req.body
                }
            }, { new: true })
            .then((favouriteDishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favouriteDishes);
            }, (err) => next(err))
            .catch((err) => next(err));

        }
    });
})
// .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /leaders');
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Leaders.remove({})
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })


// favoritesRouter.route('/:leaderId')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get(cors.cors, (req,res,next) => {
//     Leaders.findById(req.params.leaderId)
//     .then((leader) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(leader);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
// })
// .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Leaders.findByIdAndUpdate(req.params.leaderId, {
//         $set: req.body
//     }, { new: true })
//     .then((leader) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(leader);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Leaders.findByIdAndRemove(req.params.leaderId)
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });

module.exports = favoritesRouter;