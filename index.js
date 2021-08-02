const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 3000


//Init middleware
//app.use(logger)

//Body parser MW
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Set a static folder
app.use(express.static(path.join(__dirname,'public')))

//Members API Routes
app.use('/api/members', require('./routes/api/members'))


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))