const express = require("express")
const router = express.Router();

const internController =require("../controller/internController");
const collegeController=require("../controller/collegeController")



router.post("/colleges",collegeController.createcollege)
router.post("/interns",internController.createIntern)
router.get("/collegeDetails",collegeController.collegeDetails)


router.get("/project", function (req, res) {
    res.send("project is started")
})


module.exports=router

