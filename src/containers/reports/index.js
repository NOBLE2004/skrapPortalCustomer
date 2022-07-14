import React, { useState } from "react";
import { Masonry } from "@mui/lab";
import "chart.js/auto";
import "./report.scss";
import ReportHeader from "../../components/report/header";
import ReportFooter from "../../components/report/footer";
import FinanceReport from "../../components/report/reports/finance";
import EmissionReport from "../../components/report/reports/emission";
import Co2breakdownReport from "../../components/report/reports/co2breakdown";
import SiteMovementsReport from "../../components/report/reports/sitemovements";
import ReportFilters from "../../components/report/filters";
import { useSelector } from "react-redux";

const NewReports = () => {
  const state = useSelector((state) => state);
  const [selected, setSelected] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [csvData, setCsvData] = useState({
    dataOne: [],
    dataTwo: [],
    dataThree: [],
    data: [],
  });
  const [reports, setReports] = useState({
    finance: false,
    site_movements: false,
    emissions: false,
    waste_statistics: false,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelected(value);
  };
  const handleChangeReportType = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "finance":
        setCsvData((st) => ({
          ...st,
          data: [],
          dataOne: [],
          dataTwo: [],
          dataThree: [],
        }));
        setReports({
          ...reports,
          finance: true,
          site_movements: false,
          emissions: false,
          waste_statistics: false,
        });
        let arr = [];
        state?.hireBreakdown?.hire_breakdown?.result?.map((single) => {
          arr.push({ name: single.service_name, y: single.jobs });
          setCsvData((st) => ({
            ...st,
            dataOne: arr,
          }));
        });
        setCsvData((st) => ({
          ...st,
          data: [
            { name: "Finance", y: "Report" },
            ...state?.siteBreakdown?.site_breakdown?.result?.data,
            {},
            { name: "Hire Breakdown", y: "Report" },
            ...st.dataOne,
          ],
        }));
        break;
      case "site_movements":
        setReports({
          ...reports,
          finance: false,
          site_movements: true,
          emissions: false,
          waste_statistics: false,
        });
        setCsvData((st) => ({
          ...st,
          data: [],
          dataOne: [],
          dataTwo: [],
          dataThree: [],
        }));
        setCsvData((st) => ({
          ...st,
          dataOne: state?.siteMovements?.data?.result?.data,
        }));
        state?.siteMovementDetail?.data?.result?.map((single) => {
          setCsvData((st) => ({
            ...st,
            dataTwo: single?.data,
          }));
        });
        setCsvData((st) => ({
          ...st,
          data: [
            { name: "Site", y: "Report" },
            ...st.dataOne,
            {},
            { name: "Site Detail", y: "Report" },
            ...st.dataTwo,
          ],
        }));
        break;
      case "emissions":
        setReports({
          ...reports,
          finance: false,
          site_movements: false,
          emissions: true,
          waste_statistics: false,
        });
        // setCsvData((st) => ({
        //   ...st,
        //   site: state?.siteMovements?.data?.result?.data,
        // }));
        break;
      case "waste_statistics":
        setReports({
          ...reports,
          finance: false,
          site_movements: false,
          emissions: false,
          waste_statistics: true,
        });
        let tonnage = [];
        let waste = [];
        setCsvData((st) => ({
          ...st,
          dataOne: [
            {
              y: state?.landfillDiversion?.data?.result?.land_fill,
              name: state?.landfillDiversion?.data?.result?.title,
            },
          ],
          dataTwo: [
            {
              y: state?.energy?.data?.result?.land_fill,
              name: state?.energy?.data?.result?.title,
              value: state?.energy?.data?.result?.kwh,
            },
          ],
          dataThree: [
            {
              y: state?.recycled?.data?.result?.land_fill,
              name: state?.recycled?.data?.result?.title,
              value: state?.recycled?.data?.result?.emco2,
            },
          ],
        }));
        state?.waste?.data?.result?.map((single) => {
          waste.push({
            name: single.name,
            y: single.waste === null ? 0 : single.waste,
          });
        });
        state?.tonnage?.data?.result?.data?.map((single) => {
          tonnage.push({
            name: single.address,
            y: single.tonnage === null ? 0 : single.tonnage,
          });
        });
        setCsvData((st) => ({
          ...st,
          data: [
            { name: "Landfill", y: "Report" },
            ...st.dataOne,
            {},
            { name: "Energy", y: "Report" },
            ...st.dataTwo,
            {},
            { name: "Recycled", y: "Report" },
            ...st.dataTwo,
            {},
            { name: "Waste", y: "Report" },
            ...waste,
            {},
            { name: "Tonnage", y: "Report" },
            ...tonnage,
          ],
        }));
        break;
    }
  };

  return (
    <>
      <div className="main-report">
        <ReportHeader
          sites={selected}
          handleChange={handleChange}
          selected={selected}
        />
        <ReportFilters />
        <div className="report-grid">
          <Masonry container columns={2} spacing={4}>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Finance report</div>
              <FinanceReport sites={selected} />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Emissions</div>
              <EmissionReport
                sites={selected}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">C02e Breakdown</div>
              <Co2breakdownReport sites={selected} />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Site Movements</div>
              <SiteMovementsReport sites={selected} />
            </div>
          </Masonry>
        </div>
      </div>
      <ReportFooter
        handleChangeReportType={handleChangeReportType}
        csvData={csvData}
        reports={reports}
      />
    </>
  );
};
export default NewReports;
