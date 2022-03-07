import {
    Row,
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    UncontrolledTooltip,
  } from "reactstrap";
  
  import Header from "../../components/Headers/Header.js";
  import AdminNavbar from "../../components/Navbars/AdminNavbar";
  import Sidebar from "../../components/Sidebar/Sidebar";
  import { Redirect } from 'react-router-dom';
  import {connect} from 'react-redux';
  import {toast} from 'react-toastify'
  import routes from "routes.js";
  
  const UsersList = ({user, isAuth}) => {
  

  
  
    return (
      <>
      {/* Layout*/}
      <Sidebar
          routes={routes}
          logo={{
            innerLink: "",
            imgSrc: '',
            imgAlt: "...",
          }}
        />
  
        <div className="main-content" >
          <AdminNavbar/>
  
          <Header/>
          {/* Page content */}
          <Container className="mt--7" fluid>
          <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">List des utilisateurs</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Budget</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>$2,500 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td>
                     
                    </td>
                    <td>
                      
                    </td>
                    
                  </tr>


                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
</Container>
        </div>
       
      </>
    );
  };
  
  const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
  });
  
  export default connect (mapToStateProps)(UsersList);