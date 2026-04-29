import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../functions/functions-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../partials/MessageError";

const ModalAddNotification = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/notification/notification.php?id=${itemEdit.notification_aid}`
          : `${apiVersion}/controllers/developers/settings/notification/notification.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });

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
    notification_name: itemEdit ? itemEdit.notification_name : "",
    notification_email: itemEdit ? itemEdit.notification_email : "",
    notification_phone: itemEdit ? itemEdit.notification_phone : "",
    notification_purpose: itemEdit ? itemEdit.notification_purpose : "",
    notification_name_old: itemEdit ? itemEdit.notification_name : "",
  };

  const yupSchema = Yup.object({
    notification_name: Yup.string().trim().required("Required."),
    notification_email: Yup.string().trim().required("Required."),
    notification_phone: Yup.string().trim(),
    notification_purpose: Yup.string().trim().required("Required."),
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
        {/* HEADER */}
        <div className="modal-header relative mb-4">
          <h3 className="text-dark text-sm font-bold">
            {itemEdit ? "Update" : "Add"} Notification
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-0 right-4 text-gray-500 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>

        {/* BODY */}
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
                          label="Name"
                          name="notification_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Phone number"
                          name="notification_phone"
                          type="tel"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputSelect
                          label="Purpose"
                          name="notification_purpose"
                          type="text"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Select a Purpose">
                            <option value="" hidden>
                              --
                            </option>
                            <option>For New Donor</option>
                            <option>For Donation Receipt</option>
                            <option>For Contact Us</option>
                            <option>For FAQ</option>
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputTextArea
                          label="Email"
                          name="notification_email"
                          type="email"
                          disabled={mutation.isPending}
                        />
                      </div>
                      {store.error && <MessageError />}
                    </div>

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

export default ModalAddNotification;
