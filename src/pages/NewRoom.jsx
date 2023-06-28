import "./new-room.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { createRef, useRef, useState } from "react";
import { API_BASE_URL } from "../api";
import useFetch from "../useFetchHook";
import { roomInputs } from "../formSource";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const { data, loading, error } = useFetch(API_BASE_URL + "/hotels");
  const [rooms, setRooms] = useState([]);

  const infoRef = useRef([]);
  const roomRef = useRef();
  const listRef = useRef();

  infoRef.current = roomInputs.map((_, i) => infoRef.current[i] ?? createRef());
  console.log(infoRef.current);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); //setting room information from room.model
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    try {
      await axios.post(API_BASE_URL + `/rooms/${hotelId}`, { ...info, roomNumbers }, { withCredentials: true });
      alert("Room has been created!");
    } catch (error) {
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

              <div className="formInput maxContentElement">
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
            <div className="button-cont">
              <button onClick={handleClick}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
