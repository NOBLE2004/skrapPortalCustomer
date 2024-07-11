import {Box, Skeleton, Stack} from '@mui/material'
import './style.scss'
import TrashIcon from '../../../assets/images/trash 1.svg'
import SmokeIcon from '../../../assets/images/smoke 1.svg'
import FilterCard from '../cardFilter'
import React from "react";
const Sustainability = ({ jobStatus, loading }) => {
    return (
        <>
        {loading ? (
            <Box
                height={"90px"}
                display="flex"
                my={2}
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: "96%",
                    background: "#fff",
                    boxShadow: "0px 17px 24px rgb(58 58 58 / 5%) !important",
                    borderRadius: "11.6836px",
                    padding: "0px 12px",
                    marginRight: "10px",
                }}
            >
                <Stack spacing={1} px={2} width={'100%'}>
                    <Skeleton variant='rectangular' width={'100%'} height={80} />
                </Stack>        </Box>
        ) : (
                <div className="main-sus">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="primary-title">Sustainability </span>
                        {/*<FilterCard*/}
                        {/*    title="All bookings"*/}
                        {/*/>*/}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Box className='item' mt={2}>
                            <h2>{parseFloat(jobStatus.divertedLandfill)}% <span>Waste diverted</span></h2>
                            <p>{parseFloat(jobStatus.divertedTonnage)} tonnes diverted</p>
                        </Box>
                        <Box className='item2' mt={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box>
                                <img src={TrashIcon} alt="" />
                            </Box>
                            <Box>
                                <h2>{parseFloat(jobStatus.TotalCo2Waste > 500 ? jobStatus.TotalCo2Waste / 1000 : jobStatus.TotalCo2Waste).toFixed(2).toLocaleString()} <span>{jobStatus.TotalCo2Waste > 500 ? 'tn':'kg'} CO2</span></h2>
                                <p>Waste emissions</p>
                            </Box>
                        </Box>
                        <Box className='item2' mt={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box>
                                <img src={SmokeIcon} alt="" />
                            </Box>
                            <Box>
                                <h2>{parseFloat(jobStatus.TransportCo2 > 500 ? jobStatus.TransportCo2 / 1000 : jobStatus.TransportCo2).toFixed(2).toLocaleString()} <span>{jobStatus.TransportCo2 > 500 ? 'tn':'kg'} CO2</span></h2>
                                <p>Transport emissions</p>
                            </Box>
                        </Box>
                    </Box>
                </div>
            )}
        </>
    )
}

export default Sustainability
