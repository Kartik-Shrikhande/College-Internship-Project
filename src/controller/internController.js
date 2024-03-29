const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

let regexValidation = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
let regexValidEmail = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/;
let regexValidNumber = /^([+]\d{2})?\d{10}$/;

// =====================================createintern================================================
const createIntern = async  (req, res)=> {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "plzz give some data" })

        const { name, email, mobile, collegeId } = data

        if (!name) return res.status(400).send({ status: false, msg: "Enter your name" })
        if (!email) return res.status(400).send({ status: false, msg: "Enter your email" })
        if (!mobile) return res.status(400).send({ status: false, msg: "Enter mobile Number" })
        if (!collegeId) return res.status(400).send({ status: false, msg: "Enter collegeId" })

        if (!name.match(regexValidation)) return res.status(400).send({ status: false, msg: "please enter a valid name" })
        if (!email.match(regexValidEmail)) return res.status(400).send({ status: false, msg: "please enter a valid email" })
        if (!mobile.match(regexValidNumber)) return res.status(400).send({ status: false, msg: "please enter a valid mobile" })

        let findEmail = await internModel.findOne({ email: email, isDeleted: false })
        if (findEmail) return res.status(403).send({ status: false, msg: "email id already exists" })
        let findmobile = await internModel.findOne({ mobile: mobile, isDeleted: false })
        if (findmobile) return res.status(403).send({ status: false, msg: "Mobile number already exsits" })

        let CheckCollege = await collegeModel.findOne({ _id: collegeId, isDeleted: false })
        if (!CheckCollege) return res.status(404).send({ status: false, message: ` No such collegeId Not Found!` });
        let clgId = CheckCollege._id
         req.body.collegeId = clgId
     
        let intern = await internModel.create(data)
        res.status(201).send({ status: true,message:"intern created successfully", Data: intern })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })

    }
}
module.exports = {createIntern}