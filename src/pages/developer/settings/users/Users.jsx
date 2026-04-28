import React from "react";
import Layout from "../../Layout";
import { Link } from "react-router-dom";
import { devNavUrl, urlDeveloper } from "../../../../functions/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import { FaChevronRight, FaUserCircle } from "react-icons/fa"; // Importing ONLY the right arrow

const Users = () => {
  // Construct the base path dynamically from your functions
  const basePath = `${devNavUrl}/${urlDeveloper}/settings/users`;

  return (
    <Layout menu="settings" submenu="users">
      
      <div className="w-full max-w-full pr-15  flex flex-col gap-5">
        
        {/* 1. Breadcrumbs Component */}
        <div className="w-full">
          <BreadCrumbs />
        </div>

        {/* 2. Page Header */}
        <div className="w-full pl-8"> {/* Aligning with Breadcrumbs margin */}
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        </div>

        {/* 3. The Vertical Selection List (Copied from reference) */}
        <div className="bg-white  rounded-md flex flex-col w-full ml-8 overflow-hidden">
          
          {/* Item 1: System User */}
          <Link
            to={`${basePath}/systems`} // Update this route later
            className="flex items-center justify-between p-5 border-b border-gray-200 hover:bg-gray-50 transition-colors text-gray-700"
          >
            <span className="font-bold text-lg flex gap-2 items-center"><FaUserCircle />System User</span>
            <FaChevronRight className="text-gray-600 text-lg"  />
          </Link>

          {/* Item 2: Other Users */}
          <Link
            to={`${basePath}/other-users`} // Update this route later
            className="flex items-center justify-between p-5 border-b border-gray-200 hover:bg-gray-50 transition-colors text-gray-700"
          >
            <span className="font-bold text-lg flex gap-2 items-center"> <FaUserCircle />Other Users</span>
            <FaChevronRight className="text-gray-600 text-lg"  />
          </Link>

          {/* Item 3: Roles (Already routes correctly) */}
          <Link
            to={`${basePath}/roles`}
            className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-gray-700"
          >
            <span className="font-bold text-lg flex gap-2 items-center"><FaUserCircle />Roles</span>
            <FaChevronRight className="text-gray-600 text-lg" />
          </Link>

        </div>
      </div>

    </Layout>
  );
};

export default Users;