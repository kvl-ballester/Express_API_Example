const express = require('express')
const path = require('path')
const members = require('./members')
const logger = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 3000


//Init middleware
//app.use(logger)


// Gets all members
app.get('/api/members', (req,res) => {
    res.json(members)
})

//Get single member
app.get('/api/members/:id',(req,res) => {
    const memberRes = members.filter(
        member => {
            return member.id === parseInt(req.params.id);
        });

    if (memberRes.length) {
        res.json(memberRes)
    } else {
        res.status(400).json({msg:'member not found'})
    }
})

// Set a static folder
app.use(express.static(path.join(__dirname,'public')))


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))