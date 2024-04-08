import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
// import products from "../../data/products";
import Feedlist from "../../component/CustomerHomePage/Feedlist";
import { useNavigate } from "react-router-dom";
import style from "./CustomerHome.module.css";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChatIcon from "@mui/icons-material/Chat";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

function CustomerHome() {
  const [value, setValue] = useState(0);
  const [products, setData] = useState([]);
  const [open, setOpen] = useState(false);

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
    <Box
      sx={{ width: 200, height: "100%", backgroundColor: "white" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <Link to="/userprofile" className={style.navto}>
          <ListItem key="My Account" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/cart" className={style.navto}>
          <ListItem key="Cart" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="My Cart" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/myorders" className={style.navto}>
          <ListItem key="My Orders" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/mychat" className={style.navto}>
          <ListItem key="My Chat" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="My Chat" />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem key="Log Out" disablePadding>
          <ListItemButton onClick={handlelogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ color: "black" }} />
    </Box>
  );
  return (
    <>
      <div className={style.parentdiv}>
        {/* <SignedIn>
          <UserButton afterSignout={() => navigate("/signin")} />
        </SignedIn> */}
        <div className={style.homenav}>
          <SearchBar />
          <MenuIcon onClick={toggleDrawer(true)} className={style.profbut} />
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
      </div>
      <Feedlist products={products} />
    </>
  );
}
export default CustomerHome;
