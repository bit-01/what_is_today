import axios from "axios";
import {ref} from 'vue'
import countries from "@/countries";

const _calpi = axios.create({
    baseURL: 'https://calendarific.com/api/v2',
    params: {
        api_key: "6de49274a4e71a32fb4cfaef5b66a538b29f0b9d",
    }
})

const _countries = countries()

export default function calpi() {
    const holidays = ref([])
    const errors = ref('')
    const allCountries = ref([])

    const paths = {
        holidays: '/holidays',
        countries: "/countries"
    }

    const getHolidays = async (prms) => {
        let ps = {
            year: prms.h_date.getFullYear(),
            country: prms.country
        }
        
        if (prms.date_opt.month == true) ps.month = prms.h_date.getMonth() + 1
        if(prms.date_opt.day == true) ps.day = prms.h_date.getDate()
        
        if(prms.type != "") ps.type = prms.type

        let response = await _calpi.get(paths.holidays, {
            params: ps
        }).catch((error) => {
            errors.value = error
        })
        if(response.data.meta.code == 200) {
            holidays.value = response.data.response.holidays
        } else {
           errors.value = response.data.meta.error_detail
        }
    }

    const getAllCountries = async () => {
        let response = await _calpi.get(paths.countries).catch((error) => {
            console.log(error)
        })
        allCountries.value = response.data.response.countries
        let codes = ''

        allCountries.value.forEach((el) => {
            codes += el["iso-3166"]+','
        });
        codes.slice(0,-1)

        let c_all = await _countries.getByCodes(codes)

        allCountries.value.forEach((el, ky) => {
            allCountries.value[ky]["fData"] = c_all.find((elm) => {
                return elm.cca2 == el["iso-3166"]
            })
        })  
    }

    return {holidays, errors, getHolidays, getAllCountries, allCountries}
}