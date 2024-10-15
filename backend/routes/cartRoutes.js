const { addItemOrUpdateItemQuantity, getUserCart, deleteItemFromCart } = require('../controller/cartController');
const authenticateUser  = require('../middlewares/auth');

const router = require('express').Router();


router.route("/:productId").post(authenticateUser,addItemOrUpdateItemQuantity).delete(authenticateUser,deleteItemFromCart)
router.route("/").get(authenticateUser,getUserCart)


module.exports = router