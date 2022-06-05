const express = require ('express')
const path = require ('path')
const router = require ('./router')
const app = express ()
const port = 3000
const logger = ( req, res, next) => {console.log (`${req.method} ${req.url}`) 
next()}
const foodList = require ('./food-list.json')
app.set ('view engine', 'ejs')
app.use (logger)
app.use (express.json())
app.use(express.urlencoded({extended: false}))
app.use (router)
app.use(express.static('src_image'))

app.get('/api/v1/foods', (req,res)=>{res.status(200).json(foodList)})

app.get('/api/v1/foods/:id', (req,res) => {
    const food = foodList.find(food=>food.id==req.params.id)
    if (food) {
        return res.status(200).json(food)
    }
    return res.status(404).json({error: "makanan tidak ditemukan"})
})

app.post ('/api/v1/foods', (req,res)=>{
    const {name, tipe, harga} = req.body
    const id = foodList.length +1
    const food = {
        id,
        name,
        tipe,
        harga
    }
    foodList.push(food)
    res.status(201).json(food)
})

app.put ('/api/v1/foods/:id', (req, res)=> {
    const {name, tipe, harga} = req.body
    const id = req.params.id
    let food = foodList.find(food=> food.id ==req.params.id)
    food.name = name
    food.tipe = tipe
    food.harga = harga

    foodList.map(index=> index.id == food.id ? food : index )
    res.status(200).json (food)
} )

app.get ('/api/v1/hitungTotal', (req,res)=>{
    let angka1= req.query.angka1 || 0
    let angka2= req.query.angka2 || 0
    let total= parseInt(angka1) + parseInt(angka2)

    return res.status(200).json ({total:total})
} )

app.get ('/binar.png', (req, res)=> res.sendFile(path.join(__dirname,'binar.png')))
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