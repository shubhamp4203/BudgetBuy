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
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";
import SellerNavbar from "../../component/Seller Navbar/NavBar";
import {useNavigate} from "react-router-dom"
import {toast, Toaster} from  "sonner";
export default function SellerAccount() {
  const navigate = useNavigate();
  async function handlelogout() {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL_SELLER + "/sellerlogout",
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
        navigate("/sellersignin");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <Toaster richColors position="top-center" />
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
            <Link to="/addaddress" className={styles.navto}>
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
            <Link to="/addcard" className={styles.navto}>
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
                onClick={handlelogout}
                sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </div>
      <SellerNavbar/>
    </div>
  );
}
