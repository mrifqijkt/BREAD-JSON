const express = require('express')
const bodyParser = require('body-parser')
const fs = require('node:fs');

const data = [
    { String: 'Testing Data', Integer: '12', Float: '1.45', Date: '12 Desember 2017', Boolean: 'true' },
    { String: 'Coba Lagi', Integer: '99', Float: '100.405', Date: '20 November 2017', Boolean: 'false' },
    { String: 'Super Sekali', Integer: '0', Float: '1.45', Date: 'kosong', Boolean: 'false' }

]

const app = express()

let rawdata = fs.readFileSync('data.json');
let bread = JSON.parse(rawdata)

const port = 3000


app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.render('index', { bread })
})

app.get('/Add', (req, res) => {
    res.render('add')
})

app.post('/Add', (req, res) => {
    console.log(req.body.String)
    bread.push({ "String": req.body.String, "Integer": req.body.Integer, "Float": req.body.Float, "Date": req.body.Date, "Boolean": req.body.Boolean })
    fs.writeFileSync('data.json', JSON.stringify(bread, null, 4))
    res.redirect('/')
})

app.get('/hapus/:id', (req, res) => {
    const id = req.params.id
    bread.splice(id, 1)
    res.redirect('/')
})

app.get('/ubah/:id', (req, res) => {
    const id = req.params.id
    res.render('edit', { item: bread[id] })
})

app.post('/ubah/:id', (req, res) => {
    const id = req.params.id
    bread.push({ "idd": req.body.idd, "String": req.body.String, "Integer": req.body.Integer, "Float": req.body.Float, "Date": req.body.Date, "Boolean": req.body.Boolean })
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})