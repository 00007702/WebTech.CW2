const express = require('express')
const app = express()
const fs = require('fs')

let tasksDb = []

fs.readFile('./data/tasks.json', (err, data) => {
	if (!err) {
		notesDb = JSON.parse(data)
	}
})

const parser = require('body-parser')

app.use(parser.urlencoded({extended: true}))

app.use('/assets', express.static('./public'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/task/create', (req, res) => {
	res.render('create', {show: req.query.success})
})

app.listen(7702, () => console.log('App is running...'))