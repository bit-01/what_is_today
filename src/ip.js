import axios from 'axios'
import {ref} from 'vue'

let _ip = axios.create({
    baseURL: "https://api.country.is"
})

export default async function getIP() {
    const ip = ref()
    
    ip.value = await _ip.get('/')
    
    return ip.value.data;
}