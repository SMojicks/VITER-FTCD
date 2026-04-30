import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import Layout from "../Layout";
import ModalAddChildren from "./ModalAddChilren";
import ChildrenListList from "./ChildrenListList";

const ChildrenList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Layout menu="children-list">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Children List</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>
        {/* PAGE CONTENT */}
        <div>
          <div className="w-full px-8">
            <ChildrenListList itemEdit={itemEdit} setItemEdit={setItemEdit} />
          </div>
        </div>
      </Layout>
        {store.isAdd && <ModalAddChildren itemEdit={itemEdit} />}
    </>
  );
};

export default ChildrenList;
