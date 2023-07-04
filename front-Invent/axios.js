import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://localhost:8001/api/` ,
        // baseURL: `https://apisiry.4help.tn/api/`, 
})

