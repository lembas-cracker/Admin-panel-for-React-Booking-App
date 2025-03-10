import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useSidebar } from "../../context/SidebarContext";
import { Link } from "@mui/material";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="navbar">
      <div className="hamburger" onClick={toggleSidebar}>
        <ListOutlinedIcon className="icon" />
      </div>
      <div className="search">
        <input type="text" placeholder="Search..." />
        <SearchOutlinedIcon />
      </div>
      <div className="wrapper">
        <div className="items">
          <Link href="https://github.com/lembas-cracker/Admin-panel-for-React-Booking-App" className="item">
            <GitHubIcon className="icon" />
          </Link>

          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <PersonOutlineIcon className="icon avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
