import React from "react";
import Layout from "../../../Layout";
import SystemsList from "./SystemsList";
import { StoreContext } from "../../../../../store/StoreContext";
import { setIsAdd } from "../../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModalAddSystems from "./ModalAddSystems";
import BreadCrumbs from "../../../../../partials/BreadCrumbs";
import useQueryData from "../../../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../../../functions/functions-general";

const Systems = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

    const {
    isLoading,
    isFetching,
    data: dataRoles,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/users/roles/roles.php`,
    "get",
    "roles",
  );
    const filterArrayActiveRoles = dataRoles?.data.filter(
    (item) => item.role_is_active == 1,
  );
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="settings" submenu="systems">
        
        {/* Removed the weird pr-15 and max-w-full constraints */}
        <div className="w-full flex flex-col gap-5">
          
          {/* Breadcrumbs Component */}
          <div className="w-full flex justify-between pr-8">
            <BreadCrumbs />
                          <button
                type="button"
                className="flex items-center gap-1 hover:underline text-primary font-medium"
                onClick={handleAdd}
              >
                <FaPlus />
                Add
              </button>
          </div>

          {/* Page header with padding to align with breadcrumbs */}
          <div className="flex items-center w-full justify-between px-8">
            <h1 className="text-2xl font-bold text-gray-800">Systems</h1>
            <div>

            </div>
          </div>

          {/* Page content (Table) */}
          <div className="w-full px-8">
            <SystemsList itemEdit={itemEdit} setItemEdit={setItemEdit} />
          </div>

        </div>

      </Layout>
      {store.isAdd && <ModalAddSystems itemEdit={itemEdit} filterArrayActiveRoles={filterArrayActiveRoles} />}
    </>
  );
};

export default Systems;