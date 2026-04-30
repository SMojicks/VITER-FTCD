import React, { useEffect } from "react";
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
// Added useFormikContext
import { Formik, Form, useFormikContext } from "formik";
import {
  InputCheckbox,
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../partials/MessageError";

// Observer component to automatically calculate age when birthday changes
const AutoCalculateAge = () => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.childrenList_birthday) {
      const today = new Date();
      const birthDate = new Date(values.childrenList_birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFieldValue("childrenList_age", age);
    }
  }, [values.childrenList_birthday, setFieldValue]);

  return null;
};

const ModalAddChildren = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/children-list/childrenlist.php?id=${itemEdit.childrenList_aid}`
          : `${apiVersion}/controllers/developers/children-list/childrenlist.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["childrenList"] });

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
    childrenList_name: itemEdit ? itemEdit.childrenList_name : "",
    childrenList_birthday: itemEdit ? itemEdit.childrenList_birthday : "",
    childrenList_age: itemEdit ? itemEdit.childrenList_age : "",
    // Ensures checkbox properly initializes as a boolean state
    childrenList_residency: itemEdit ? (itemEdit.childrenList_residency == 1 || itemEdit.childrenList_residency === true || itemEdit.childrenList_residency === "true") : false,
    childrenList_limit: itemEdit ? itemEdit.childrenList_limit : "",
    childrenList_story: itemEdit ? itemEdit.childrenList_story : "",
    childrenList_name_old: itemEdit ? itemEdit.childrenList_name : "",
  };

  const yupSchema = Yup.object({
    childrenList_name: Yup.string().trim().required("Required."),
    childrenList_birthday: Yup.string().trim().required("Required."),
    childrenList_age: Yup.string().trim().required("Required."),
    childrenList_story: Yup.string().trim().required("Required."),
    childrenList_limit: Yup.string().trim().required("Required."),
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
            {itemEdit ? "Update" : "Add"} Children List
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
                  {/* Triggers age update when birthday value changes */}
                  <AutoCalculateAge />
                  
                  <div className="modal-form-container">
                    <div className="modal-container">
                      <div className="relative mb-6">
                        <InputText
                          label="Name"
                          name="childrenList_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Birthday"
                          name="childrenList_birthday"
                          type="date"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputTextArea
                          label="My Story"
                          name="childrenList_story"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Donation Limit"
                          name="childrenList_limit"
                          type="number"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputCheckbox
                          label="Mark Check if Resident"
                          name="childrenList_residency"
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

export default ModalAddChildren;