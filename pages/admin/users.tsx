import { useState, useEffect } from "react";
import { NextPage } from "next";

import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import { Grid, Select, Typography, MenuItem } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";

import { shopiMeApi } from "../../api";
import { IUser } from "../../interfaces";
import { AdminLayout } from "../../components/layouts";

const UsersPage: NextPage = () => {
  const { data, error } = useSWR<Array<IUser>>("/api/admin/users");
  const [users, setUsers] = useState<Array<IUser>>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) {
    return <></>;
  }

  const onRoleUpdated = async (userId: string, newRole: "admin" | "client") => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUsers: Array<IUser> = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));
    setUsers(updatedUsers);

    try {
      await shopiMeApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previousUsers);
      alert("No se pudo actualizar el rol del usuario");
    }
  };

  const columns: Array<GridColDef> = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre", width: 300 },
    {
      field: "role",
      headerName: "Rol del usuario",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label='Rol'
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value='admin'>Administrador</MenuItem>
            <MenuItem value='client'>Cliente</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Administrar usuarios"}
      pageDescription={"Manage all system users"}
      icon={<PeopleOutline />}
    >
      <Typography variant='h1' component={"h1"}>
        Historial de ordenes
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
