import axios from 'axios';

// api.js dosyasında console.log ekleyerek kontrol et
const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

if (!apiKey) {
    console.error("HATA: API Key bulunamadı! .env dosyasını kontrol et.");
}

export const totalApi = axios.create({

    baseURL: 'https://covid-19-statistics.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
        'Content-Type': 'application/json',
    }
})




