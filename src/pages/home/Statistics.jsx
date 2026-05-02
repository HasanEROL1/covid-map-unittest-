import millify from "millify"
import Item from "./Item"
import { useEffect, useState } from "react"
import { totalApi } from "../../utils/api"
import Loader from "../../components/loader"


const Statistics = () => {
  const [data, setData] = useState(null)
  const [isError, setIsError] = useState((false))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    totalApi
      .get("reports/total", { params: { date: "2023-01-01" } })
      .then((res) => setData(res.data.data))
      .catch((err) => {
        console.error("İstatistik Hatası:", err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false))
  }, [])
  return (
    <div className="container py-0">
      <div className="bg-white shadow-lg rounded-xl p-5 grid grid-cols-3 gap-5 mt-[-34px] md: -[-48px]">
        {isLoading ? (<Loader />) : isError ? (<p>Üzgünüz Bir Hata Oluştu</p>)

          : (data && (
            <>
              <Item color="text-pink-500" text="Toplam Vaka"
                value={millify(data.confirmed)} />

              <Item color="text-green-500" text="Toplam İyileşen"
                value={millify(data.active)} />

              <Item color="text-gray-500" text="Toplam Vefat"
                value={millify(data.deaths)} />
            </>
          )
          )}


      </div>
    </div>
  )
}

export default Statistics