const express = require('express')
const app = express()
const fs = require('fs')

let tasksDb = []

fs.readFile('./data/tasks.json', (err, data) => {
	if (!err) {
		tasksDb = JSON.parse(data)
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

function generateRandomId() {
	return Math.floor(Math.random() * 99999) + 1;
}

app.post('/tasks/create', (req, res) => {
	// get the sent data
	const task = {
		id: generateRandomId(),
		title: req.body.title,
		body: req.body.details
	}

	// store it 
	tasksDb.push(task)
	fs.writeFile('./data/tasks.json', JSON.stringify(tasksDb), (err) => {
		if (err) {
			res.redirect('/tasks/create?success=0')
		} else {
			res.redirect('/tasks/create?success=1')
		}
	})

	// redirect user back
	
})

app.get('/tasks', (req, res) => {
	res.render('tasks', {tasks: tasksDb})
})


app.listen(7702, () => console.log('App is running...'))