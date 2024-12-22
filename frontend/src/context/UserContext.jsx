import { createContext,useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { server } from "../main";
import toast, {Toaster} from "react-hot-toast"
const UserContext = createContext();

export const UserContextProvider = ({ children })=>{
    const [user, setUser] = useState([])
    const [isAuth,setIsAuth] = useState(false)
    const [btnLoading,setBtnLoading] = useState(false)
    const [loading,setLoading] = useState(true)
    async function loginUser(email, password,navigate){
        setBtnLoading(true)
        try{
            const {data} = await axios.post(`${server}/api/user/login`,{email,password})

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/")
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
            setBtnLoading(false);
            setIsAuth(false)
        }
    }

    async function registerUser(name,email, password,navigate){
        setBtnLoading(true)
        try{
            const {data} = await axios.post(`${server}/api/user/register`,{name,email,password})

            toast.success(data.message);
            localStorage.setItem("activationToken", data.activationToken);
            setBtnLoading(false);
            navigate("/verify")
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
            setBtnLoading(false);
        }
    }

    async function verifyOtp(otp,navigate){
        setBtnLoading(true)
        const activationToken = localStorage.getItem("activationToken");
        try{
            const {data} = await axios.post(`${server}/api/user/verify`,{otp,activationToken})

            toast.success(data.message);
            navigate("/login")
            setBtnLoading(false);
            localStorage.clear()
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
            setBtnLoading(false);
        }
    }

    async function fetchUser(){
        try{
            const {data} = await axios.get(`${server}/api/user/me`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })

            setIsAuth(true);
            setUser(data.user);
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <UserContext.Provider value={{user,setUser,isAuth,setIsAuth,loginUser,btnLoading,loading,registerUser,verifyOtp}}>
        {children}
        <Toaster/>
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };  

export const UserData = () => useContext(UserContext);