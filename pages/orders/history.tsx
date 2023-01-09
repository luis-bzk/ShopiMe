import { NextPage, GetServerSideProps } from "next";
import NextLink from "next/link";

import { Chip, Grid, Link, Typography } from "@mui/material";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { ShopLayout } from "../../components/layouts";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "fullName", headerName: "Nombre completo", width: 350 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra un tooltip",
    width: 250,
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
    width: 250,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
          <Link className='blue-link' fontWeight='500'>
            Ver orden
          </Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: Array<IOrder>;
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, idx) => {
    return {
      id: idx + 1,
      fullName: `${order.shippingAddress.name} ${order.shippingAddress.lastname}`,
      paid: order.isPaid,
      orderId: order._id,
    };
  });

  return (
    <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de ordenes del cliente"}>
      <Typography variant='h1' component={"h1"}>
        Historial de ordenes
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const { data } = await  // your fetch function here

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?page=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUserId(session.user._id);

  return {
    props: { orders },
  };
};

export default HistoryPage;
