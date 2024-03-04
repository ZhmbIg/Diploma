const express = require('express')
const app = express()
const port = 3000
const fs = require("fs")
app.use(express.json())

let users = []

function readJson() {
  const fc = fs.readFileSync("store/users.json", "utf8")
  users = JSON.parse(fc)
}

function writeJson() {
  const fc = JSON.stringify(users)
  fs.writeFileSync("store/users.json", fc)
}
app.get('/registration', (req, res) => {
  res.sendFile('C:/Users/rend2/Documents/Diploma prj/templates/registration.html')
})

app.get('/main', (req, res) => {
  res.sendFile('C:/Users/rend2/Documents/Diploma prj/templates/main.html')
})

app.get('/user', (req, res) => {
  res.sendFile('C:/Users/rend2/Documents/Diploma prj/templates/user.html')
})

app.post('/registration', (req, res) => {
  const { username, password, confirmPass } = req.body
  console.log(req.body)
  console.log(username, password, confirmPass)
  console.log(users)
  if (username === '' || password === '' || confirmPass === '') {
    console.log("empty fields")
    return
  }
  readJson()
  const result = users.findIndex((item) => item.username === username)
  if (result !== -1) {
    console.log("user already exists")
    return
  }
  if (password !== confirmPass) {
    console.log('Passes are not eaqual')
    return
  }
  users.push({
    username: username,
    password: password,
    block: false,
    restrict: false,
  })
  console.log(users)
  writeJson()
  console.log("registration successful")
  res.redirect('/main')
})


app.post('/main', (req, res) => {
  const { username, password } = req.body
  readJson()
  const result = users.find((item) => item.username === username)
  console.log(username, password)
  console.log('This is result', result)
  if (result === undefined) {
    console.log("This user is not found");
    return
  }
  if (result.password !== password) {
    console.log('Wrong pass')
    return
  }
  console.log("You have entered")
  res.redirect('/user')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
