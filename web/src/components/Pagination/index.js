import React from "react";
import ReactPaginate from "react-paginate";

import ChevronLeftIcon from "components/icons/ChevronLeft";
import ChevronRightIcon from "components/icons/ChevronRight";

import styles from "./Pagination.module.scss";

export default function Pagination({ lastPage = 0, currentPage = 0, setPage }) {
  if (lastPage === 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel={<ChevronLeftIcon primary />}
      nextLabel={<ChevronRightIcon primary />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={lastPage}
      initialPage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      nextClassName={styles.next}
      previousClassName={styles.previous}
      onPageChange={({ selected }) => setPage(selected + 1)}
    />
  );
}
