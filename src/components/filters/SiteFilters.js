import React, { useEffect, useState } from "react";
import "../commonComponent/commonfilter/commonfilter.scss";
import { JOB_STATUS } from "../../environment/";
import ServicesService from "../../services/service.service";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";

const SiteFilters = ({ handleChangeFilters }) => {
    const [filters, setFilters] = useState({
        date: "",
    });
    const [togle, setTogle] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    useEffect(() => {
        handleChangeFilters(filters);
    }, [filters]);
    const toggle = () => {
        setTogle(!togle);
    };
    const handleDate = (item) => {
        setState([item.selection]);
        // const start = item.selection.startDate
        //     .toLocaleDateString()
        //     .replace(/\//g, "-");
        // const end = item.selection.endDate.toLocaleDateString().replace(/\//g, "-");
        const start = new Date(item.selection.startDate.toDateString() + ' UTC').toISOString().split('T')[0].split('-').reverse().join('-');
        // const end = item.selection.endDate.toLocaleDateString().replace(/\//g, '-');
        const end = new Date(item.selection.endDate.toDateString() + ' UTC').toISOString().split('T')[0].split('-').reverse().join('-');
        const newStartDate = moment(item.selection.startDate).format("DD-MM-YYYY");
        const newEndDate = moment(item.selection.endDate).format("DD-MM-YYYY");
        if (start === end) {
            setFilters({ ...filters, date: `${newStartDate},${newEndDate}` });
        } else {
            setFilters({ ...filters, date: `${newStartDate},${newEndDate}` });
            setTogle(false);
        }
    };
    const resetFilters = () => {
        setFilters({
            date: "",
        });
        setState([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",
            },
        ]);
    };
    return (
        <div className="filter-container">
            <div className="filter-title">Filter : </div>
            <div className="all-filters">
                <>
                    <button onClick={toggle} className={"filter-option"}>
                        Date
                    </button>
                    {togle && (
                        <DateRangePicker
                            editableDateInputs={false}
                            onChange={handleDate}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            direction="horizontal"
                        />
                    )}
                    <button onClick={resetFilters} className={"filter-option"}>
                        reset
                    </button>
                </>
            </div>
        </div>
    );
};

export default SiteFilters;

