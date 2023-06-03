const express = require('express')
const bodyParser = require('body-parser')

const data = [
    { nama: 'Rifqi', alamat: 'Jakarta' },
    { nama: 'Gema', alamat: 'Bandung' },
    { nama: 'Yudi', alamat: 'Medan' },
    { nama: 'Fahmi', alamat: 'Bandung' },
    { nama: 'Gilang', alamat: 'Medan' }
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

app.get('/tambah', (req, res) => {
    res.render('add')
})

app.post('/tambah', (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})