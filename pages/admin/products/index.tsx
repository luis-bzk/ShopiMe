import { NextPage } from "next";
import NextLink from "next/link";

import useSWR from "swr";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { AddOutlined, CategoryOutlined, WidthFull } from "@mui/icons-material";

import { IProduct } from "../../../interfaces";
import { AdminLayout } from "../../../components/layouts";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Imagen",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia component={"img"} className='fadeIn' alt={`image ${row.title}`} image={`/products/${row.img}`} />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
          <Link className='blue-link' fontWeight='500' color={"secondary"}>
            {row.title}
          </Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Genero" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage: NextPage = () => {
  const { data, error } = useSWR<Array<IProduct>>("/api/admin/products");

  if (!data && !error) {
    return <></>;
  }

  const rows = data!.map((product, idx) => {
    return {
      id: product._id,
      img: product.images[0],
      title: product.title,
      gender: product.gender,
      type: product.type,
      inStock: product.inStock,
      price: product.price,
      sizes: product.sizes.join(" | "),
      slug: product.slug,
    };
  });

  return (
    <AdminLayout
      title={`Productos ${data?.length}`}
      subTitle={"Administrar mis productos"}
      pageDescription={"Management of products"}
      icon={<CategoryOutlined />}
    >
      {/* <Typography variant='h1' component={"h1"}>
        Historial de ordenes
      </Typography> */}

      <Box display={"flex"} flexDirection={"row"} justifyContent={"end"} sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color='secondary' href='/admin/products/new'>
          Crear producto
        </Button>
      </Box>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
