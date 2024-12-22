import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
export const register = TryCatch(async(req,res)=>{
    const {name, email, password} = req.body;

        let user = await User.findOne({email})
        if(user) return res.status(400).json({
            message: "User already exists"
        });

        const hashPassword = await bcrypt.hash(password,10)

        user = {
            name,
            email,
            password:hashPassword
        }

        const otp = Math.floor(Math.random() * 1000000)

        const activationToken = jwt.sign(
            { 
                user,
                otp
            },process.env.Activation_Secret,{
                expiresIn: '10m'
            });

            const data = {
                name,
                otp
            }
            await sendMail(
                email,
                "LearnLynx",
                data
            )

            res.status(200).json({
                message: "Registration successful, please check your email for OTP",
                activationToken
            })
});

export const verifyUser = TryCatch(async(req, res)=>{
    const {activationToken,otp} = req.body
    const verify = jwt.verify(activationToken,process.env.Activation_Secret)
    if(!verify) return res.status(400).json({
        message: "OTP verification failed"
    });

    if(verify.otp !== otp) return res.status(400).json({
        message:"Wrong OTP"
    });

    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password
    })

    res.json({
        message: "User verified successfully"
    })
});

export const loginUser = TryCatch(async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email})
    if(!user) return res.status(400).json({
        message: "User not found"
    });

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword) return res.status(400).json({
        message: "Incorrect password"
    });

    const token = await jwt.sign({_id:user._id},process.env.JWT_Sec,{
        expiresIn: '10d'
    })

    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user
    })
})

export const enrollCourse = TryCatch(async (req, res) => {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);
  
    if (!user.subscription.includes(courseId)) {
      user.subscription.push(courseId);
      await user.save();
      res.json({ message: "Successfully enrolled in the course" });
    } else {
      res.status(400).json({ message: "Already enrolled in the course" });
    }
  });

  export const enrollInCourse = TryCatch(async (req, res) => {
    const userId = req.user._id;
    const courseId = req.body.courseId;

    const user = await User.findById(userId);
    if (user.subscription.includes(courseId)) {
        return res.status(400).json({ message: "You are already enrolled in this course." });
    }

    await User.findByIdAndUpdate(userId, { $push: { subscription: courseId } });

    res.status(200).json({ message: "Successfully enrolled in the course." });
});


export const getCompletedLectures = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('subscription');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const completedLectures = {};
  
      user.completedLectures.forEach(({ courseId, lectures }) => {
        completedLectures[courseId] = lectures.length; 
      });
  
      res.json({ completedLectures });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  export const getEnrolledCourses = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).populate("subscription");
    res.json({ courses: user.subscription });
  });
  

export const myProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id)

    res.json({user})
})