import { NextPage } from "next";
import NextLink from "next/link";

import useSWR from "swr";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ConfirmationNumberOutlined, CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

import { IOrder, IUser } from "../../../interfaces";
import { AdminLayout } from "../../../components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "email", headerName: "Correo", width: 200 },
  { field: "user", headerName: "Usuario", width: 200 },
  { field: "totalCost", headerName: "Costo total", width: 150, align: "left" },
  { field: "quantityProducts", headerName: "No. Productos", width: 100 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra un tooltip",
    width: 160,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Pagada' variant='outlined' icon={<CreditScoreOutlined />} />
      ) : (
        <Chip color='error' label='No Pagada' variant='outlined' icon={<CreditCardOffOutlined />} />
      );
    },
  },
  {
    field: "transactionId",
    headerName: "ID Transacción",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.transactionId ? params.row.transactionId : "Sin pago";
    },
  },
  {
    field: "orderLink",
    headerName: "Orden",
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/orders/${params.row.id}`} passHref legacyBehavior>
          <Link className='blue-link' fontWeight='500'>
            Ver orden
          </Link>
        </NextLink>
      );
    },
  },
  { field: "createdAt", headerName: "Creada en", width: 200 },
];

const OrdersUsersPage: NextPage = () => {
  const { data, error } = useSWR<Array<IOrder>>("/api/admin/orders");
  console.log(data);

  if (!data && !error) {
    return <></>;
  }

  const rows = data!.map((order, idx) => {
    return {
      id: order._id,
      email: (order.user! as IUser).email,
      user: (order.user! as IUser).name,
      totalCost: order.totalCost,
      quantityProducts: order.quantityProducts,
      transactionId: order.transactionId,
      paid: order.isPaid,
      createdAt: order.createdAt,
    };
  });

  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"Historial de ordenes"}
      pageDescription={"Manage all system users"}
      icon={<ConfirmationNumberOutlined />}
    >
      {/* <Typography variant='h1' component={"h1"}>
        Historial de ordenes
      </Typography> */}

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersUsersPage;
