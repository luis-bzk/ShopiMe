import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from "@mui/material";

import { dbOrders } from "../../database";
import { ShopLayout } from "../../components/layouts";
import { IOrder, IOrderResponseBody } from "../../interfaces";
import { CartList, OrderSummary } from "../../components/cart";
import { shopiMeApi } from "../../api";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  order: IOrder;
}
const OrderPage: NextPage<Props> = ({ order }) => {
  const [loadingPayment, setLoadingPayment] = useState(false);
  const router = useRouter();
  const { _id, isPaid, quantityProducts, orderItems, shippingAddress, subtotalCost, taxRateCost, totalCost } = order;

  const onOrderCompleted = async (details: IOrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No hay pago por parte de Paypal");
    }

    setLoadingPayment(true);

    try {
      await shopiMeApi.post("/orders/pay", {
        transactionId: details.id,
        orderId: _id,
      });

      router.reload();
    } catch (error) {
      console.log(error);
      alert("Error");
      setLoadingPayment(false);
    }
  };

  return (
    <ShopLayout title={`Orden: ${_id}`} pageDescription={"Resumen de la orden"}>
      <Typography variant='h1' component={"h1"}>
        Resumen de la orden: {_id}
      </Typography>

      {isPaid ? (
        <Chip
          sx={{ marginY: 2 }}
          label='Orden pagada'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ marginY: 2 }}
          label='Pendiente de pago'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined />}
        />
      )}

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

              <Box sx={{ marginTop: 3 }} display={"flex"} flexDirection={"column"}>
                {loadingPayment && (
                  <Box display={"flex"} justifyContent={"center"} className={"fadeIn"}>
                    <CircularProgress />
                  </Box>
                )}

                <Box sx={{ display: loadingPayment ? "none " : "flex", flex: 1 }} flexDirection={"column"}>
                  {isPaid ? (
                    <Chip
                      sx={{ marginY: 2 }}
                      label='Orden pagada'
                      variant='outlined'
                      color='success'
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalCost.toString(),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  // const { data } = await  // your fetch function here
  const { id = "" } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?page=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};

export default OrderPage;
