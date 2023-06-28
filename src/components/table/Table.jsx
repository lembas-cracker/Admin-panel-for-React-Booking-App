import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../useFetchHook";
import { API_BASE_URL } from "../../api";
import axios from "axios";

const List = () => {
  const { data, loading, error } = useFetch(API_BASE_URL + "/hotels/rating");

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Rating</TableCell>
            <TableCell className="tableCell">Hotel</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell">Title</TableCell>
            <TableCell className="tableCell">Cheapest Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((hotel, i) => (
            <TableRow key={i}>
              <TableCell className="tableCell">
                <div className="table-rating">
                  <span aria-hidden="true" class="b6dc9a9e69 adc357e4f1 fe621d6382">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
                    </svg>
                  </span>
                  {hotel.rating}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={hotel.photos[0]} alt="" className="image" />
                  {hotel.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{hotel.description}</TableCell>
              <TableCell className="tableCell">{hotel.city}</TableCell>
              <TableCell className="tableCell">{hotel.title}</TableCell>
              <TableCell className="tableCell">{hotel.cheapestPrice}</TableCell>
              <TableCell className="tableCell"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
