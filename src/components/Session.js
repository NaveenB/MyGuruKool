import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { Redirect } from "react-router";
import * as _apiUtils from "./util/AxiosUtil";
import google from "./../assets/google.png";
import msteams from "./../assets/msteams.png";
import microsoft from "./../assets/microsoft.png";
// import GoogleSession from "./GoogleSession";
import { GoogleLogin } from "react-google-login";
import * as _constants from "./util/constants";

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false, accessToken: "" };
    this.googleLogin = this.googleLogin.bind(this);
    this.googleHandleLoginFailure = this.googleHandleLoginFailure.bind(this);
    sessionStorage.setItem(_constants.LOGIN_PROVIDER, "");
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSignedIn: true });
  };

  googleLogin(response) {
    if (response.accessToken) {
      this.setState((state) => ({
        isSignedIn: true,
        accessToken: response.accessToken,
        googleProfileName: response.profileObj.name,
      }));
      sessionStorage.setItem("google_profile", response.profileObj.name);
      sessionStorage.setItem(_constants.ACCESS_TOKEN, response.accessToken);
      sessionStorage.setItem(_constants.LOGIN_PROVIDER, _constants.GOOGLE);
    }
  }

  googleHandleLoginFailure(response) {
    alert("Google Login Failed");
  }

  render() {
    if (this.state.isSignedIn) {
      // redirect to home if signed up
      return (
        <Redirect
          to={{
            pathname: "/home",
            state: { name: this.state.googleProfileName },
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header isSignedIn={this.state.isSignedIn} />
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-success">
                Please sign in using your School account.
              </div>
              {/* <div className="alert alert-success">
                Please sign in using your Microsoft Work or School account.
              </div> */}
              <button
                className="btn btn-lg btn-submit btn-block"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  let stateNow = new Date()
                    .toISOString()
                    .replace(/[^0-9]/g, "")
                    .slice(0, -3);
                  let random = Math.random().toString(36).substring(7);

                  window.location.href =
                    "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=" +
                    process.env.REACT_APP_CLIENT_ID +
                    "&response_type=id_token%20token&redirect_uri=" +
                    process.env.REACT_APP_OAUTH_REDIRECT_URI +
                    "&response_mode=fragment&scope=openid%20" +
                    process.env.REACT_APP_OAUTH_SCOPES +
                    //    "&prompt=consent" +
                    "&state=" +
                    stateNow +
                    "&nonce=" +
                    random;
                }}
              >
                <img src={microsoft} className="msTeamsIcon" />
                Login With Microsoft Account
              </button>
              {/* <button
                className="btn btn-lg btn-submit btn-block"
                type="button"
                onClick={(e): void => {
                  // return <Redirect to={{ pathname: "/googleSession" }} />;
                  window.location.href = "/googleSession";
                }}
              >
                <img src={google} className="googleIcon" />
                Login with Google Account
              </button> */}
              <div>
                {/* <GoogleSession /> */}
                <GoogleLogin
                  className="btn btn-lg btn-submit btn-block float-right"
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Sign-in with Google Login"
                  onSuccess={this.googleLogin}
                  onFailure={this.googleHandleLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  responseType={_constants.ACCESS_TOKEN} //code,
                  scope={process.env.REACT_APP_GOOGLE_OAUTH_SCOPES}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
