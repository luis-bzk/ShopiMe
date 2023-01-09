import { NextPage } from "next";
import { GetServerSideProps } from "next";

import { CreditCardOffOutlined, CreditScoreOutlined, SellOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";

import { dbOrders } from "../../../database";
import { AdminLayout } from "../../../components/layouts";
import { IOrder } from "../../../interfaces";
import { CartList, OrderSummary } from "../../../components/cart";
import { useRouter } from "next/router";

interface Props {
  order: IOrder;
}

const OrderAdminPage: NextPage<Props> = ({ order }) => {
  const { _id, isPaid, quantityProducts, orderItems, shippingAddress, subtotalCost, taxRateCost, totalCost } = order;
  const router = useRouter();

  return (
    <AdminLayout
      title={`Resumen de la orden: ${_id}`}
      subTitle={"Administrar orden de usuario"}
      pageDescription={"Manage user order"}
      icon={<SellOutlined />}
    >
      <Box display={"flex"} flexDirection={"row"} justifyContent={"end"}>
        <Button color='primary' onClick={() => router.push("/admin/orders")}>
          Ver todas las ordenes
        </Button>
      </Box>

      <Grid container sx={{ marginTop: 3 }} className='fadeIn'>
        <Grid item xs={12} md={7}>
          <CartList orderProducts={orderItems} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ({quantityProducts} {quantityProducts > 1 ? "productos" : "producto"})
              </Typography>

              <Divider sx={{ marginY: 1 }} />

              <Box display={"flex"} justifyContent='space-between' alignItems={"center"}>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>

              <Typography>
                {shippingAddress.name} {shippingAddress.lastname}
              </Typography>
              <Typography>
                {shippingAddress.address}
                {shippingAddress.address2 && `, ${shippingAddress.address2}`}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zipcode}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ marginY: 1 }} />

              <OrderSummary orderValues={{ quantityProducts, subtotalCost, taxRateCost, totalCost }} />

              {isPaid ? (
                <Chip
                  sx={{ marginY: 2, display: "flex", flexDirection: "row" }}
                  label='Orden pagada'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              ) : (
                <Chip
                  sx={{ marginY: 2, display: "flex", flexDirection: "row" }}
                  label='Pendiente de pago'
                  variant='outlined'
                  color='error'
                  icon={<CreditCardOffOutlined />}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = "" } = query;

  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};

export default OrderAdminPage;
