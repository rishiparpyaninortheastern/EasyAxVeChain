import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import vechain from "../assets/Velogo.jpeg";
import Hidden from "@mui/material/Hidden";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Logout"];
const page = ["Listings", "Merchandise"];
function abbreviateAddress(address) {
  if (!address) return "";
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
}

function Header({ userAddress }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
    bio: "Hello Ths is me ..the great guy",
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = (setting) => {
    if (setting === "Profile") {
      navigate("/userProfile", { state: { user: user } });
    } else if (setting === "Logout") {
      window.location.reload();
    }
    handleCloseUserMenu();
  };
  const handleLInkItemClick = (pages) => {
    console.log(pages);
    if (pages === "Listings") {
      navigate("/listings");
    }  if (pages === "Merchandise") {
      navigate("/merch");
    }
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#50e0ff", color: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Icon */}
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant={{ xs: "h5", md: "h6" }}
            noWrap
            component="a"
            onClick={() => navigate("/home")}
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ECO VOYAGE
          </Typography>

          {/* Navigation Menu for Small Screens */}
          <Hidden mdUp>
            <IconButton
              size="large"
              aria-label="open drawer"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          {/* Navigation Menu for Medium and Up Screens */}
          <Hidden smDown>
            {page.map((p) => (
              <Button
                key={p}
                sx={{ my: 2, color: "white", marginLeft: 2 }}
                onClick={() => handleLInkItemClick(p)}
              >
                {p}
              </Button>
            ))}
          </Hidden>

          {/* User Avatar and Address */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="Remy Sharp" src={vechain} />
              <Box
                sx={{
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: 1,
                  paddingLeft: 1,
                  paddingRight: 1,
                  marginLeft: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  {abbreviateAddress(userAddress)}
                </Typography>
              </Box>
            </IconButton>
          </Tooltip>

          {/* Navigation Menu for Small Screens */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {/* {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))} */}
          </Menu>

          {/* User Menu */}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleMenuItemClick(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
