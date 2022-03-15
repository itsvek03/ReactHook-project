import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SearchAuto from './Autocomplete'

export default function UserList() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getuserList = async () => {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            setUserData(response.data);
        }
        getuserList();
    }, [])
    return (
        <SearchAuto
            user={userData}
        />
    )
}
