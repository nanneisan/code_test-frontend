import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Nav from "./components/Nav";
import Routes from "./routes";
import Evoucher from "./pages/Evoucher";
import Footer from "./components/Footer";
import Header from "./components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    marginTop: 60,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: "15px 20px",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar}>
          <Header />
        </div>
        <div className={classes.main} />

        <Switch>
          <Route exact path="/" component={Evoucher} />
          {Routes.routes.map((route, k) => (
            <Route
              key={k}
              path={`/${route.name}`}
              component={route.component}
            />
          ))}
          <Route path="*" component={() => <div>Page Not Found</div>} />
        </Switch>
        <Footer />
      </main>
    </div>
  );
}

export default withRouter(App);
