import "./single-hotel.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Chart from "../components/chart/Chart";
import List from "../components/table/Table";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const SingleHotel = () => {
  const location = useLocation();
  const hotel_id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);

  const { data, loading, error } = useFetch(API_BASE_URL + `/hotels/find/${hotel_id}`);

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
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
                  <h1 className="itemTitle">{data.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <span className="itemValue">{data.city}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{data.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Distance:</span>
                    <span className="itemValue">{data.distance}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{data.description}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Rooms:</span>
                    <span className="itemValue">{data.rooms.length} available rooms</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Cheapest Price:</span>
                    <span className="itemValue">{data.cheapestPrice}</span>
                  </div>
                  {data.rating ? (
                    <div className="detailItem">
                      <span className="itemKey">Rating:</span>
                      <span className="itemValue">{data.rating}</span>
                    </div>
                  ) : (
                    <span className="itemValue">"Not Rated Yet"</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Hotel Booking ( Last 6 Months)" />
          </div>
        </div>
        {loading ? (
          "Loading Photos..."
        ) : (
          <div className="bottom">
            <div className="item-photos">
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="slider-wrapper">
                <img src={data.photos[slideNumber]} onClick={(d) => handleMove(d)} alt="" className="item-images" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
            </div>
          </div>
        )}
        <div className="bottom">
          <h1 className="title">Best Hotels</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
