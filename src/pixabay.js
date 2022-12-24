import axios from "axios";
import { ref } from "vue";

const _pixabay = axios.create({
    baseURL: "https://pixabay.com/api/",
    params: {
        key: "32333830-00595e59f95065eae178519e2",
        lang: "en",
        q:""
    }
})

export default function pixabay() {
    const images = ref([])
    const errors = ref('')

    const getImageByPhrase = async (phrase = '') => {
        let response = await _pixabay.get('/', {
            params: {
                q: phrase
            }
        }).catch((error) => {
            errors.value = error
        })
        images.value = response.data
    }

    return {images, errors, getImageByPhrase}
}