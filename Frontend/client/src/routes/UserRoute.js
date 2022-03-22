import React, { useState } from 'react';
import { Route, Redirect } from "react-router-dom";


function AdminRoute({ component: Component, ...rest }) {

    const [userLocal] = useState(() => {
        const saved = localStorage.getItem("user");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });
  
    return (
      <Route
        {...rest}
        render={(props) =>
            userLocal.role === "user" ? <Component {...props} /> : <Redirect to="/profile" />
        }
      />
    );
  }

export default AdminRoute;