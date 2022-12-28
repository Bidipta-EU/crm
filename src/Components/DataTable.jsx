import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// const columns = [
//   { field: "id", headerName: "CRM ID", width: 100 },
//   { field: "firstName", headerName: "School Name", width: 130 },
//   { field: "lastName", headerName: "Board", width: 130 },
//   {
//     field: "age",
//     headerName: "Address",
//     type: "number",
//     width: 90,
//   },
// ];

export default function DataTable({
  rows,
  checkbox,
  Tablecolumns,
  tableName,
  handleTaggingClick,
}) {
  const [q, setQ] = React.useState("");
  const [entries, setEntries] = React.useState(10);
  const navigate = useNavigate();
  const search = (rowss) => {
    return rowss.filter((row) => {
      switch (tableName) {
        case "SalesInvoice":
          return (
            row.cName.toLowerCase().indexOf(q) > -1 ||
            row.inDate.toLowerCase().indexOf(q) > -1 ||
            row.inNo.toLowerCase().indexOf(q) > -1 ||
            row.cCode.toLowerCase().indexOf(q) > -1 ||
            row.totalQty.toLowerCase().indexOf(q) > -1 ||
            row.total.toLowerCase().indexOf(q) > -1 ||
            row.city.toLowerCase().indexOf(q) > -1 ||
            row.State.toLowerCase().indexOf(q) > -1
          );
          break;
        case "SchoolDirectory":
          return (
            row.AffCode.toLowerCase().indexOf(q) > -1 ||
            row.SchoolName.toLowerCase().indexOf(q) > -1 ||
            row.Address.toLowerCase().indexOf(q) > -1 ||
            row.Board.toLowerCase().indexOf(q) > -1 ||
            row.City.toLowerCase().indexOf(q) > -1 ||
            row.Country.toLowerCase().indexOf(q) > -1 ||
            row.State.toLowerCase().indexOf(q) > -1
          );
          break;
        case "MySchool":
          return (
            row.CrmId.toLowerCase().indexOf(q) > -1 ||
            row.SchoolName.toLowerCase().indexOf(q) > -1 ||
            row.Address.toLowerCase().indexOf(q) > -1 ||
            row.Board.toLowerCase().indexOf(q) > -1 ||
            row.RequestedOn.toLowerCase().indexOf(q) > -1 ||
            row.UpdatedOn.toLowerCase().indexOf(q) > -1
          );
          break;
        case "Tagging":
          return (
            // row.CrmId.toLowerCase().indexOf(q) > -1 ||
            row.SchoolName?.toLowerCase().indexOf(q) > -1 ||
            row.Address?.toLowerCase().indexOf(q) > -1 ||
            row.Tagged?.toLowerCase().indexOf(q) > -1
            // row.RequestedOn.toLowerCase().indexOf(q) > -1 ||
            // row.UpdatedOn.toLowerCase().indexOf(q) > -1
          );
          break;
        case "UpdateStocks":
          return (
            row.BpCode.toLowerCase().indexOf(q) > -1 ||
            row.BpName.toLowerCase().indexOf(q) > -1
          );
          break;
        case "Opportunities":
          return (
            row.SchoolName.toLowerCase().indexOf(q) > -1 ||
            row.City.toLowerCase().indexOf(q) > -1 ||
            row.State.toLowerCase().indexOf(q) > -1 ||
            row.DecisionMaker.toLowerCase().indexOf(q) > -1 ||
            row.Status.toLowerCase().indexOf(q) > -1
          );
          break;
        case "ManageSchool":
          return (
            row?.SchoolName?.toLowerCase().indexOf(q) > -1 ||
            // row.City.toLowerCase().indexOf(q) > -1 ||
            row?.State?.toLowerCase().indexOf(q) > -1 ||
            row?.Address?.toLowerCase().indexOf(q) > -1
          );
          break;
          case "Test":
            return (
              row?.SchoolName?.toLowerCase().indexOf(q) > -1 ||
              // row.City.toLowerCase().indexOf(q) > -1 ||
              row?.State?.toLowerCase().indexOf(q) > -1 ||
              row?.Address?.toLowerCase().indexOf(q) > -1
            );
          break;

          case "ReturnOrder":
            return (
              row?.Customer?.toLowerCase().indexOf(q) > -1 ||
              // row.City.toLowerCase().indexOf(q) > -1 ||
              row?.Quantity?.toLowerCase().indexOf(q) > -1 ||
              row?.Status?.toLowerCase().indexOf(q) > -1
            );
            break;
        default:
          break;
      }
    });
  };

  const handleClick = (value) => {
    switch (tableName) {
      case "ManageSchool":
        navigate(`/update_school/${value[0]}`);
        break;
      case "Test":
        navigate(`/update_test/${value[0]}`);
        break;
      case "Tagging":
        // console.log('hi')
        handleTaggingClick(value);
        break;
      default:
        // console.log(value)
        break;
    }
  };

  return (
    <div className="relative mt-14">
      <div
        style={{ height: 450, width: "100%" }}
        className="bg-slate-200 rounded-md px-10 pt-16"
      >
        <DataGrid
          rows={search(rows)}
          // onRowClick={(event) => navigate(`/update_school/:id`)}
          columns={Tablecolumns}
          pageSize={entries}
          rowsPerPageOptions={[entries]}
          checkboxSelection={checkbox}
          onSelectionModelChange={(event) => handleClick(event)}
        />
      </div>
      <Search className=" text-gray-500 absolute top-[1.9rem] lg:top-[1.6rem] md:top-[1.4rem] !text-[1.2rem] right-[29.5vw] lg:right-[10.7rem] md:right-[16.5vw] z-20" />
      <input
        className="px-8 md:w-[15vw] w-[30vw] lg:w-40 focus:outline-0 hover:shadow-md transition-all duration-200 ease-linear py-1 lg:py-2 placeholder:text-gray-300 rounded-lg absolute top-6 md:top-4 right-6 md:right-10"
        placeholder="Search"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value.toLowerCase())}
      />

      <div className="flex items-center justify-center absolute top-4 lg:left-10 left-3 gap-3">
        <div className="flex flex-col md:flex-row gap-0 md:gap-2">
          <span>Showing</span>
          <span>Entries</span>
        </div>
        <select
          className="px-4 w-20 lg:w-40 focus:outline-0 transition-all duration-500 ease-linear py-1 rounded-lg "
          onClick={(e) => setEntries(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
}
