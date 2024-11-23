import mongoose from "mongoose";

const historySchema = mongoose.Schema(
    {
        doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Reference to the doctor, assuming they are in the 'Doctor' collection
        required: true,
        },
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the patient, assuming they are also in the 'User' collection
        required: true,
        },
        date: {
        type: Date,  //yyyy-mm-dd
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        prescription: {
         type: String,
            required: true,
        },
        
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
    }
    );

 const History = mongoose.model("History", historySchema);
 
    export default History;