import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
// import products from "../../data/products";
import Feedlist from "../../component/CustomerHomePage/Feedlist";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import style from "./CustomerHome.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Profilesvg } from '../../user-solid.svg';

function CustomerHome() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [products, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(process.env.REACT_APP_URL_PRODUCT + "/getAll");
      const data = await resp.json();
      // console.log(data.result);
      setData(data.result);
    };
    fetchdata();
  }, []);

  const navigate = useNavigate();

  // const handleSearch = (searchTerm) => {
  //   setSearchTerm(searchTerm);
  // };

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  async function handlelogout() {
    console.log("thai che");
    try {
      const response = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/logout",
        {
          method: "POST",
          credentials: "include", // "same-origin", "include", "omit"
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      console.log(responseData.message);
      if (response.ok) {
        console.log("logged out");
        navigate("/signin");
      } else {
        console.log("Logout failed");
      }
      // const responseData = await response.json();
      // console.log("Success:", responseData);
      // if (response.ok) {
      //   navigate("/signin");
      // } else {
      //   alert("Email not found");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const DrawerList = (
    <Box sx={{ width: 200, height: "100%"}} role="presentation" onClick={toggleDrawer(false)}>
      <div className={style.profimg}>
        <Profilesvg />
      </div>
      <div onClick={handlelogout} className={style.proflist}>
        Logout
      </div>
      <Link className={style.navto}to={{
        pathname: '/userprofile',
      }} >
      <div className={style.proflist}>
        Profile
      </div>
      </Link>
    </Box>
  );
  return (
    <>
      <div>
        {/* <SignedIn>
          <UserButton afterSignout={() => navigate("/signin")} />
        </SignedIn> */}
        <div className={style.homenav}>
          <SearchBar />
          <button onClick={toggleDrawer(true)} className={style.profbut}>Profile</button>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
      </div>
      <Feedlist products={products} />
    </>
  );
}
export default CustomerHome;
