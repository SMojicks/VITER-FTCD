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
        // FIXED: Removed the `crumb !== "settings"` condition so Settings will actually display!
        crumb !== "ftw" &&
        crumb !== "ue" &&
        crumb !== "payroll" && (
          <li
            className={` text-primary flex items-center after:mx-2 after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none ${
              (crumb === "settings" || crumb === "payroll") &&
              "!pointer-events-none text-gray-500"
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
                  ? "#"
                  : crumb === "employees" || crumb === "my-info"
                  ? `${link}${currentLink}`
                  : `${link}${currentLink}${param}`
              }
              className="font-medium hover:text-primary capitalize"
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
      <div className="mt-1 mb-1 flex items-center gap-4 breadcrumbs ml-8">
        <ul
          className="print:hidden my-2 flex items-center cursor-pointer pl-1 lg:pl-0"
          onClick={() => navigate(-1)}
          title="Back"
        >
          {/* Slightly enlarged the back arrow to match modern UI */}
          <FaArrowLeft className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
        </ul>

        {/* FIXED: Removed the 'xs:flex hidden' classes so the text is no longer invisible */}
        <ul className="items-center flex cursor-pointer text-sm">
          {crumbs.length === 1 ? "" : crumbs}
        </ul>
      </div>
    </>
  );
};

export default BreadCrumbs;
