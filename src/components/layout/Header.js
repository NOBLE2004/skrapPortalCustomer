import {Container, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import { useHistory } from "react-router-dom";

const Header = (props) => {
    const navigate = useHistory();
    const handleChange = ({target}) => {
        props.setCurrency(target.value);
        setTimeout(()=> {
            navigate.go(0);
        },100)
    }
    return (
        <Grid container style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Grid item md={1} xs={12}>
                <FormControl variant="outlined" margin="dense" style={{width: '100%', alignItems: 'flex-end'}}>
                    <select
                        value={props.currency}
                        style={{width: '70%', padding: '4px', background: 'white', border: '1px solid rgb(181, 208, 255)', color: 'rgb(81, 142, 248)', borderRadius: '5px'}}
                        onChange={handleChange}
                        label="service"
                        name="service"
                    >
                        <option value="£">
                            UK
                        </option>
                        <option value="$">
                            USA
                        </option>
                        <option value="€">
                            EU
                        </option>
                    </select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Header;
