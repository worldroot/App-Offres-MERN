import AdminIndex from "views/AdminIndex.js";
import Profile from "views/Profile.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Tables from "views/Tables.js";
import Icons from "views/Icons.js";

var routes = [
  {
    path: "",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-red",
    component: AdminIndex,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-archive-2 text-red",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-red",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-red",
    component: Profile,
    layout: "",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
];
export default routes;
