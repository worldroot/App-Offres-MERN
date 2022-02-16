import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const SuperAdminRoute = ({
    
    component: Component,
    isAuth,
    user,
    ...rest

}) => (
    
        <Route
            {...rest}
            render={props =>
                isAuth === true && user.role === "super-admin" ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/super-admin" />
                    )
                
            }
        />
    );

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, null)(SuperAdminRoute);