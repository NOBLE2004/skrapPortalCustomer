import React, {useEffect, useState} from "react";
import "../commonComponent/commonfilter/commonfilter.scss";
import { JOB_STATUS } from '../../environment/';
import ServicesService from '../../services/service.service';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const JobFilters = ({ handleChangeFilters }) => {
    const [filters, setFilters] = useState({
        status: "",
        date: "",
        service: "",
        address: ""
    });
    const [togle, setTogle] = useState(false);
    const [state, setState] = useState([
        {
            startDate:  new Date(),
            endDate:  new Date(),
            key: 'selection'
        }
    ]);
    const [services, setServices] = useState([]);
    const {
        status,
        date,
        address,
        service,
    } = filters;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };
    useEffect(()=>{
        handleChangeFilters(filters);
    },[filters]);
    useEffect(()=>{
        ServicesService.list()
            .then((response) => {
                if(response.data.result){
                    setServices(response.data.result);
                }else{
                    setServices([]);
                }
            }).catch((error)=>{
            console.log(error)
        });
    }, []);
    const toggle = () => {
        setTogle(!togle);
    }
    const handleDate = (item) => {
        setState([item.selection]);
        const start = item.selection.startDate.toLocaleDateString().replace(/\//g, '-');
        const end = item.selection.endDate.toLocaleDateString().replace(/\//g, '-');
        setFilters({ ...filters, date: `${start},${end}` });
    };
    const resetFilters = () =>{
        setFilters({
            status: "",
            date: "",
            service: "",
            address: ""
        });
        setState([
            {
                startDate:  new Date(),
                endDate:  new Date(),
                key: 'selection'
            }
        ]);
    };
    return (
        <div className="filter-container">
            <div className="filter-title">Filter : </div>
            <div className="all-filters">
                    <>
                        <button onClick={toggle} className={"filter-option"}>Date</button>
                        {togle  && <DateRangePicker
                            editableDateInputs={false}
                            onChange={handleDate}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            direction="horizontal"
                        />}
                        <select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="service"
                            value={service}
                            onChange={handleChange}
                            className={"filter-option"}
                        >
                            <option value="">All Services</option>
                            {services.map((service)=>{
                                return(<option value={service.service_id}>{service.service_name}</option>)
                            })}
                        </select>
                        <input
                               name="address"
                               value={address}
                               onChange={handleChange}
                               className={"filter-option"}
                               placeholder="postcode"
                        />
                        <select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="status"
                            value={status}
                            onChange={handleChange}
                            className={"filter-option"}
                        >
                            <option value="">All Statuses </option>
                            {JOB_STATUS.map((status)=>{
                                return(<option value={status.id}>{status.status}</option>)
                            })}
                        </select>
                        <button onClick={resetFilters} className={"filter-option"}>reset</button>
                    </>
            </div>
        </div>
    );
};

export default JobFilters;
