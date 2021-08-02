const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let members = require('../../members')


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

//Create member
router.post('/',(req,res) => {
    res.send(req.body)

    const newMember = {
        id: uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
       return res.status(400).json({msg:'Include name and email'})
    }

    //Se añade miembro a la BBDD
    members.push(newMember)
    res.json(members)
})

//update member
router.put('/:id',(req,res) => {
    const [memberRes] = members.filter(
        member => {
            return member.id === parseInt(req.params.id);
        });

    if (memberRes) {
        //datos enviados
        const updMember = req.body
        
        //Actualiza copia local
        memberRes.name = updMember.name || memberRes.name
        memberRes.email = updMember.email || memberRes.email

        //Actualiza bbdd
        members = members.map(member => {
            if (member.id === memberRes.id) {
                return memberRes
            } else {
                return member
            }
        })

        res.json(members)
        
        
        
    } else {
        res.status(400).json({msg:'member not found'})
    }
})

module.exports = router;