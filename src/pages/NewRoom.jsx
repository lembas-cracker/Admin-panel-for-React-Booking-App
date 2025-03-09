import "./new-room.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { createRef, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../api";
import useFetch from "../useFetchHook";
import { roomInputs } from "../formSource";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NewRoom = () => {
  const theme = useTheme();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const { data, loading, error } = useFetch(API_BASE_URL + "/hotels");
  const [rooms, setRooms] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const infoRef = useRef([]);
  const roomRef = useRef();
  const listRef = useRef();

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

  infoRef.current = roomInputs.map((_, i) => infoRef.current[i] ?? createRef());
  console.log(infoRef.current);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); //setting room information from room.model
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
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    try {
      await axios.post(API_BASE_URL + `/rooms/${hotelId}`, { ...info, roomNumbers }, { withCredentials: true });
      alert("Room has been created!");
      navigate("/rooms");
    } catch (error) {
      alert("Something went wrong! Room has not been created. Try again later.");
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input, i) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <div className="formInput maxContentElement">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  ref={roomRef}
                  placeholder="type in comma-separated room numbers"
                ></textarea>
              </div>

              <div className="formInput maxContentElement formSelect">
                <label>Choose a hotel</label>
                <select ref={listRef} id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                  <option value="text">-Select a Hotel-</option>
                  {loading
                    ? "Loading..."
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
            </form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",

                [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                  justifyContent: "flex-start",
                },
              }}
            >
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

export default NewRoom;
