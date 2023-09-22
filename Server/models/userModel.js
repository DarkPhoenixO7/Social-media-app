import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required:true
        },
        password: {
            type: String,
            required:true
        },
        firstname:{
            type: String,
            required:true
        },
        lastname:{
            type: String,
            required:true
        },
        isadmin:{
            type:Boolean,
            default:false
        },
        profilePicture:String,
        coverPicture:String,
        about:String,
        livesin:String,
        worksat:String,
        relationship:String,
        country: String,
        followers:[],
        following:[]

    },
    {timestapms:true}
)
const UserModel = mongoose.model("Users", userSchema)
export default UserModel;