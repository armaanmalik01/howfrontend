import axios from "axios";

// another axios instance 

const net = axios.create({
    baseURL:"/"
})

export default net;