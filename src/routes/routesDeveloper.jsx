import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import DonorList from "../pages/developer/donor-list/DonorList";
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
    path: `${devNavUrl}/${urlDeveloper}/settings/role`,
    element: (
      <>
        <Roles />
      </>
    ),
  },
];
