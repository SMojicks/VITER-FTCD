import React from "react";
import useQueryData from "../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../functions/functions-general";
import NoData from "../../../partials/NoData";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../partials/TableLoading";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { StoreContext } from "../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";
import Status from "../../../partials/Status";
import ModalArchive from "../../../partials/modals/ModalArchive";
import ModalRestore from "../../../partials/modals/ModalRestore";
import ModalDelete from "../../../partials/modals/ModalDelete";
import SearchBar from "../../../partials/SearchBar";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import ServerError from "../../../partials/ServerError";

const DonorList = ({ setItemEdit, itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
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
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["donor", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, 
        `${apiVersion}/controllers/developers/donor/page.php?start=${pageParam}`, 
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

  const {
    isLoading,
    isFetching,
    data: datadonor,
  } = useQueryData(
    `${apiVersion}/controllers/developers/donor/donor.php`,
    "get",
    "donor"
  );

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

      <div className="relative pt-4 rounded-md">
        {status !== "pending" && isFetching && <FetchingSpinner />}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Stripe ID</th>
                <th></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!error && (status === "pending" || result?.pages[0]?.count === 0) && (
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

              {error && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    <ServerError />
                  </td>
                </tr>
              )}

              {result?.pages?.map((pages, pageKey) => (
                <React.Fragment key={pageKey}>
                  {pages?.data?.map((item, key) => {
                    return (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="p-4"> {counter++}</td>
                        <td className="p-4">
                          <Status
                            text={`${item.donor_is_active == 1 ? "active" : "inactive"}`}
                          />
                        </td>
                        <td>{item.donor_name}</td>
                        <td>{item.donor_email}</td>
                        <td></td>
                        <td>
                          <button className="px-4 py-1 font-semibold bg-primary text-white font-poppins rounded-sm">Donate</button>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            {item.donor_is_active == 1 ? (
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
                                  className="tooltip-action-table"
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
        </div>

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

      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit.donor_aid}`}
          dataItem={itemEdit}
          queryKey="donor"
          msg="Are you sure you want to archive this donor?"
          successMsg="Successfully archived."
          item={itemEdit.donor_name}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit.donor_aid}`}
          dataItem={itemEdit}
          queryKey="donor"
          msg="Are you sure you want to restore this donor?"
          successMsg="Successfully restored."
          item={itemEdit.donor_name}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/donor/donor.php?id=${itemEdit.donor_aid}`}
          dataItem={itemEdit}
          queryKey="donor"
          msg="Are you sure you want to delete this donor?"
          successMsg="Successfully deleted."
          item={itemEdit.donor_name}
        />
      )}
    </>
  );
};

export default DonorList;