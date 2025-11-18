import axios from 'axios';


export const totalApi = axios.create ({
  
   baseURL : 'https://covid-19-statistics.p.rapidapi.com/reports',
    headers: {
        'x-rapidapi-key': '6168180c32msh468da6d8165170fp11f587jsnfbc687b6b116',
        'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
    }
})


export const detailApi = axios.create({

 baseURL: "https://covid-193.p.rapidapi.com",
headers: {
        'x-rapidapi-key': '6168180c32msh468da6d8165170fp11f587jsnfbc687b6b116',
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
    }
})