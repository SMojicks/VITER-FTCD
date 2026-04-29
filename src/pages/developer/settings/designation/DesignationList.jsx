import React from "react";
import {
  apiVersion,
  formatDate,
} from "../../../../functions/functions-general";
import NoData from "../../../../partials/NoData";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../partials/TableLoading";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";
import Status from "../../../../partials/Status";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";
import SearchBar from "../../../../partials/SearchBar";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../functions/custom-hooks/queryDataInfinite";
import ServerError from "../../../../partials/ServerError";
import Loadmore from "../../../../partials/Loadmore";

const DesignationList = ({ setItemEdit, itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  // page state
  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    // Changed queryKey to "Designation" so it doesn't conflict with your "users" query
    queryKey: ["designation", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, // search endpoint
        `${apiVersion}/controllers/developers/settings/designation/page.php?start=${pageParam}`, // list endpoint
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        `post`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItemEdit(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };
  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  return (
    <>
      {/* Search and Filter Row */}
      <div className="py-5 flex items-center justify-between">
        <div className="relative">
          <label className="mr-2 text-sm font-medium">Status:</label>
          <select
            name="status"
            className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-primary"
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>

      {/* Table Container */}
      <div className="relative pt-4 rounded-md">
        {status !== "pending" && isFetching && <FetchingSpinner />}
        <table >
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading screen */}
            {!error &&
              (status === "pending" || result?.pages[0]?.count === 0) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    {status === "pending" ? (
                      <TableLoading cols={2} count={20} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}
              
            {/* If request API failed */}
            {error && (
              <tr>
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {/* If request API success and data exists */}
            {result?.pages.map((pages, key) => (
              <React.Fragment key={key}>
                {pages?.data?.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className="p-3">{counter++}.</td>
                      <td className="p-3">
                        <Status
                          text={`${item.designation_is_active == 1 ? "active" : "inactive"}`}
                        />
                      </td>
                      <td className="p-3">
                        {item.designation_name} 
                      </td>
                      <td className="p-3">{item.category_name}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center gap-3">
                          {item.designation_is_active == 1 ? (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(item)}
                              >
                                <FaArchive />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Restore"
                                onClick={() => handleRestore(item)}
                              >
                                <FaTrashRestore />
                              </button>
                              <button
                                type="button"
                                className="tooltip-action-table "
                                data-tooltip="Delete"
                                onClick={() => handleDelete(item)}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Load More Button & Observer */}
        <div className="loadmore flex justify-center flex-col items-center pb-10 mt-5">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            isSearchOrFilter={store.isSearch || filterData !== ""}
          />
        </div>
      </div>

      {/* Modals */}
      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/designation/active.php?id=${itemEdit.designation_aid}`}
          dataItem={itemEdit}
          queryKey="designation"
          msg="Are you sure you want to archive this record?"
          successMsg="Successfully archived."
          item={itemEdit.designation_name}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/designation/active.php?id=${itemEdit.designation_aid}`}
          dataItem={itemEdit}
          queryKey="designation"
          msg="Are you sure you want to restore this record?"
          successMsg="Successfully restored."
          item={itemEdit.designation_name}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/designation/designation.php?id=${itemEdit.designation_aid}`}
          dataItem={itemEdit}
          queryKey="designation"
          msg="Are you sure you want to delete this record?"
          successMsg="Successfully deleted."
          item={itemEdit.designation_name}
        />
      )}
    </>
  );
};

export default DesignationList;