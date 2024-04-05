const express = require("express");
const {
    getProduct,
    getProducts,
    createProduct,
    } = require("../controllers/product");

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
// const Product = require('../models/productModel');

const router = express.Router({mergeParams: true});

router.use(protect);
router.route('/').get(getProducts);
// router.route('/likedsongs').get(getLikedTracks);
router.route('/:id').get(getProduct);


// router.route('/liketrack/:id').put(likeTrack);
// router.route('/removelikefromtrack/:id').put(removeLikedTrack);


// router.use(authorize('admin'));

router.route('/').post(createProduct);
// router.route('/:id').put(updateTrack);
// router.route('/:id').delete(deleteTrack);

module.exports = router; 