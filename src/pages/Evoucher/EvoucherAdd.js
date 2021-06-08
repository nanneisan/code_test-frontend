import "date-fns";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Select, MenuItem } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnUtils from "@date-io/date-fns";
// import moment from "moment";

//components
import Label from "../../components/Label";
import Input from "../../components/Input";
import AppButton from "../../components/Button";

import { getPaymentMethod, create } from "../../services/evoucherService";

const BUY_TYPE_OPTION = [
  {
    value: 1,
    label: "Only me",
  },
  {
    value: 2,
    label: "Others",
  },
];

const useStyles = makeStyles({
  label: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  row: {
    marginTop: 20,
  },
  btnSave: {
    marginRight: 10,
  },
  fl_right: {
    float: "right",
  },
});

function CityAdd() {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [buyers, setBuyers] = useState({});

  const [ExpireDate, setExpireDate] = useState(new Date());

  /**
   * paymentmethod list and data fetching
   */
  const [PaymentList, setPaymentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaymentMethod();

        const body = await response.data;
        setPaymentList(body?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUserInfoChange = (e) => {
    setBuyers({ ...buyers, [e.target.name]: e.target.value });
  };

  const save = async () => {
    data.buyers = [buyers];
    data.expiry_date = ExpireDate;

    const response = await create(data);

    if (response) window.location.replace("/");
  };

  return (
    <div>
      <Label variant="h5">Evoucher Entry</Label>
      <Grid container spacing={3} className={classes.row}>
        <Grid item xs={12} sm={3}>
          <Label variant="body1" className={classes.label}>
            Title:
          </Label>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Input
            id="filled-full-width"
            variant="outlined"
            size="small"
            fullWidth={true}
            name="title"
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label variant="body1" className={classes.label}>
            Description:
          </Label>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Input
            id="filled-full-width"
            variant="outlined"
            size="small"
            fullWidth={true}
            name="description"
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          {/* <Label variant="body1" className={classes.label}>
            Expiry Date:
  </Label> */}
        </Grid>
        <Grid item xs={12} sm={7}>
          <MuiPickersUtilsProvider utils={DateFnUtils}>
            <KeyboardDatePicker
              margin="normal"
              variant={"inline"}
              id="date-picker-dialog"
              label={"Expiry Date"}
              format="MM/dd/yyyy"
              value={ExpireDate}
              fullWidth={true}
              name={"expiry_date"}
              onChange={(date) => setExpireDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label variant="body1" className={classes.label}>
            Amount:
          </Label>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Input
            id="filled-full-width"
            variant="outlined"
            size="small"
            fullWidth={true}
            name="amount"
            type={"number"}
            min={0}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label variant="body1" className={classes.label}>
            Quantity:
          </Label>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Input
            id="filled-full-width"
            variant="outlined"
            size="small"
            fullWidth={true}
            name="quantity"
            type={"number"}
            min={0}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label variant="body1" className={classes.label}>
            Payment Method:
          </Label>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Select
            labelId="payment_method_list_label"
            id="payment_method_list"
            value={data["payment_method"]}
            name={"payment_method"}
            onChange={handleChange}
            fullWidth={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {PaymentList.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Label variant="body1" className={classes.label}>
            Buy Type:
          </Label>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Select
            labelId="buy_type_label"
            id="buy_type"
            value={data["buy_type"]}
            name={"buy_type"}
            onChange={handleChange}
            fullWidth={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {BUY_TYPE_OPTION.map(({ value, label }) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {data["buy_type"] ? (
          <>
            <Grid item xs={12} sm={3}>
              <Label variant="body2" className={classes.label}>
                Name:
              </Label>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Input
                id="buy-type-name"
                variant="outlined"
                size="small"
                fullWidth={true}
                name="name"
                handleChange={handleUserInfoChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Label variant="body2" className={classes.label}>
                Phone Number:
              </Label>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Input
                id="buy-type-phone"
                variant="outlined"
                size="small"
                fullWidth={true}
                name="phone_no"
                handleChange={handleUserInfoChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Label variant="body2" className={classes.label}>
                Limit:
              </Label>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Input
                id="buy-type-limit"
                variant="outlined"
                size="small"
                fullWidth={true}
                name="evoucher_limit"
                type={"number"}
                handleChange={handleUserInfoChange}
              />
            </Grid>
          </>
        ) : null}

        <Grid item xs={12} sm={10}>
          <div className={classes.fl_right}>
            <AppButton
              variant="contained"
              color="primary"
              className={classes.btnSave}
              onClick={save}
            >
              Save
            </AppButton>
            <AppButton
              variant="outlined"
              onClick={() => {
                setData({});
                setBuyers({});
              }}
            >
              Cancel
            </AppButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CityAdd;
