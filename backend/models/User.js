import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    subscription: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Courses"
    }
    ],
    completedLectures: [
        {
          courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
          lectures: [mongoose.Schema.Types.ObjectId]
        }
      ]
},{
    timestamps: true
 });

export const User = mongoose.model("User",schema);