import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import DonorList from "../pages/developer/donor-list/DonorList";
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
        <DonorList />
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

];
