const mongoose = require("mongoose");
const collegeModel = require("./collegeModel");
const objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true,
        },
        mobile: {
            type: String,
            required: true,
            unique:true,
        },

        collegeId: {
            type: objectId,
            ref:"collegeModel",
            required:true,
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true });


module.exports = mongoose.model('Intern', internSchema)


