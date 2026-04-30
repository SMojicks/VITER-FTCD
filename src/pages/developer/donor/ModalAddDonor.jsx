import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../functions/functions-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import ModalWrapperSide from "../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import {
  InputText,
  InputTextArea,
} from "../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../partials/MessageError";

const ModalAddDonor = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/donor/donor.php?id=${itemEdit.donor_aid}`
          : `${apiVersion}/controllers/developers/donor/donor.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["donor"] });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      }
      if (data.success == false) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    ...itemEdit,
    donor_name: itemEdit ? itemEdit.donor_name : "",
    donor_email: itemEdit ? itemEdit.donor_email : "",
    donor_contact: itemEdit ? itemEdit.donor_contact : "",
    donor_address: itemEdit ? itemEdit.donor_address : "",
    donor_city: itemEdit ? itemEdit.donor_city : "",
    donor_province: itemEdit ? itemEdit.donor_province : "",
    donor_country: itemEdit ? itemEdit.donor_country : "",
    donor_zip: itemEdit ? itemEdit.donor_zip : "",
    donor_name_old: itemEdit ? itemEdit.donor_name : "",
  };

  const yupSchema = Yup.object({
    donor_name: Yup.string().trim().required("Required."),
    donor_email: Yup.string().trim().email("Invalid email format.").required("Required."),
    donor_contact: Yup.string().trim().required("Required."),
    donor_address: Yup.string().trim().required("Required."),
    donor_city: Yup.string().trim().required("Required."),
    donor_province: Yup.string().trim().required("Required."),
    donor_country: Yup.string().trim().required("Required."),
    donor_zip: Yup.string().trim().required("Required."),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <>
      <ModalWrapperSide
        handleClose={handleClose}
        className="transition-all ease-in-out transform duration-200"
      >
        <div className="modal-header relative mb-4">
          <h3 className="text-dark text-sm font-bold">
            {itemEdit ? "Update" : "Add"} Donor
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-0 right-4 text-gray-500 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              dispatch(setError(false));
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form className="h-full">
                  <div className="modal-form-container">
                    <div className="modal-container">
                      <div className="relative mb-6">
                        <InputText
                          label="Full Name"
                          name="donor_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Email Address"
                          name="donor_email"
                          type="email"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Contact Number"
                          name="donor_contact"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputTextArea
                          label="Address"
                          name="donor_address"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                          <InputText
                            label="City"
                            name="donor_city"
                            type="text"
                            disabled={mutation.isPending}
                          />
                        </div>
                        <div className="relative mb-6">
                          <InputText
                            label="Province"
                            name="donor_province"
                            type="text"
                            disabled={mutation.isPending}
                          />
                        </div>
                        <div className="relative mb-6">
                          <InputText
                            label="Country"
                            name="donor_country"
                            type="text"
                            disabled={mutation.isPending}
                          />
                        </div>
                        <div className="relative mb-6">
                          <InputText
                            label="Zip Code"
                            name="donor_zip"
                            type="text"
                            disabled={mutation.isPending}
                          />
                        </div>
                      </div>
                      {store.error && <MessageError />}

                    <div className="modal-action flex justify-end gap-3 mt-5">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                        className="btn-modal-submit px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 disabled:opacity-50"
                      >
                        {mutation.isPending ? (
                          <ButtonSpinner />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                        onClick={handleClose}
                        disabled={mutation.isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddDonor;