const express = require ('express')
const router = require ('./router')
const app = express ()
const port = 3000
const logger = ( req, res, next) => {console.log (`${req.method} ${req.url}`) 
next()}
app.set ('view engine', 'ejs')
app.use (logger)
app.use (express.json())
app.use(express.urlencoded({extended: false}))
app.use (router)

app.get ('/', (req, res) => res.send ('Hello World!'))
app.get ('/greeting', (req, res) => {res.render ('index')})
app.get ('/greet', (req, res) => {const name = req.query.name || 'nama'
            res.render ('greet',{name})
        })
app.get ('/bingle', (req, res) => res.send ('Selamat datang di Bingle'))
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post ('/register', (req, res)=>{
    const { email, password} = req.body
    res.json ([email, password])
})
app.get ('/products', (req, res)=> res.json([
    "apple",
    "redmi",
    "one plus one"
    ])
)

app.get ('/orders', (req,res) => 
    res.json ([
        {
            id:1, 
            paid: false,
            user_id: 1
        },
        {
            id:2,
            paid: false,
            user_id: 1
        },
    ])
)
app.get ('/users', (req, res)=> res.json([
    {
        nama: "johanes",
        ttl: "27 des 1991",
        jenkel: "pria"
    },
    {
        nama: "mr x",
        ttl: "1 jan 2000",
        jenkel: "pria"
    },
    ])
)
/*app.get ('/iniError', (req,res)=>{
    iniError; //ini penyebab error
});

Internal Server Error Handler 
app.use (function (err, req, res, next){
    console.log(err);
    res.status (500).json ({
    status: 'fail',
    errors: err.message
});
});
//404 handler
app.use (function(req,res,next){
    res.status(404).json ({
        status:'fail',
        errors: '404 not found'
    });
});*/
app.listen(port,() => console.log ('Example app listening at http://localhost:${port}'))