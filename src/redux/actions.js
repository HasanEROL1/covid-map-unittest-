import { createAsyncThunk } from "@reduxjs/toolkit";
import {detailApi} from "../utils/api"
import axios from "axios";

export const getDetails = createAsyncThunk("covid/getDetails", async (country) =>{
  //ülke covid verilerini al
    const req1 =   await detailApi.get("/statistics", {params: {country}})

  // ülke verilerini al
    const req2 =   await axios.get(`https://restcountries.com/v3.1/name/${country}`)

    // iki api isteğini aynı anda yap
    const [res1, res2] = await Promise.all([req1, req2])

    const covid =res1.data.response[0]
    const countryData = res2.data[0]
 
    const data = {
        continent: covid.continent,
        country: covid.country,
        capital:countryData.capital[0],
        // nesneyi diziye çevirip ilk elemanı al
        currency:Object.entries(countryData.currencies)[0][1].name,
        day: covid.day,
        cases: covid.cases.total,
        deaths: covid.deaths.total,
        tests: covid.tests.total,
        population: covid.population,
        flag: countryData.flags,
     
    }
// console.log(data);

   // payload'u döndür
return data
})