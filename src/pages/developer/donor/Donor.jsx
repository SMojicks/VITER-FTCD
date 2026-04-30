import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import Layout from "../Layout";
import DonorList from "./DonorList";
import ModalAddDonor from "./ModalAddDonor";

const Donor= () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Layout menu="donor">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Donor List</h1>
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
          <DonorList itemEdit={itemEdit} setItemEdit={setItemEdit} />
          </div>
        </div>
      </Layout>
        {store.isAdd && <ModalAddDonor itemEdit={itemEdit} />}
    </>
  );
};

export default Donor;
