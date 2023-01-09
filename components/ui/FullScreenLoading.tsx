import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

export const FullScreenLoading: FC = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"calc(100vh - 200px)"}
    >
      <Typography sx={{ marginBottom: 2 }}>Cargando...</Typography>

      <CircularProgress thickness={2} />
    </Box>
  );
};
