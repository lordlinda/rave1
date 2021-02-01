import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";

export default (OriginalComponent) => {
  //this function is only present when executing the above function
  //rendering the original component
  class MixedComponent extends Component {
    //this checks if the user is authenticated
    checkAuth() {
      const token = Cookies.get("access_token");
      const refreshToken = Cookies.get("refreshToken");
      if (!token || !refreshToken) {
        return false;
      }
      try {
        // { exp: 12903819203 }
        const { exp } = decode(refreshToken);

        if (exp < new Date().getTime() / 1000) {
          return false;
        }
      } catch (e) {
        return false;
      }
      return true;
    }
    componentDidMount() {
      this.checkAuth();
    }
    componentDidUpdate() {
      this.checkAuth();
    }
    render() {
      return this.checkAuth() ? (
        <OriginalComponent {...this.props} />
      ) : (
        <Redirect to={{ pathname: "/signin" }} />
      );
    }
  }
  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuth,
    };
  }
  return connect(mapStateToProps)(MixedComponent);
};
