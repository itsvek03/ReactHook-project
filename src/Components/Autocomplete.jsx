import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CustomPaginationActionsTable from './GetUserDetails'


export default function SearchAuto(props) {
    const [userData, setUserData] = useState();
    const [value, setValue] = useState();
    useEffect(() => {
        const getLocalItem = localStorage.getItem("user");

        if (!value) {
            localStorage.setItem("user", JSON.stringify([]))
            return;
        }
        const { id, name } = value;
        if (!getLocalItem) {
            localStorage.setItem("user", JSON.stringify([{ id, name }]))
            return;
        }
        const storeLocal = JSON.parse(localStorage.getItem("user"));
        storeLocal.push({ id, name })
        localStorage.setItem("user", JSON.stringify(storeLocal))
        setUserData(storeLocal);
        console.log("Autocomplete", value)
    }, [value])


    const onAddvalue = (newValue) => {
        setValue(newValue);
    }



    return (
        <>
            <Autocomplete
                id="user-select-demo"
                sx={{ width: 300 }}
                options={props.user}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name}
                    </Box>
                )}
                onChange={(e, newValue) => onAddvalue(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select the user to Add"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />


            <CustomPaginationActionsTable
                userListData={userData}
            />

        </>







    );
}