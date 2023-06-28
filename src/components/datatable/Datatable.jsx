import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api";
import useFetch from "../../useFetchHook";
import axios from "axios";

console.log("DataGrid:", DataGrid);

const Datatable = ({ columns, showViewButton }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(API_BASE_URL + `/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(API_BASE_URL + `/${path}/${id}`, { withCredentials: true });
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {showViewButton && (
              <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
            )}
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const allColumns = columns.concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {`${path.toUpperCase()}`}
        <Link to={`/${path}/new`} className="link">
          {`Add new ${path}`}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list.slice(1)}
        columns={allColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
