import axios from "../utils/NetworkManager";

export default async function loader() {
    try {
        axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
        const res = await axios.get("/api/products");
        return res?.data;
    }catch(err) {
        return err;
    }
}