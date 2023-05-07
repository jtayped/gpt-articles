// React Util
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../config/firebase"

const withAuthRedirect = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuthStatus = () => {
        if (!auth.currentUser) {
          // User is not logged in, redirect to the desired page
          navigate("/auth");
        }
      };

      return () => checkAuthStatus();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuthRedirect;
