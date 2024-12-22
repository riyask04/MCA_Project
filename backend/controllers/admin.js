import TryCatch from "../middlewares/TryCatch.js";
import { Lecture } from "../models/Lecture.js";
import {Courses } from "../models/Courses.js";
import {rm} from "fs";
import {promisify} from "util";
import fs from "fs";
import {User} from "../models/User.js";

export const createCourse = TryCatch(async(req,res)=>{
    const {title,description,category,createdBy,duration,price} = req.body;

    const image = req.file;

    await Courses.create({
        title,
        description,
        category,
        createdBy,
        duration,
        price,
        image: image?.path,
    })

    res.status(201).json({message: "Course Created Successfully"});
})

export const addLectures = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id)
    
    if(!course) return res.status(404).json({message: "Course Not Found"})

    const {title, description} = req.body;
    const file = req.file;
    const lecture = await Lecture.create({
        title,
        description,
        video:file?.path,
        course:course._id,
    })

    res.status(201).json({message: "Lecture Added Successfully",lecture})
})

export const deleteLecture =  TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id)

    rm(lecture.video,()=>{
        console.log("Video deleted successfully")
    })

    await lecture.deleteOne()
    res.json({message: "Lecture deleted Successfully"})
})

const unlikeAsync = promisify(fs.unlink)

export const deleteCourse = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id)

    const lectures = await Lecture.find({ course: course._id})

    await Promise.all(
        lectures.map(async(lecture)=>{
            await unlikeAsync(lecture.video);
            console.log("video deleted")
        })
    )

    rm(course.image,()=>{
        console.log("Image deleted successfully")
    })

    await Lecture.find({course: req.params.id}).deleteMany()

    await course.deleteOne()

    await User.updateMany({},{$pull:{subscription:req.params.id}})
    res.json({message: "Course deleted Successfully"})
    
})


export const getAllStats = TryCatch(async(req,res)=>{
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers,
    };

    res.json({
        message: "Stats retrieved successfully",
        stats,
    });
})
