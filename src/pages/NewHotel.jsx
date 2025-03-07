import "./new-hotel.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from "react";
import { hotelInputs } from "../formSource";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";
import axios from "axios";
import { lightGreen } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const { data, loading, error } = useFetch(API_BASE_URL + "/rooms");
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

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!formLoading) {
      setSuccess(false);
      setFormLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setFormLoading(false);
      }, 8000);
    }

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/senia/image/upload", data);
          const { url } = uploadResponse.data;

          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post(API_BASE_URL + "/hotels", newHotel, { withCredentials: true });
      alert("Hotel has been created!");
      navigate("/hotels");
    } catch (error) {
      alert("Something went wrong! Hotel has not been created. Try again later.");
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
            </form>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ ...buttonSx, position: "relative" }}
                disabled={loading}
                onClick={handleClick}
              >
                Send
                {formLoading && (
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
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
