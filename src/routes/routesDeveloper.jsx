import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import DonorList from "../pages/developer/donor-list/DonorList";

import Category from "../pages/developer/settings/category/Category";
import Roles from "../pages/developer/settings/users/roles/Roles";
import Systems from "../pages/developer/settings/users/systems/Systems";
import Users from "../pages/developer/settings/users/Users";

import Roles from "../pages/developer/settings/roles/Roles";


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

    path: `${devNavUrl}/${urlDeveloper}/settings/role`,

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

];
