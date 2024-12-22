import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({});
  res.json({ courses });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  res.json({ course });
});

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });
  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id)) return res.status(400).json({
    message: "You are not subscribed to this course"
  });

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  console.log(req.params.id)
  const course = await Courses.findById(req.params.id);
const lecture = await Lecture.find({ 
    title: { $regex: new RegExp(course.course_title, "i") } 
});
  console.log("Lecture Yaha hai: ",lecture)
  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(req.params.id)) return res.status(400).json({
    message: "You are not subscribed to this course"
  });

  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error("User not found for ID:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User subscription:", user.subscription);
    const courses = await Courses.find({ _id: { $in: user.subscription } });
    console.log("Enrolled Courses:", courses);

    res.json({ courses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error fetching enrolled courses" });
  }
});
