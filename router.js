const express = require ('express')
const router = express.Router()
router.use (function timeLog(_req, res, next) {
    console.log ('Time: ', new Date())
    next()
})
router.get ('/profile', function (req,res){
    res.send ('halaman profil yang pakai router')
})
router.get ('/about', function (req,res){
    res.send ('about yang pakai router')
})
module.exports= router