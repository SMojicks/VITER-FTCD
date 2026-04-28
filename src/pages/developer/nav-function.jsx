import {
  FaClipboardList,
  FaCog,
  FaCogs,
  FaHandHoldingHeart,
  FaList,
  FaUsers,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { devNavUrl, urlDeveloper } from "../../functions/functions-general";
import { FaChildren } from "react-icons/fa6";

export const navList = [
  {
    label: "Donor List",
    icon: <FaHandHoldingHeart />,
    menu: "donor-list",
    path: `${devNavUrl}/${urlDeveloper}/donor-list`,
    submenu: "",
  },
  {
    label: "Children List",
    icon: <FaChildren />,
    menu: "children-list",
    path: `${devNavUrl}/${urlDeveloper}/children-list`,
    submenu: "",
  },
  {
    label: "Reports",
    icon: <FaList />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Donations",
        path: `${devNavUrl}/${urlDeveloper}/settings/role`,
      },
      {
        label: "Contact Us",
        path: `${devNavUrl}/${urlDeveloper}/settings/users`,
      },
      {
        label: "FAQ",
        path: `${devNavUrl}/${urlDeveloper}/settings/department`,
      },
    ],
  },
  {
    label: "Settings",
    icon: <FaCog />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Users",
        path: `${devNavUrl}/${urlDeveloper}/settings/users`,
      },
      {
        label: "Category",
        path: `${devNavUrl}/${urlDeveloper}/settings/category`,
      },
      {
        label: "Designation",
        path: `${devNavUrl}/${urlDeveloper}/settings/department`,
      },
      {
        label: "Notification",
        path: `${devNavUrl}/${urlDeveloper}/settings/notification`,
      },
      {
        label: "Maintenance",
        path: `${devNavUrl}/${urlDeveloper}/settings/notification`,
      },
    ],
  },
];
