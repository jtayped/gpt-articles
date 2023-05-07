// React Util
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const withAuthentication = (WrappedComponent) => {
  return function WithAuthentication(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/auth");
        }
      });

      return () => {
        unsubscribe();
      };
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
