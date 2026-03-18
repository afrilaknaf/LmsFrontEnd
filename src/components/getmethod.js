import axios from "axios";

export async function Gets(value) {
    try {
        const res = await axios.get(`https://lmsbackend-oadz.onrender.com/${value}`);
        return res.data.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}