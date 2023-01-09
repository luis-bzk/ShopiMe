import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface Props {
  currentValue: number;
  updatedQuantity: (value: number) => void;
  maxValue: number;
}

export const ItemCounter: FC<Props> = ({ currentValue, updatedQuantity, maxValue }) => {
  const handleAddOrRemove = (newValue: number) => {
    if (newValue === -1) {
      if (currentValue === 1) {
        return;
      }

      return updatedQuantity(currentValue - 1);
    }

    // if (maxValue === 0 || currentValue === maxValue) {
    if (currentValue >= maxValue) {
      return;
    }

    return updatedQuantity(currentValue + 1);
  };

  return (
    <Box display={"flex"} alignItems='center'>
      <IconButton onClick={() => handleAddOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: "center" }}>{currentValue}</Typography>

      <IconButton onClick={() => handleAddOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
