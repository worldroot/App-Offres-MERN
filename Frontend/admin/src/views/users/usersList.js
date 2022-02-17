import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
  } from "reactstrap";
  
  import Header from "../../components/Headers/Header.js";
  import AdminNavbar from "../../components/Navbars/AdminNavbar";
  import Sidebar from "../../components/Sidebar/Sidebar";
  import { Redirect } from 'react-router-dom';
  import {connect} from 'react-redux';
  import {toast} from 'react-toastify'
  import routes from "routes.js";
  
  const UsersList = ({user, isAuth}) => {
  
    if(!isAuth){
      return <Redirect to='/login'/>;
    }
  
  
    if (isAuth && user) {
      const { role } = user;
      if (role === "admin") return <Redirect to='/admin'/>;
      if (role === "super-admin") return <Redirect to='/super-admin'/>;
      //if (role === 1) return <Redirect to='/dashboard/'/>;
    }
  
  
    return (
      <>
      {/* Layout*/}
      <Sidebar
          routes={routes}
          logo={{
            innerLink: "",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
  
        <div className="main-content" >
          <AdminNavbar/>
  
          <Header/>
          {/* Page content */}
        
  
        </div>
       
      </>
    );
  };
  
  const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
  });
  
  export default connect (mapToStateProps)(UsersList);