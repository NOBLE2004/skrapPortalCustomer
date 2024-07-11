import { ExpandMoreOutlined } from "@mui/icons-material";
import { Box, Menu, MenuItem } from "@mui/material"
import { useState } from "react";

const options = [
    'All',
    'Junuary',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const ITEM_HEIGHT = 48;

const FilterCard = ({ title }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box className="filter-card" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <p className="">Filter by:</p>
            <Box >
                <p onClick={handleClick} style={{ color: "#0F2851", opacity: 1, display: "flex", alignItems: "center", fontWeight: 700 }}>{title || "Month"}<ExpandMoreOutlined /></p>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    )
}

export default FilterCard