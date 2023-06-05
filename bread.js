const express = require('express')
const bodyParser = require('body-parser')

const data = [
    { String: 'Testing Data', Integer: '12', Float: '1.45', Date: '12 Desember 2017', Boolean: 'true' },
    { String: 'Coba Lagi', Integer: '99', Float: '100.405', Date: '20 November 2017', Boolean: 'false' },
    { String: 'Super Sekali', Integer: '0', Float: '1.45', Date: 'kosong', Boolean: 'false' }

]

const app = express()

const port = 3000


app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.render('index', { data })
})

app.get('/Add', (req, res) => {
    res.render('add')
})

app.post('/Add', (req, res) => {
    data.push({ nama: req.body.nama, alamat: req.body.alamat })
    res.redirect('/')
})

app.get('/hapus/:id', (req, res) => {
    const id = req.params.id
    data.splice(id, 1)
    res.redirect('/')
})

app.get('/ubah/:id', (req, res) => {
    const id = req.params.id
    res.render('edit', { item: data[id] })
})

app.post('/ubah/:id', (req, res) => {
    const id = req.params.id
    data.push({ nama: req.body.nama, alamat: req.body.alamat })
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})