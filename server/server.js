const express = require('express')
const api = require('./api/api')
const users = require('./api/users')
const connectDB = require('./config/db')


const app = express()

connectDB()


app.use(express.json({extended: false}));
// app.get('/', (req,res) => res.send('API Running'))
app.use('/users', users)
// app.use('/users', express.static('./api/users'))


app.use(express.json())
app.use('/api', api)
app.use('/', express.static('../src'))

// app.use('/', express.static('../web1'))
// app.use('/day2', express.static('../web2'))
// app.use('/projectIdeas', express.static('../web-projectIdeas'))
// app.use('/day3', express.static('../web3'))
// app.use('/day3', express.static('../web3'))


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening at ${port}`))
