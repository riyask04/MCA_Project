import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
const CourseContext =  createContext()

export const CourseContextProvider = ({ children }) => {
    const [courses,setCourses] = useState([])
    async function fetchCourses(){
        try{
            const {data} = await axios.get(`${server}/api/course/all`)
            setCourses(data.courses)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchCourses();
    },[])
    return (
    <CourseContext.Provider value={{courses,fetchCourses}}>
            {children}
        </CourseContext.Provider>
    );
}

CourseContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };  

export const CourseData = () => useContext(CourseContext)