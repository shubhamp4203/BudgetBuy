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
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonIcon from '@mui/icons-material/Person';
const SearchBar = ({ onSearch, onPriceRangeChange, onLikesRangeChange, isLoggedin }) => {
  const [open, setOpen] = React.useState(false);
  const [filteropen, setfilterOpen] = React.useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const resp = await fetch(process.env.REACT_APP_URL_AUTHENTICATION + "/authenticate", {
        credentials: "include",
      })
      if(resp.ok) {
        setIsLoggedin(true);
      }
      else {
        setIsLoggedin(false);
      }
    };
    authenticate();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const filtertoggleDrawer = (newfilterOpen) => () => {
    setfilterOpen(newfilterOpen);
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    onSearch(event.target.value);
  };

  const login = async () => {
    navigate("/signin");
  }

  async function handlelogout() {
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
  const filterDrawerList = (
    <Box
      sx={{ width: 200, height: "100%", backgroundColor: "white" }}
      role="presentation"
      onClick={filtertoggleDrawer(false)}
    >
      <div className={styles.filterDrawerList}>
        <List>
          <ListItem
            key="Price"
            disablePadding
            className={styles.ListItemheading}
          >
            Price:
          </ListItem>
          <ListItem key="Price" disablePadding className={styles.ListItemInput}>
            <label htmlFor="min">min:</label>
            <input
              type="tel"
              id="min"
              className={styles.smallInput}
              onClick={(e) => e.stopPropagation()}
            />
            <label htmlFor="max">max:</label>
            <input
              type="tel"
              id="max"
              className={styles.smallInput}
              onClick={(e) => e.stopPropagation()}
            />
          </ListItem>

          <ListItem
            key="Price"
            disablePadding
            className={styles.ListItemheading}
          >
            Likes:
          </ListItem>
          <ListItem key="Likes" disablePadding className={styles.ListItemInput}>
            <label htmlFor="min">min:</label>
            <input
              type="tel"
              id="min"
              className={styles.smallInput}
              onClick={(e) => e.stopPropagation()}
            />
            <label htmlFor="max">max:</label>
            <input
              type="tel"
              id="max"
              className={styles.smallInput}
              onClick={(e) => e.stopPropagation()}
            />
          </ListItem>
        </List>
      </div>
    </Box>
  );
  return (
    <div className={styles.homenav}>
      <FilterListIcon
        onClick={filtertoggleDrawer(true)}
        className={styles.filbut}
      />
      <Drawer
        anchor="left"
        open={filteropen}
        onClose={filtertoggleDrawer(false)}
      >
        {filterDrawerList}
      </Drawer>
      <div className={styles.searchBar}>
        <input
          value={searchInput}
          className={styles.search}
          type="text"
          placeholder="  Search..."
          onChange={handleSearch}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.searchico}
        />
      </div>
      {loggedin ? <MenuIcon onClick={toggleDrawer(true)} className={styles.profbut} /> : (<><PersonIcon onClick={login} className={styles.profbut}/></>)}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SearchBar;
