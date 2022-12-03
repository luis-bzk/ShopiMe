import { CreditCardOffOutlined, CreditScoreOutlined, LinkOffOutlined } from "@mui/icons-material";
import { Chip, Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { FC } from "react";
import { ShopLayout } from "../../components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Nombre completo", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra un tooltip",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Pagada' variant='outlined' icon={<CreditScoreOutlined />} />
      ) : (
        <Chip color='error' label='No Pagada' variant='outlined' icon={<CreditCardOffOutlined />} />
      );
    },
  },
  {
    field: "orderLink",
    headerName: "Orden",
    width: 150,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link className='blue-link' fontWeight='500'>
            Ver orden
          </Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: "2313N3LK", fullName: "Juan Carlos", email: "email@email.com", paid: false },
  { id: "87GD659G", fullName: "Pedro Carrillo", email: "email2@email.com", paid: true },
  { id: "0934I2NF", fullName: "Juan Carlos", email: "email@email.com", paid: false },
  { id: "DFG08YU3", fullName: "Juan Carlos", email: "email@email.com", paid: true },
  { id: "34KN2K4D", fullName: "Sofia Rodriguez", email: "email3@email.com", paid: true },
  { id: "SDP39043", fullName: "Juan Carlos", email: "email@email.com", paid: false },
];
const HistoryPage: FC = () => {
  return (
    <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de ordenes del cliente"}>
      <Typography variant='h1' component={"h1"}>
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          ></DataGrid>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
