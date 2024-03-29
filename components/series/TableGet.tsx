import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
 

export default function SeriesTableGet() {
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState("id");
  const [orderDirection, setOrderDirection] = useState("asc");
  
  const fetchSeries = useCallback(async () => {
    const skip = (currentPage - 1) * rowsPerPage;
    const take = rowsPerPage;
  
    const response = await fetch(
      `/api/series/get?page=${currentPage}&limit=${rowsPerPage}&sortBy=${orderBy}&orderDirection=${orderDirection}`
    );
    const { data, totalPages } = await response.json();
  
    const updatedSeries: any= await Promise.all(
      data.map(async (item: any) => {
        const userResponse = await fetch(`/api/users/getuser/${item.userId}`);
        const { data } = await userResponse.json();
        const username = data[0].name;
        return { ...item, username };
      })
    );
  
    setSeries(updatedSeries);
    setTotalPages(totalPages);
  }, [currentPage, rowsPerPage, orderBy, orderDirection]);
  
  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);




  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowsPerPageChange = (event: any) => {
    const selectedRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(selectedRowsPerPage);
    setCurrentPage(1);
    setTotalPages(Math.ceil(series.length / selectedRowsPerPage));
  };
  

  const handleOrderByChange = (event: any) => {
    const selectedOrderBy = event.target.dataset.orderBy;
    if (selectedOrderBy === orderBy) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(selectedOrderBy);
      setOrderDirection("asc");
    }
    setCurrentPage(1);
  };

  // تحويل userId الي اسم المستخدم

  return (
    <div className="not-prose relative bg-slate-50 rounded-xl dark:bg-slate-800/25">
      <div
        style={{ backgroundPosition: "10px 10px" }}
        className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
      />
      <div className="relative rounded-xl">
        <div className="shadow-sm my-8 overflow-scroll">
          <table className="border-collapse  w-full text-sm whitespace-nowrap bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 table-auto">
            <thead>
              <tr>
                <th
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
                >
                  Number
                </th>
                <th
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
                  onClick={handleOrderByChange}
                  data-order-by="seriesname"
                >
                  Name
                </th>
                <th
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
                  onClick={handleOrderByChange}
                  data-order-by="seriesslug"
                >
                  Slug
                </th>
                <th
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
                >
                  User
                </th>
                <th
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
                  onClick={handleOrderByChange}
                  data-order-by="created_at"
                >
                  Created
                </th>
                <th
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
                  onClick={handleOrderByChange}
                  data-order-by="updated_at"
                >
                  Updated
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {series &&
                    series.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {index + 1}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {item.seriesname}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {item.seriesslug}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {item.username}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {item.created_at}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {item.updated_at}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 flex space-x-2">
                      <Link
                        href={{
                          pathname: "/series/edit/[id]",
                          query: { id: item.id },
                        }}
                        className="border-2 border-slate-100 dark:border-slate-700 rounded-md px-2 py-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/series/delete/${item.id}`}
                        className="border-2 border-slate-100 dark:border-slate-700 rounded-md px-2 py-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <label htmlFor="rowsPerPage" className="text-slate-500 dark:text-slate-400">
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md py-1 px-2"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
            <span className="text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              className="border border-slate-200 dark:border-slate-600 rounded-md px-2 py-1 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="border border-slate-200 dark:border-slate-600 rounded-md px-2 py-1 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}