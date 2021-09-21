import React from "react";
import './pagination.scss';

function Pagination({from, to, total, current, last, handleNext, handlePrevious}) {
    const previousPage = () => {
        let previous = current;
        if(current > 1){
            previous = current - 1
        }
        handlePrevious(previous);
    };
    const nextPage = () => {
        let next = current;
        if(current < last){
            next = current + 1
        }
        handleNext(next);
    };
    return (
        <div className="pagination">
        <span>
            {from} - {to} of {total}
        </span>
            <div className="MuiTablePagination-actions">
                <button
                    className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                    tabIndex="0"
                    type="button"
                    title="Previous page"
                    onClick={previousPage}
                    aria-label="Previous page">
                    <span className="MuiIconButton-label">
                        <svg className="MuiSvgIcon-root"
                             focusable="false"
                             viewBox="0 0 24 24"
                             aria-hidden="true">
                            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
                        </svg>
                    </span>
                    <span className="MuiTouchRipple-root">
                    </span>
                </button>
                <button
                    className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                    tabIndex="0"
                    type="button"
                    title="Next page"
                    onClick={nextPage}
                    aria-label="Next page">
                    <span className="MuiIconButton-label">
                        <svg
                            className="MuiSvgIcon-root"
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true">
                            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
                        </svg>
                    </span>
                    <span className="MuiTouchRipple-root">
                    </span>
                </button>
            </div>
        </div>
    );
}


export default Pagination;
