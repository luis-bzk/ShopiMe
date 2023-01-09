import { FC } from "react";

import { CreditCardOffOutlined } from "@mui/icons-material";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <CardContent sx={{ width: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {icon}
        </CardContent>

        <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
          <Typography variant={"h3"} component={"h3"}>
            {title}
          </Typography>
          <Typography variant={"caption"}>{subTitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
