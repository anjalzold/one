const {getProduct,createProduct, getProductById } = require('../controller/productController');
const upload = require('../config/multer-config')



const router = require('express').Router();

router.route("/").get(getProduct).post(upload.single('image'),createProduct)
router.route("/:id").get(getProductById)
// router.route("/:id").delete(deleteProduct).put(updateProduct)

module.exports = router