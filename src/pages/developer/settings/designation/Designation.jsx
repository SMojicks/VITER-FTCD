import React from "react";
import Layout from "../../Layout";
import DesignationList from "./DesignationList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModalAddDesignation from "./ModalAddDesignation";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import useQueryData from "../../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../../functions/functions-general";

const Designation = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

    const {
    isLoading,
    isFetching,
    data: datacategory,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/category/category.php`,
    "get",
    "category",
  );
    const filterArrayActiveCategory = datacategory?.data.filter(
    (item) => item.category_is_active == 1,
  );
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="settings" submenu="designation">
        
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
            <h1 className="text-2xl font-bold text-gray-800">Designation</h1>
            <div>

            </div>
          </div>

          {/* Page content (Table) */}
          <div className="w-full px-8">
            <DesignationList itemEdit={itemEdit} setItemEdit={setItemEdit} />
          </div>

        </div>

      </Layout>
      {store.isAdd && <ModalAddDesignation itemEdit={itemEdit} filterArrayActiveCategory={filterArrayActiveCategory} />}
    </>
  );
};

export default Designation;