import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../../functions/functions-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import ModalWrapperSide from "../../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../../partials/MessageError";
import useQueryData from "../../../../../functions/custom-hooks/useQueryData";

const ModalAddSystems = ({ itemEdit, filterArrayActiveRoles }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
    const {
    data: sysData,
    isLoading: sysLoading,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/users/systems/systems.php`,
    "get",
    "system"
  );
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/users/systems/systems.php?id=${itemEdit.system_aid}`
          : // update records
            `${apiVersion}/controllers/developers/settings/users/systems/systems.php`,
        // create records
        itemEdit
          ? "put" //put if updats a record
          : "post", //and post if create new record
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["systems"] });

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
    system_first_name: itemEdit ? itemEdit.system_first_name : "",
    system_last_name: itemEdit ? itemEdit.system_last_name : "",
    system_email: itemEdit ? itemEdit.system_email : "",
    system_role_id: itemEdit ? itemEdit.system_role_id : "",
    system_name_old: itemEdit ? itemEdit.system_first_name : "",
  };
  const yupSchema = Yup.object({
    system_first_name: Yup.string().trim().required("required."),
    system_last_name: Yup.string().trim().required("required."),
    system_email: Yup.string().trim().required("required."),
    system_role_id: Yup.string().trim().required("required."),
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
        className="transition-all ease-in-out transform duration-200 "
      >
        {/* HEADER */}
        <div className="modal-header relative mb-4 ">
          <h3 className="text-dark text-sm">
            {itemEdit ? "Update" : "Add"} Role
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-0 right-4"
          >
            <FaTimes />
          </button>
        </div>
        {/* BODY */}
        <div className="modal-body ">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              dispatch(setError(false));
              mutation.mutate(values);
            }}
          >
            {(props) => {
              console.log(props);
              return (
                <Form className="h-full ">
                  <div className="modal-form-container ">
                    <div className="modal-container">
                      <div className="relative  mb-6">
                        <InputText
                          label="First Name"
                          name="system_first_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative  mb-6">
                        <InputText
                          label="Last Name"
                          name="system_last_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5  mb-6">
                        <InputTextArea
                          label="Email"
                          name="system_email"
                          type="email"
                          disabled={mutation.isPending}
                        />
                      </div>
                        <div className="relative mb-6">
                        <InputSelect
                          label="Role"
                          name="system_role_id"
                          type="text"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Select a role">
                            <option value="" hidden>
                              --
                            </option>
                            {filterArrayActiveRoles.map((item, key) => {
                              return (
                                <option key={key} value={item.role_aid}>
                                  {item.role_name}
                                </option>
                              );
                            })}
                          </optgroup>
                        </InputSelect>
                      </div>
                      {store.error && <MessageError />}
                    </div>

                    <div className="modal-action">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                        className="btn-modal-submit"
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
                        className="btn-modal-cancel"
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

export default ModalAddSystems;
