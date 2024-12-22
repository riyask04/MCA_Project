import express from 'express';
import { register, verifyUser , loginUser, myProfile, enrollCourse, getEnrolledCourses, getCompletedLectures } from '../controllers/user.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();
router.post("/user/register",register)
router.post("/user/verify",verifyUser)
router.post("/user/login",loginUser)
router.get("/user/me",isAuth,myProfile)
router.post("/user/enroll", isAuth, enrollCourse);
router.get("/user/enrolled-courses", isAuth, getEnrolledCourses);
router.get('/user/completedLectures', isAuth, getCompletedLectures);
export default router;