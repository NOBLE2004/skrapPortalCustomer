import React from "react";
import "./pagination.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Pagination({
  from,
  to,
  total,
  current,
  last,
  handleNext,
  handlePrevious, limit, setLimit
}) {
  const previousPage = () => {
    let previous = current;
    if (current > 1) {
      previous = current - 1;
    }
    handlePrevious(previous);
  };
  const nextPage = () => {
    let next = current;
    if (current < last) {
      next = current + 1;
    }
    handleNext(next);
  };

  return (
    <div className="pagination">
      <select style={{marginRight: '2%', width: '4%'}} onChange={(e) => {
        setLimit(e.target.value)
      }} defaultValue={limit}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span>
        {from} - {to} of {total}
      </span>
      <div className="MuiTablePagination-actions">
        <button
          className="previous-btn"
          tabIndex="0"
          type="button"
          title="Previous page"
          onClick={previousPage}
          aria-label="Next page"
          disabled={current === 1}
        >
          <span className="MuiIconButton-label">
            <KeyboardArrowLeftIcon />
          </span>
          <span className="MuiTouchRipple-root"></span>
        </button>

        <button
          className="next-btn"
          tabIndex="0"
          type="button"
          title="Next page"
          onClick={nextPage}
          aria-label="Next page"
          disabled={last === 1 || current === last}
        >
          <span className="MuiIconButton-label">
            <KeyboardArrowRightIcon />
          </span>
          <span className="MuiTouchRipple-root"></span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
