import { Box, Button } from "@mui/material";
import { FC } from "react";
import { IValidSize } from "../../../interfaces";

interface Props {
  selectedSize?: IValidSize;
  sizes: Array<IValidSize>;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  console.log(selectedSize);
  return (
    <Box>
      {sizes.map((size) => {
        return (
          <Button key={size} size='small' color={selectedSize === size ? "primary" : "info"}>
            {size}
          </Button>
        );
      })}
    </Box>
  );
};
