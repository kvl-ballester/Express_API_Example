const express = require('express')
const router = express.Router()
const members = require('../../members')


// Gets all members
router.get('/', (req,res) => {
    res.json(members)
})

//Get single member
router.get('/:id',(req,res) => {
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

module.exports = router;