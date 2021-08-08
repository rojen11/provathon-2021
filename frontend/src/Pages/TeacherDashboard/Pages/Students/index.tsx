import Layout from "../../components/Layout";
import { Paper } from "@material-ui/core/";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect } from "react";
import { useActions } from "../../../../store/useActions";
import { useParams } from "react-router-dom";

type Params = {
  courseId: string;
};

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
    valueGetter: (params: any) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

export default function Students() {
  const studentState = useSelector((state: RootState) => state.student);

  const rows:any =
  studentState?.students !== undefined ? [...studentState?.students] : [];
  // const rows = [];

  const { loadStudents } = useActions();

  const { courseId } = useParams<Params>();

  useEffect(() => {
    loadStudents(courseId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Paper
        elevation={5}
        className="mt-5"
        style={{ height: "30rem", width: "60%" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          disableColumnMenu
          className="p-5 pb-3"
        />
      </Paper>
    </Layout>
  );
}
