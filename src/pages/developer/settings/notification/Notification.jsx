import React from "react";
import Layout from "../../Layout";
import NotificationList from "./NotificationList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModalAddNotification from "./ModalAddNotification";
import BreadCrumbs from "../../../../partials/BreadCrumbs";

const Notification = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="settings" submenu="notification">
        
        {/* Wrapper to control spacing and alignment */}
        <div className="w-full flex flex-col gap-5">
          
          {/* 2. Breadcrumbs Component */}
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
            <h1 className="text-2xl font-bold text-gray-800">Notification</h1>
            <div>

            </div>
          </div>

          {/* Page content (Table) with padding to align with header */}
          <div className="w-full px-8">
            <NotificationList itemEdit={itemEdit} setItemEdit={setItemEdit} />
          </div>

        </div>

      </Layout>
      {store.isAdd && <ModalAddNotification itemEdit={itemEdit} />}
    </>
  );
};

export default Notification;