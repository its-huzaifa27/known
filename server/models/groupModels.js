import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the group name"]
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Contact"
    }]
}, {
    timestamps: true
});

export const Group = mongoose.model("Group", groupSchema);
