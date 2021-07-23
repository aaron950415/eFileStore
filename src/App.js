import "./App.css";
import { Switch, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <>
      <Header></Header>
      <Suspense fallback={<Loading />}>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/history" exact component={History} />
            <Route path="/about" exact component={About} />
            <Route path="/Login" exact component={Login} />
            <Route path="/Register" exact component={Register} />
          </Switch>
        </main>
      </Suspense>
      <Footer></Footer>
    </>
  );
}

export default App;
