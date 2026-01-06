import mongoose from "mongoose";
export async function dbConnection() {
    const connectionString = "mongodb://localhost:27017/community_form"

    await mongoose.connect(connectionString).then(()=>{
        console.log("Connection Successful to community_form")
    }).catch((error)=>{
        console.log("Connection Failed to community_forum\nError: ",error)
    });
}