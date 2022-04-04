import { Switch, Route } from "react-router-dom";
import React, { useEffect, lazy, Suspense } from "react";
import CookieConsent from "react-cookie-consent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMoralis } from "react-moralis";
import { useWeb3React } from '@web3-react/core';

import "./styles/app.sass";
import "./styles/custom.css";
import Page from "./components/Page";
import Spinner from "./components/Spinner/Spinner";
import { useEagerConnect } from "utils/hooks/use-connectors";
import CONNECTOR_NAMES from "utils/constants/connectorNames";

const Home = lazy(() => import("./screens/Home"));
const UploadVariants = lazy(() => import("./screens/UploadVariants"));
const UploadDetails = lazy(() => import("./screens/UploadDetails"));
const UploadDetailsMultiple = lazy(() =>
  import("./screens/UploadDetailsMultiple")
);
const ConnectWallet = lazy(() => import("./screens/ConnectWallet"));
const Activity = lazy(() => import("./screens/Activity"));
const Faq = lazy(() => import("./screens/Faq"));
const Search01 = lazy(() => import("./screens/Search01"));
const Search02 = lazy(() => import("./screens/Search02"));
const Profile = lazy(() => import("./screens/Profile"));
const ProfileEdit = lazy(() => import("./screens/ProfileEdit"));
const Item = lazy(() => import("./screens/Item"));
const PageList = lazy(() => import("./screens/PageList"));
const Login = lazy(() => import("./screens/login"));
const Register = lazy(() => import("./screens/register"));
const Form = lazy(() => import("./screens/form/form"));

const App = () => {
  const { authenticate, isAuthenticated, Moralis } = useMoralis();
  const { account } = useWeb3React();
  const { login } = useEagerConnect(parseInt(localStorage.getItem("chainId")) || 97, CONNECTOR_NAMES.injected);

  useEffect(() => {
    if (!account && !!localStorage.getItem("chainId")) {
      login();
    }
  }, [account, login])

  useEffect(() => {
    if (!isAuthenticated) {
      Moralis.start({ serverUrl: process.env.REACT_APP_SERVER_URL, appId: process.env.REACT_APP_MORALIS_APP_ID })
      authenticate();
    }
  }, [isAuthenticated, authenticate, Moralis]);

  return (
    <>
      {/* <NavigationBar /> */}
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path="/"
            render={() => (
              <Page>
                <Home />
              </Page>
            )}
          />
          <Route
            exact
            path="/upload-variants"
            render={() => (
              <Page>
                <UploadVariants />
              </Page>
            )}
          />
          <Route
            exact
            path="/upload-details"
            render={() => (
              <Page>
                <UploadDetails />
              </Page>
            )}
          />
          <Route
            exact
            path="/upload-details-multiple"
            render={() => (
              <Page>
                <UploadDetailsMultiple />
              </Page>
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Page>
                <Login />
              </Page>
            )}
          />
          <Route
            exact
            path="/register"
            render={() => (
              <Page>
                <Register />
              </Page>
            )}
          />
          <Route
            exact
            path="/connect-wallet"
            render={() => (
              <Page>
                <ConnectWallet />
              </Page>
            )}
          />

          {/* <Route
            exact
            path="/connect-wallet"
            render={() => (
              <Page>
                <ConnectWallet />
              </Page>
            )}
          /> */}

          <Route
            exact
            path="/faq"
            render={() => (
              <Page>
                <Faq />
              </Page>
            )}
          />
          <Route
            exact
            path="/activity"
            render={() => (
              <Page>
                <Activity />
              </Page>
            )}
          />
          <Route
            exact
            path="/search01"
            render={() => (
              <Page>
                <Search01 />
              </Page>
            )}
          />

          <Route
            exact
            path="/form-api"
            render={() => (
              <Page>
                <Form />
              </Page>
            )}
          />
          <Route
            exact
            path="/search02"
            render={() => (
              <Page>
                <Search02 />
              </Page>
            )}
          />
          <Route
            exact
            path="/profile/:userId"
            render={() => (
              <Page>
                <Profile />
              </Page>
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <Page>
                <Profile />
              </Page>
            )}
          />
          <Route
            exact
            path="/profile-edit"
            render={() => (
              <Page>
                <ProfileEdit />
              </Page>
            )}
          />
          <Route
            exact
            path="/asset/:address/:tokenId"
            render={() => (
              <Page>
                <Item />
              </Page>
            )}
          />
          <Route
            exact
            path="/pagelist"
            render={() => (
              <Page>
                <PageList />
              </Page>
            )}
          />
          {/* <Route
            exact
            path="/*"
            render={() => (
              <Page>
                <div>
                  <h1>NOT FOUND</h1>
                </div>
              </Page>
            )}
          /> */}
        </Suspense>
      </Switch>
      {/* </Router> */}
      <CookieConsent
        enableDeclineButton
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#202224" }}
        buttonStyle={{ color: "#1e1f1b", fontSize: "13px" }}
      >
        This website uses cookies to ensure you get the best experience on our
        website.
        {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
      </CookieConsent>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  );
}

export default App;
