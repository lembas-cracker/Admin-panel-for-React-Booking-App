import "./new-user.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { useSidebar } from "../context/SidebarContext";

const NewUser = ({ inputs, title }) => {
  const { isSidebarOpen } = useSidebar();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const timer = useRef(undefined);

  const buttonSx = {
    ...(success && {
      bgcolor: lightGreen[500],
      "&:hover": {
        bgcolor: lightGreen[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); //setting user information from user.model
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 8000);
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/senia/image/upload", data);
      const { url } = uploadResponse.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post(API_BASE_URL + "/auth/register", newUser);
      alert("User has been created!");
      navigate("/users");
    } catch (error) {
      alert("Something went wrong! User has not been created. Try again later.");
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className={`newContainer ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}

              <Box sx={{ m: 1, position: "relative" }} className="formButton">
                <Button variant="contained" sx={buttonSx} disabled={loading} onClick={handleClick}>
                  Send
                </Button>
                {loading && (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: lightGreen[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
