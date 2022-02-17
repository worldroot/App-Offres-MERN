import AdminIndex from "views/AdminIndex.js";
import Profile from "views/UserDetails";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Tables from "views/Tables.js";
import Icons from "views/Icons.js";

var routes = [

  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-red",
    component: Profile,
    layout: "",
  },
  {
    path: "/",
    name: "Categories",
    icon: "ni ni-archive-2 text-red",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Users",
    icon: "fas fa-users text-red",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Offres",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
];
export default routes;
