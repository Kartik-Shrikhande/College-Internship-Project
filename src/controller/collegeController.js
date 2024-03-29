const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

let regexValidname = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
let regexvalidfullName = /^[a-zA-Z]+([\s][a-zA-Z,]+)*$/;
let regexlogoLink = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;




// ==============================================createcollege==================================================


const createcollege = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "plzz give some data" });

    const { name, fullName, logoLink } = data;

    if (!name)
      return res.status(400).send({ status: false, msg: "Enter collage name" });
    if (!fullName)
      return res.status(400).send({ status: false, msg: "Enter collage FullName " });
    if (!logoLink)
      return res.status(400).send({ status: false, msg: "Enter collage logoLink" });
      if (!name.match(regexValidname))
      return res.status(400).send({ status: false, msg: "please enetr a valid name" });

    if (!fullName.match(regexvalidfullName))
      return res.status(400).send({ status: false, msg: "please enetr a valid fullName" });

    if (!logoLink.match(regexlogoLink))
      return res.status(400).send({ status: false, msg: "please enetr a valid logoLink" });

    let findname = await collegeModel.findOne({ name: name });
    if (findname)
      return res.status(403).send({ status: false, msg: "name already exsits" });

    let collage = await collegeModel.create(data);
    res.status(201).send({ status: true, Data: collage });
  }
   catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};


// ==============================================Getcollegedetail==================================================



const collegeDetails = async (req, res) => {
  try {
    let data = req.query.collegeName;
    if (!data) return res.status(400).send({ status: false, msg: "Enter collegename" });

    let collagedata = await collegeModel.findOne({ name: data, isDeleted: false });
    if (!collagedata) return res.status(404).send({ status: false, msg: "College is Not found!" });

    let collageid = collagedata._id.toString();
    let interns = await internModel.find({ collegeId: collageid, isDeleted: false, }).select({ _id: 0, isDeleted: 0 ,createdAt:0,updatedAt:0,__v:0});
    if (!interns) return res.status(404).send({ status: false, msg: "intern is Not found!" });

    let final = await collegeModel.findOne({ name: data, isDeleted: false }).select({ _id: 0, isDeleted: 0,createdAt:0,updatedAt:0,__v:0 });


    res.status(200).send({ status: true, Data: final ,Interns : interns});
  } 
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = {createcollege, collegeDetails};