import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name required"]
    },


    email:{
        type:String,
        required:[true, "Email required"],
        unique:true,
    },

    password:{
        type:String,
        required:[true, "Password required"]
    },

    role:{
        type:String,
        enum:["student", "tutor" ],
        required:[true, "Role required"]
    },
    
    language:{
        type:String,
    },
    subject:{
        type:String,
    },
    
    classGrade:{
        type:String,
    },

    allowedClass:[
       { type:String}
    ],
    isOnline:{
        type:Boolean,
        default:false
    },
    

    notification:[
        {
            message:String,
            isRead:{
                type:Boolean,
                default:false,
            }
        }
    ],


}, {timestamps:true})

const User = mongoose.model("User", UserSchema)

export default User