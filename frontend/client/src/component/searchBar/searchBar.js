// SearchBar.js
import React from "react";
import styles from "./searchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleChange = (e) => {
    onSearch(e.target.value);
  };
  async function handlelogout() {
    console.log("thai che");
    try {
      const response = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/logout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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
        <Link to="/myaccount" className={styles.navto}>
          <ListItem key="My Account" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/cart" className={styles.navto}>
          <ListItem key="Cart" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="My Cart" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/myorders" className={styles.navto}>
          <ListItem key="My Orders" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/mychat" className={styles.navto}>
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
    <div className={styles.homenav}>
      <div className={styles.searchBar}>
        <input
          className={styles.search}
          type="text"
          placeholder="  Search..."
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.searchico}
        />
      </div>
      <MenuIcon onClick={toggleDrawer(true)} className={styles.profbut} />
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SearchBar;
