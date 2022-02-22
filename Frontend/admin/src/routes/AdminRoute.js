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
            userLocal.role === "admin" ? <Component {...props} /> : <Redirect to="/admin" />
        }
      />
    );
  }

export default AdminRoute;