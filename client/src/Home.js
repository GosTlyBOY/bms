import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import BookList from './BookList'

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");


useEffect(() => {
  const verifyCookie = async () => {
    if (!cookies.token) {
      navigate("/login");
    }
    const { data } = await axios.post(
      "http://localhost:4000/auth",
      {},
      { withCredentials: true }
    );
    const { status, user } = data;
    setUsername(user);
    if(!status){
      removeCookie("token");
      navigate("/login");
    }
    // return (status
      // ? toast(`Hello ${user}`, {
          // position: "top-right",
        // })
      // : (removeCookie("token"), navigate("/login")));
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
       {/* <h4>
           Welcome <span>{username}</span>
         </h4>
         <button className="home_page_button" onClick={Logout}>LOGOUT</button> */}
         <div className="navbar">
         <h4>
           Welcome <span>{username}</span>
         </h4>
         <div className="logout_button"><button className="home_page_button" onClick={Logout}>Logout</button></div>
         
        </div>
       </div>
        <BookList />
      <ToastContainer />
      </div>
  );
};

export default Home;