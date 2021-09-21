import React from "react";
import './pagination.scss';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

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
                    title="Next page"
                    onClick={previousPage}
                    aria-label="Next page">
                    <span className="MuiIconButton-label">
                        <KeyboardArrowLeftIcon/>
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
                        <KeyboardArrowRightIcon/>
                    </span>
                    <span className="MuiTouchRipple-root">
                    </span>
                </button>
            </div>
        </div>
    );
}


export default Pagination;
