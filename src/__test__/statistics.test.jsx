import Statistics from "../pages/home/Statistics"
import { render, screen, waitFor } from '@testing-library/react';
import { totalApi } from "../utils/api";
import { totalData } from "../utils/constants";
import millify from "millify";


// api isteğini atan fonksiyonu mockluyoruz
jest.mock("../utils/api", () => ({
    totalApi: {
        get: jest.fn(),
    },
}));
describe("istatistk component testleri", () => {
    // Her testten önce bütün mock'ları sıfırlıyoruz
    beforeEach(() => {
        jest.clearAllMocks();
    })


    test("bileşen renderlandığında ekrana loader gelir", () => {
        totalApi.get.mockReturnValue(new Promise(() => {}))
        // bileşeni render ediyoruz
        render(<Statistics />)

        // ekranda loader'ın görünüp görünmediğini kontrol ediyoruz
        screen.getByTestId("loader");
    })

    test("api'dan hata geldiğinde ekrana hata mesajı gelir", async () => {
        totalApi.get.mockRejectedValueOnce(new Error("API Hatası"))
        // bileşeni render ediyoruz
        render(<Statistics />)

        // belirli bir süre sonuç bekliyoruz ve hata mesajının ekranda görünüp görünmediğini kontrol ediyoruz
        await waitFor(() => screen.getByText("Üzgünüz Bir Hata Oluştu"));
    })

     test("api' dan cevap geldiğinde ekrana veriler gelir", async () => {
        totalApi.get.mockResolvedValue({data: {data: totalData}})
            render(<Statistics />)

            // api isteğinin atılmasını bekle
            await waitFor(() => expect(totalApi.get).toHaveBeenCalled())

            // toplam vaka sayısı ekrana basılır
         screen.getByText(millify(totalData.confirmed))

         // aktif vaka sayısı ekrana basılır
         screen.getByText(millify(totalData.active))

            // toplam vefat sayısı ekrana basılır
             screen.getByText(millify(totalData.deaths))
    })
    
})