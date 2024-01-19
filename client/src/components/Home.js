import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import BookList from './BookList'
import Snackbar from '@mui/material/Snackbar';



const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [name, setName] = useState("");
  const [snackBarShow, setSnackBarShow] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");


useEffect(() => {
  const verifyCookie = async () => {
    if (!cookies.token) {
      navigate("/login");
    }
    const { data } = await axios.get(
      "http://localhost:4000/auth",
      { withCredentials: true }
      );
      const { status, user } = data;
      if(!status){
        removeCookie("token");
        navigate("/login");
      }else{

        setName(user.split('@')[0]);
      }
  };
  verifyCookie();
}, [cookies, navigate, removeCookie]);


  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <div>
       <div className="home_page">
         <div className="navbar">
         <h4>
           Welcome <span>{name}</span>
         </h4>
         <div className="logout_button"><button className="home_page_button" onClick={Logout}>Logout</button></div>
         
        </div>
       </div>
        <BookList setSnackBarShow={setSnackBarShow} setSnackBarMsg={setSnackBarMsg} cookies={Cookies}/>
        <Snackbar open={snackBarShow} message={snackBarMsg}/>
      
      </div>
  );
};

export default Home;