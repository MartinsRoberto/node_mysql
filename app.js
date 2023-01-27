const express = require('express')
const mysql = require('mysql')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  const sql = "SELECT * FROM users"

  conn.query(sql, (err, data) => {
    const users = data
    res.render('home', { users })
  })
})

app.post('/users/register', (req, res) => {
  const { name, email } = req.body

  const sql = "INSERT INTO users (??, ??) VALUES (?, ?)"
  const data = ['name', 'email', name, email]

  conn.query(sql, data, (err) => {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/users/select/:id', (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM users WHERE ?? = ?`
  const data = ['id', id]

  conn.query(sql, data, (err, result) => {
    if (err) {
      console.log(err)
    }

    const user = result[0]
    res.render('user', { user })
  })
})

app.get('/users/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = 'DELETE FROM users WHERE ?? = ?'
  const data = ['id', id]

  conn.query(sql, data, (err) => {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/users/edit/:id', (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM users WHERE ?? = ?`
  const data = ['id', id]

  conn.query(sql, data, (err, result) => {
    if (err) {
      console.log(err)
    }

    const user = result[0]
    res.render('userEdit', { user })
  })
})

app.post('/users/edit', (req, res) => {
  const { id, name, email } = req.body

  const sql = 'UPDATE users SET ?? = ?, ?? = ? WHERE ?? = ?'
  const data = ['name', name, 'email', email, 'id', id]

  conn.query(sql, data, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_mysql'
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Conectado ao MySQL!')

  app.listen(3000, () => console.log("Conectado ao servidor"))
})

