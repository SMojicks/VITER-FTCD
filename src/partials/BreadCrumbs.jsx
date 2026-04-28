import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setIsSearch } from "../store/StoreAction";
import { StoreContext } from "../store/StoreContext";
// IMPORTANT: Ensure this path correctly points to where you added getUserType()
import { getUserType } from "../functions/functions-general"; 
import { setIsSearch } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { getUserType } from "../helpers/functions-general";


const BreadCrumbs = ({ param = "" }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const link = getUserType();
  let currentLink = "";

  const handleClick = () => {
    sessionStorage.removeItem("resultItem");
    sessionStorage.removeItem("payrunListReport");
    sessionStorage.removeItem("benefitsList");
    sessionStorage.removeItem("loanList");
    sessionStorage.removeItem("salaryHistoryList");
    dispatch(setIsSearch(false));
  };

  const crumbs = location.pathname
    .replace(`${link}`, "")
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, key) => {
      currentLink += `/${crumb}`;
      return (
<<<<<<< HEAD
        // FIXED: Removed the `crumb !== "settings"` condition so Settings will actually display!
=======
        crumb !== "settings" &&
>>>>>>> ad4d922c11a9c8efc70aa37d54a4f7ed18d52f53
        crumb !== "ftw" &&
        crumb !== "ue" &&
        crumb !== "payroll" && (
          <li
<<<<<<< HEAD
            className={` text-primary flex items-center after:mx-2 after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none ${
              (crumb === "settings" || crumb === "payroll") &&
              "!pointer-events-none text-gray-500"
=======
            className={` text-primary after:mr-2 after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none ${
              (crumb === "settings" || crumb === "payroll") &&
              "!pointer-events-none"
>>>>>>> ad4d922c11a9c8efc70aa37d54a4f7ed18d52f53
            } `}
            key={key}
            onClick={handleClick}
          >
            <Link
              to={
                crumb === "settings" ||
                crumb === "payroll" ||
                crumb === "ftw" ||
                crumb === "ue"
<<<<<<< HEAD
                  ? "#"
=======
                  ? ""
>>>>>>> ad4d922c11a9c8efc70aa37d54a4f7ed18d52f53
                  : crumb === "employees" || crumb === "my-info"
                  ? `${link}${currentLink}`
                  : `${link}${currentLink}${param}`
              }
<<<<<<< HEAD
              className="font-medium hover:text-primary capitalize"
=======
              className="mr-2 font-medium hover:text-primary capitalize"
>>>>>>> ad4d922c11a9c8efc70aa37d54a4f7ed18d52f53
            >
              {crumb
                .replaceAll("-ftw", " ")
                .replaceAll("-ue", " ")
                .replaceAll("ftw-", " ")
                .replaceAll("-", " ")
                .replaceAll("daily time record entries", "time entries")}
            </Link>
          </li>
        )
      );
    });
    
  return (
    <>
<<<<<<< HEAD
      <div className="mt-1 mb-1 flex items-center gap-4 breadcrumbs ml-8">
=======
      <div className="mt-1 mb-1 flex items-center gap-5 breadcrumbs ml-8">
>>>>>>> ad4d922c11a9c8efc70aa37d54a4f7ed18d52f53
        <ul
          className="print:hidden my-2 flex items-center cursor-pointer pl-1 lg:pl-0"
          onClick={() => navigate(-1)}
          title="Back"
        >
<<<<<<< HEAD
          {/* Slightly enlarged the back arrow to match modern UI */}
          <FaArrowLeft className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
        </ul>

        {/* FIXED: Removed the 'xs:flex hidden' classes so the text is no longer invisible */}
        <ul className="items-center flex cursor-pointer text-sm">
=======
          <FaArrowLeft className="h-5 w-5 lg:h-4 lg:w-4" />
        </ul>

        <ul className="items-center xs:flex hidden  cursor-pointer text-[10px]">
>>>>>>> ad4d922c11a9c8efc70aa37d54a4f7ed18d52f53
          {crumbs.length === 1 ? "" : crumbs}
        </ul>
      </div>
    </>
  );
};

<<<<<<< HEAD
export default BreadCrumbs;
=======
export default BreadCrumbs;
>>>>>>> ad4d922c11a9c8efc70aa37d54a4f7ed18d52f53
