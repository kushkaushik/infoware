const express = require('express')
const router  = express.Router();
const {postData,getData,updateData,deleteData} = require('../controller/userController')

router.route('/postdata').post(postData)
router.route('/getdata').get(getData)
router.route('/updatedata/:_id').put(updateData)
router.route('/deletedata/:_id').delete(deleteData)

module.exports = router