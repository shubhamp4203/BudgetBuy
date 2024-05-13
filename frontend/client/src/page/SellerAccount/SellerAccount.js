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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";
import SellerNavbar from "../../component/Seller Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useLocation } from "react-router-dom";
export default function SellerAccount() {
  const [totalsales, settotalsales] = useState(0);
  const location = useLocation();
  const [totalProducts, settotalProducts] = useState(0);
  const [totalRevenue, settotalRevenue] = useState(0);
  const seller_id = location.state.sellerid
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {

        const data = {
          seller_id
        }

        const resp = await fetch(process.env.REACT_APP_URL_SELLER + "/getDashboard", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if(resp.ok) {
          const data = await resp.json();
          settotalRevenue(data.seller.total_revenue);
          settotalProducts(data.seller.total_products);
          settotalsales(data.seller.total_sales);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [])



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
      <div className={styles.container}>
        <div className={styles.dashboard}>
        <div className={styles.dashchild}>
            <div>Total Revenue:</div>
            <p>₹  {new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                  }).format(totalRevenue)}</p>
          </div>
          <div className={styles.dashchild}>
            <div>Total Sales:</div>
            <p>{totalsales}</p>
          </div>
          <div className={styles.dashchild}>
            <div>Total Listed Products:</div>
            <p>{totalProducts}</p>
          </div>
        </div>
        <br/>
        <br/>
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
            <Link to="/editselleraddress" className={styles.navto}>
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
            <Link to="/editbank" className={styles.navto}>
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
            <Link to="/orders" className={styles.navto}>
              <ListItem key="My Orders" disablePadding>
                <ListItemButton
                  sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <ListItemIcon>
                    <LocalShippingIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
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
      <SellerNavbar />
    </div>
  );
}
