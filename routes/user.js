const express = require('express');
const path = require('path');
const router = express();

router.set('views', path.join(__dirname, '../views/user'))

const userController = require('../controllers/user')
const sessioncheck = require('../middleware/userSession')
const search = require('../middleware/search')
const block = require('../middleware/block')

// welcoming pages

router.post('/userCheck', userController.email_check)

router.get('/', sessioncheck.result,search.search, userController.load_landing)
router.get('/product/:id', search.productGet,search.search, sessioncheck.result, userController.not_logged_browse_Product)
router.get('/login', sessioncheck.result, userController.load_SignIn)
router.get('/forgetPass', sessioncheck.result, userController.load_forgot_password)
router.get('/register', sessioncheck.result, userController.load_email_send)
router.get('/signUp', sessioncheck.emailcheck, userController.load_SignUp)
router.get('/lshop', sessioncheck.result,search.search, search.search_result, userController.view_shop_before)



router.post('/forgetPass', sessioncheck.result, userController.post_number_forget_pass)
router.post('/passchange', sessioncheck.result, userController.post_otp_pass)
router.post('/passwordchange', sessioncheck.result, userController.change_pass)
router.post('/validateEmail',sessioncheck.result,userController.email_validarion)
router.post('/register', sessioncheck.result, userController.post_email)
router.post('/verifyOtp', sessioncheck.result, userController.verify_Otp)


// adding welcomers and resigning
router.post('/registerUser', sessioncheck.result, userController.post_SignUp)
router.post('/login', sessioncheck.result, userController.post_SignIn)
router.get('/logout', userController.logout)


// user activities
router.get('/home', sessioncheck.homeallow, block,search.search, userController.load_Home)
router.get('/profile', sessioncheck.homeallow, block,search.search, userController.load_profile)
router.get('/product-home/:id', search.productLook, sessioncheck.homeallow, block,search.search, userController.logged_browse_product)
router.get('/edit-profile/:id', sessioncheck.homeallow, block,search.search, userController.edit_user)
router.get('/profile/:id', sessioncheck.homeallow, block,search.search, userController.load_profile)
router.post('/profile', sessioncheck.homeallow, block, userController.update_profile)


// address
router.get('/add-address', sessioncheck.homeallow, block,search.search, userController.add_address)
router.post('/add-address', sessioncheck.homeallow, block, userController.insert_address)
router.get('/address-list', sessioncheck.homeallow, block,search.search, userController.load_address)
router.get('/delete-address/:id', sessioncheck.homeallow, block, userController.delete_address)

// cart
router.get('/view-cart', sessioncheck.homeallow, block,search.search, userController.view_cart)
router.post('/add-cart', sessioncheck.homeallow, block, userController.add_to_cart)
router.post('/remove-cart', sessioncheck.homeallow, block, userController.remove_cart)
router.post('/deleteProductcart', sessioncheck.homeallow, block, userController.delete_product_cart)

// shop
router.get('/shop', sessioncheck.homeallow, block,search.search, search.search_result, userController.view_shop_after)

// checkout
router.get('/checkout', sessioncheck.homeallow,sessioncheck.cartCheck, block, userController.load_checkout)
router.post('/post-order', sessioncheck.homeallow, block, userController.post_order)
router.get('/confirmation/:id', sessioncheck.homeallow, block,search.search, userController.conformation)
router.post('/verify-payment', sessioncheck.homeallow, block, userController.verify_payment)

// order details on user side
router.get('/list-orders', sessioncheck.homeallow, block,search.search, userController.list_orders)
router.get('/order/:id',sessioncheck.homeallow,block,search.search,userController.order_details)

router.get('/view-wishlist', sessioncheck.homeallow, block,search.search, userController.view_wish_list)
router.post('/add-wishlist', sessioncheck.homeallow, block, userController.add_to_wish_list)
router.post('/remove-wishlist', sessioncheck.homeallow, block, userController.remove_wish_list)

router.post('/checkCoupon', sessioncheck.homeallow, block, userController.check_coupon)
router.post('/cancel-order',sessioncheck.homeallow,block,userController.cancel_order)
router.post("/checkout-adress",sessioncheck.homeallow,block,userController.address_on_checkout)

router.post("/walletCheck",sessioncheck.homeallow,block,userController.wallet_check)
router.post('/search-result',search.search_dynamic_result)
module.exports = router;
