import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { FileCopy, Refresh } from "@material-ui/icons";

//components
import AppButton from "./Button";
import Input from "./Input";

const useStyles = makeStyles({
  root: {
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    margin: 10,
  },
  btn: {
    color: "#fff",
    backgroundColor: "#5cb85c",
    borderColor: "#4cae4c",
    margin: 10,
  },
});

function TableFilter() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <AppButton
            variant="contained"
            className={classes.btn}
            startIcon={<Refresh />}
            disabled={true}
          >
            Load
          </AppButton>
          <AppButton
            variant="contained"
            className={classes.btn}
            startIcon={<FileCopy />}
            disabled={true}
          >
            Export
          </AppButton>
        </Grid>
        <Grid item>
          <Paper>
            <Input
              id="outlined-basic"
              variant="outlined"
              label="Search"
              size="small"
            ></Input>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TableFilter;
