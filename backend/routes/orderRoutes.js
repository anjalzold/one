// import { Router } from "express";
// const router = Router();
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { validate } from "../validators/validate.js";
// import { generateKhaltiOrder } from "../controllers/order.controller.js";
// import { verifyKhaltiPayment } from "../controllers/order.controller.js";

// // router.use(verifyJWT);
// router.route("/provider/khalti").post(validate, verifyJWT, generateKhaltiOrder);
// router
//   .route("/provider/khalti/verify-payment")
//   .post(validate, verifyJWT, verifyKhaltiPayment);

// router.route("/payment").get(verifyKhaltiPayment);

// export default router;


const {Router} = require('express');
const authenticateUser = require('../middlewares/auth');
const { generateKhaltiOrder, verifyKhaltiPayment } = require('../controller/orderController');
// const {initiatePayment, paymentCallback} = require('../controller/orderController');
// const { generateKhaltiOrder, verifyKhaltiPayment } = require('../controller/orderController');
const router = Router();

router.use(authenticateUser);
router.route('/initiate').post(authenticateUser,generateKhaltiOrder);
// router.route("/callback").post(authenticateUser,verifyKhaltiPayment);

router.route("/callback").get(verifyKhaltiPayment);

// router.post('/initiate', initiatePayment);

// GET route for callback after payment
// router.get('/callback', paymentCallback);

module.exports = router