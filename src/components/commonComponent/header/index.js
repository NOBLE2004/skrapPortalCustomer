import { Box, Grid, Typography } from "@mui/material";
import "./style.scss";
import Plus from "../../../assets/images/plus-white.svg";
import { searchIcon } from "../../../assets/images";
import SiteFilters from "../../filters/SiteFilters";
import JobFilters from "../../filters/jobFilters";
import SiteFilterNew from "../../siteFilters";

const HeaderSite = (props) => {
  const { handleChangeFilters, handleCreateJob } = props;
  return (
    <Grid
      container
      mb={1}
      justifyContent="space-between"
      className="site-header-main"
      rowSpacing={2}
    >
      <Grid item md={5.5} xs={12}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography className="title clr-light-blue">
            Site Overview
          </Typography>
          <Box className="card-box" display="flex">
            <Typography className="card-title fnt-w-700 clr-blue">
              81
            </Typography>
            <Typography pl={1} className="card-title fnt-w-700 clr-gray">
              Total sites
            </Typography>
          </Box>
          <Box className="card-box" display="flex">
            <Typography className="card-title fnt-w-700 clr-blue">
              908
            </Typography>
            <Typography pl={1} className="card-title fnt-w-700 clr-gray">
              Bookings
            </Typography>
          </Box>
          <Box className="card-box" display="flex">
            <Typography className="card-title fnt-w-700 clr-light-blue">
              £313,163
            </Typography>
            <Typography pl={1} className="card-title fnt-w-700 clr-light-blue">
              Total spent
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item md={5.5} xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="card-box" display="flex">
              <div className="search-bar-container">
                <img src={searchIcon} alt="search-icon" />
                <input placeholder={`Search  `} />
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="btn-site" width="100%">
              <button
                className="button-save"
                onClick={() => {
                  handleCreateJob();
                }}
              >
                <img src={Plus} alt="" />
                Add a new site
              </button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4} md={7}>
            <Typography className="card-title fnt-w-500 clr-light-gray">
              Showing 81 sites{" "}
            </Typography>
          </Grid>
          <Grid item xs={8} md={5}>
            <SiteFilterNew handleChangeFilters={handleChangeFilters} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderSite;
