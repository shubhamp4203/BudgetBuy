import Navbar from "../../component/NavBar/NavBar";
import SearchBar from "../../component/searchBar/searchBar";
import styles from "./useraccount.module.css";
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
import EditIcon from '@mui/icons-material/Edit';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddCardIcon from '@mui/icons-material/AddCard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

export default function UserAccount() {
  const navigate = useNavigate();

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
  return (
    <div>
      {/* <SearchBar /> */}
      <div className={styles.container}>
        <div className={styles.dashboard}>
          <div className={styles.dash1}>
            <div>div1</div>
            <div>div2</div>
          </div>
          <div className={styles.dash2}>
            <div>div1</div>
            <div>div2</div>
          </div>
        </div>
        <Divider/>
        <Box
          sx={{ width: '100%', height: "100%", backgroundColor: "white" }}
          role="presentation"
        >
          <List sx={{paddingTop:'0rem'}}>
            <Link to="/userprofile" className={styles.navto}>
              <ListItem key="User Profile" disablePadding>
                <ListItemButton sx={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                  <ListItemIcon>
                    <EditIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider/>
            <Link to="/addaddress" className={styles.navto}>
              <ListItem key="Address" disablePadding>
                <ListItemButton sx={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                  <ListItemIcon>
                    <EditLocationAltIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Address" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider/>
            <Link to="/addcard" className={styles.navto}>
              <ListItem key="Cards" disablePadding>
                <ListItemButton sx={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                  <ListItemIcon>
                    <AddCardIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Cards" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider/>
            <Link to="/myorders" className={styles.navto}>
            <ListItem key="My Orders" disablePadding>
              <ListItemButton sx={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                <ListItemIcon>
                <LocalShippingIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
              </ListItemButton>
            </ListItem>
            </Link>
            <Divider/>
            <Link to="/mysetting" className={styles.navto}>
              <ListItem key="Setting" disablePadding>
                <ListItemButton sx={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Setting" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider/>
            <ListItem key="Log Out" disablePadding>
              <ListItemButton sx={{paddingTop: '1rem', paddingBottom: '1rem'}} onClick={handlelogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </div>
      <Navbar />
    </div>
  );
}
