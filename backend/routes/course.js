import express from 'express';
import { getAllCourses, getSingleCourse, fetchLectures, fetchLecture, getMyCourses } from '../controllers/course.js';
import { isAdmin, isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourses", isAuth, getMyCourses);
router.post("/course/:id/lecture", isAuth, isAdmin);
router.get("/course/:id/lectures", isAuth, fetchLectures);


export default router;
