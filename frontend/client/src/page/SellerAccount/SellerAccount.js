import Navbar from "../../component/NavBar/NavBar";
import SearchBar from "../../component/searchBar/searchBar";
import styles from "./SellerAccount.module.css";
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
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewListIcon from "@mui/icons-material/ViewList";

import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SellerAccount() {
  return (
    <div>
      <SearchBar />
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
        <Divider />
        <Box
          sx={{ width: "100%", height: "100%", backgroundColor: "white" }}
          role="presentation"
        >
          <List sx={{ paddingTop: "0rem" }}>
            <Link to="/sellerprofile" className={styles.navto}>
              <ListItem key="User Profile" disablePadding>
                <ListItemButton
                  sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <ListItemIcon>
                    <EditIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/addselleraddress" className={styles.navto}>
              <ListItem key="Address" disablePadding>
                <ListItemButton
                  sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <ListItemIcon>
                    <EditLocationAltIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Address" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/addsellercard" className={styles.navto}>
              <ListItem key="Cards" disablePadding>
                <ListItemButton
                  sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <ListItemIcon>
                    <AddCardIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Cards" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/mysetting" className={styles.navto}>
              <ListItem key="Setting" disablePadding>
                <ListItemButton
                  sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Setting" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <ListItem key="Log Out" disablePadding>
              <ListItemButton
                sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Link to="/addproduct" className={styles.navto}>
              <ListItem key="Add New Product" disablePadding>
                <ListItemButton
                  sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <ListItemIcon>
                    <AddCircleIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Add New Product" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/yourproducts" className={styles.navto}>
              <ListItem key="your products" disablePadding>
                <ListItemButton
                  sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <ListItemIcon>
                    <ViewListIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Your Products" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </div>
      <Navbar />
    </div>
  );
}
