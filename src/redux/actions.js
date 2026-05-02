import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetails = createAsyncThunk("covid/getDetails", async (country) => {
  try {
    // 1. COVID Verisi (Disease.sh - Key gerekmez)
    const covidReq = axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);

    // 2. Ülke/Bayrak Verisi (RestCountries)
    const countryReq = axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`);

    const [res1, res2] = await Promise.all([covidReq, countryReq]);

    const covid = res1.data;
    const countryData = res2.data[0];

    return {
      continent: covid.continent || "Bilinmiyor",
      country: covid.country || country,
      capital: countryData?.capital?.[0] || "Bilinmiyor",
      currency: countryData?.currencies
        ? Object.values(countryData.currencies)[0]?.name
        : "Bilinmiyor",
      day: new Date(covid.updated).toLocaleDateString(),
      cases: covid.cases,
      deaths: covid.deaths,
      tests: covid.tests,
      population: covid.population,
      flag: countryData?.flags?.png || "",
    };
  } catch (err) {
    console.error("Kurtarma Hatası:", err.message);
    throw err;
  }
});