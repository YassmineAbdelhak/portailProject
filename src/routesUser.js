import AddConge from "views/AddConge.js";
import EditConge from "views/EditConge.js";
import ListConge from "views/ListConge.js";
var routes = [
  {
    path: "/addconge",
    name: "request for leave ",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-notes",
    hidden:false,
    component: AddConge,
    layout: "/admin"
  },
  {
    path: "/listconge",
    name: "request for leave list",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-bullet-list-67",
    hidden:false,
    component: ListConge,
    layout: "/admin"
  },
  
  {
    path: "/editconge/:id",
    name: "Edit Request for Leave ",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-tablet-2",
    hidden: true,
    component: EditConge,
    layout: "/admin"
  },
];
export default routes;
