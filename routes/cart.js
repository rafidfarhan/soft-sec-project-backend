const express = require("express");
const {
    getUserCart,
    createCart,
    updateCart,
    } = require("../controllers/cart");

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');


const router = express.Router({mergeParams: true});

router.use(protect);
// router.route('/').get(getProducts);
router.route('/:id').get(getUserCart);


router.route('/').post(createCart);
router.route('/:id').put(updateCart);
// router.route('/:id').delete(deleteTrack);

module.exports = router; 