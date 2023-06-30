const express = require('express')
const router = express.Router()
const controller = require('../controller/process')

router.get('/',controller.input)
router.post('/pro',controller.process)
router.get('/products',controller.output)
router.get('/editproducts/:productId',controller.editProduct)
router.post('/edit-product',controller.posteditProduct)
router.post('/delete-product',controller.deleteProduct)
module.exports=router