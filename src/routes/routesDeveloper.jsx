import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import ChildrenList from "../pages/developer/children-list/ChildrenList";
import Donor from "../pages/developer/donor/Donor";
import Category from "../pages/developer/settings/category/Category";
import Designation from "../pages/developer/settings/designation/Designation";
import Notification from "../pages/developer/settings/notification/Notification";
import Roles from "../pages/developer/settings/users/roles/Roles";
import Systems from "../pages/developer/settings/users/systems/Systems";
import Users from "../pages/developer/settings/users/Users";


export const routesDeveloper = [
  {
    path: `${devNavUrl}/${urlDeveloper}/`,
    element: (
      <>
        <Donor />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/donor`,
    element: (
      <>
        <Donor />
      </>
    ),
  },
  {

    path: `${devNavUrl}/${urlDeveloper}/settings/users/roles`,
    element: (
      <>
        <Roles />
      </>
    ),
  },

  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users`,
    element: (
      <>
        <Users />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users/systems`,
    element: (
      <>
        <Systems />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/category`,
    element: (
      <>
        <Category />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/designation`,
    element: (
      <>
        <Designation />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/notification`,
    element: (
      <>
        <Notification />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/children-list`,
    element: (
      <>
        <ChildrenList />
      </>
    ),
  },

];
