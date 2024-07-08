import { Box } from '@mui/material'
import './style.scss'
import TrashIcon from '../../../assets/images/trash 1.svg'
import SmokeIcon from '../../../assets/images/smoke 1.svg'
import FilterCard from '../cardFilter'
const Sustainability = ({ jobStatus }) => {
    return (
        <div className="main-sus">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="primary-title">Sustainability </span>
                <FilterCard
                    title="All bookings"
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Box className='item' mt={2}>
                    <h2>87% <span>Waste diverted</span></h2>
                    <p>7.36 tonnes diverted</p>
                </Box>
                <Box className='item2' mt={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box>
                        <img src={TrashIcon} alt="" />
                    </Box>
                    <Box>
                        <h2>8.75 <span>kg CO2</span></h2>
                        <p>Waste emissions</p>
                    </Box>
                </Box>
                <Box className='item2' mt={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box>
                        <img src={SmokeIcon} alt="" />
                    </Box>
                    <Box>
                        <h2>{parseFloat(jobStatus.TotalCo2 > 500 ? jobStatus.TotalCo2 / 1000 : jobStatus.TotalCo2).toFixed(2).toLocaleString()} <span>kg CO2</span></h2>
                        <p>Total Co2</p>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Sustainability
