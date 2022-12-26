import axios from "axios";


let _count = axios.create({
    baseURL: "https://restcountries.com/v3.1"
})

export default function countries() {

    const getByCodes = async (code) => {
        const response = await _count.get('/alpha', {
            params: {
                codes: code
            }
        })
        .catch((error) => {
            console.error(error)
        })
        return response.data
    }

    return {getByCodes}
}