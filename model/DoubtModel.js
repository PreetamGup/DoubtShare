
import mongoose from "mongoose";


const DoubtSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:[true, "Select Subject"]
    },

    doubt:{
        type:String,
        required:[true, "Please Ask Your Doubt"]
    },
    topic:{
        type:String,
        required:[true, "Enter the topic"]
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "send Student Id"]
    },
    
    isAccepted:{
        type:Boolean,
        default:false
    }


}, {timestamps:true})


const DoubtModel= mongoose.model("Doubt", DoubtSchema)

export default DoubtModel