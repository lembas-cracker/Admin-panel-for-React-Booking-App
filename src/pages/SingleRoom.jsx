import "./single-room.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import List from "../components/table/Table";
import { useLocation } from "react-router-dom";
import { DateCalendar } from "@mui/x-date-pickers";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";
import { useState } from "react";

const SingleRoom = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const location = useLocation();
  const room_id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(API_BASE_URL + `/rooms/${room_id}`);

  console.log("Room numbers:", data);

  const getUserLocalDate = (timestampString) => {
    // Parse the timestamp string to milliseconds since January 1, 1970, UTC
    const timestamp = Date.parse(timestampString);

    // Create a new Date object using the parsed timestamp
    const date = new Date(timestamp);

    // Get the user's local time zone offset in minutes
    const offsetMinutes = date.getTimezoneOffset();

    // Adjust the date by adding the offset in minutes
    date.setMinutes(date.getMinutes() + offsetMinutes);

    // Return the adjusted date
    return date;
  };

  const isSameDay = (date1, date2) => {
    // Extract the day, month, and year from both dates
    const day1 = date1.getDate();
    const month1 = date1.getMonth();
    const year1 = date1.getFullYear();

    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();

    // Compare the day, month, and year values
    return day1 === day2 && month1 === month2 && year1 === year2;
  };

  const isDateUnavailable = (targetDate) => {
    return data.roomNumbers?.some((room) =>
      room.unavailableDates.some((dateRange) =>
        dateRange.some((unavailableDate) => {
          if (isSameDay(getUserLocalDate(unavailableDate), targetDate)) {
            console.log(unavailableDate, getUserLocalDate(unavailableDate), targetDate);
          }
          return isSameDay(getUserLocalDate(unavailableDate), targetDate);
        })
      )
    );
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {loading ? (
              "Loading..."
            ) : (
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{data.title}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{data.desc}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Max People:</span>
                    <span className="itemValue">{data.maxPeople}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{data.price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Room Numbers:</span>
                    <span className="itemValue dates-item" onClick={() => setOpenCalendar(!openCalendar)}>
                      See Unavailable Dates <span style={{ fontSize: "10px", verticalAlign: "1px" }}>&#9660;</span>
                    </span>

                    {openCalendar && (
                      <DateCalendar className="calendar" shouldDisableDate={(day) => isDateUnavailable(day.toDate())} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Best Hotels</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
