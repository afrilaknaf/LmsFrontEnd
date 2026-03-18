import axios from "axios";

export async function Gets(value) {
    try {
        const res = await axios.get(`http://localhost:2005/${value}`);
        return res.data.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}