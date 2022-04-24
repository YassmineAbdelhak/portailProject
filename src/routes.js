import AddConge from "views/AddConge.js";
import ListEmployee from "views/ListEmployee.js";
import EditEmployee from "views/EditEmployee.js";
import EditConge from "views/EditConge.js";
import EditCongeHR from "views/EditCongeHR.js";
import ListDepartement from "views/ListDepartement.js";
import ListConge from "views/ListConge.js";
import ListCongeNotTreated from "views/ListCongeNotTreated.js";
import AddEmployee from "views/AddEmployee.js";
import EditDepartement from "views/EditDepartement.js";
var routes = [
  {
    path: "/listdepartement",
    name: "Departement ",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-bank",
    hidden:false,
    component: ListDepartement,
    layout: "/admin"
  },
  {
    path: "/editemployee/:id",
    name: "Edit Employee ",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-tablet-2",
    hidden:true,
    component: EditEmployee,
    layout: "/admin"
  },
  {
    path: "/addemployee",
    name: "add employee",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-badge",
    hidden:false,
    component: AddEmployee,
    layout: "/admin"
  },
  {
    path: "/listemployee",
    name: "List eMPLOYEE ",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-single-02",
    hidden:false,
    component: ListEmployee,
    layout: "/admin"
  },
  {
    path: "/editdepartement/:id",
    name: "Edit Departement ",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-tablet-2",
    hidden: true,
    component: EditDepartement,
    layout: "/admin"
  },
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
    path: "/listcongenottreated",
    name: "Request For Leave List",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-bullet-list-67",
    hidden:false,
    component: ListCongeNotTreated,
    layout: "/admin"
  },
  {
    path: "/editcongehr/:id",
    name: "Edit Request for Leave ",
    rtlName: "نوع الحل",
    icon: "tim-icons icon-tablet-2",
    hidden: true,
    component: EditCongeHR,
    layout: "/admin"
  },
];
export default routes;
