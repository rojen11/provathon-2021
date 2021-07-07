import { DataGrid } from "@material-ui/data-grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

const columns = [
  { field: "id", headerName: "Number", width: 110, sortable: false },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    width: 200,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

function Students(props) {
  const rows = props.students.map((student) => {
    return {
      id: student.id,
      lastName: student.lastName,
      firstName: student.firstName,
    };
  });
  return (
    <Paper
      elevation={5}
      className="mt-5"
      style={{ height: "30rem", width: "60%" }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        editable
        disableColumnMenu
        className="p-5 pb-3"
      />
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.CourseReducer.students,
  };
};

export default connect(mapStateToProps)(Students);
