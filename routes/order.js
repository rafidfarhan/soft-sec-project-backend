const express = require("express");
const {
    getUserOrders,
    createOrder,
    updateOrder,
    } = require("../controllers/order");

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');


const router = express.Router({mergeParams: true});

router.use(protect);
// router.route('/').get(getProducts);
router.route('/:userid').get(getUserOrders);


router.route('/').post(createOrder);
router.route('/:id').put(updateOrder);
// router.route('/:id').delete(deleteTrack);

module.exports = router; 