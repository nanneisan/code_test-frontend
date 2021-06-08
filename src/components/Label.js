import React from "react";
import Typography from "@material-ui/core/Typography";

function Label(props) {
  const { variant, label, children, className } = props;
  return (
    <Typography variant={variant} className={className}>
      {label || children}
    </Typography>
  );
}

export default Label;
