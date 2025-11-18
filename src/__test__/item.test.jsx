import {render,screen } from "@testing-library/react"
import Item from "../pages/home/Item"

test("Gönderilen proplar doğru şekilde kullanılır", () => {
    // test edilecek bileşeni renderla
    render(<Item color="text-blue-500" text="Toplam Test" value="300M" />)

    // icon elementini al
 const icon = screen.getByTestId("icon")
    // color propu ile gelen değer iconun className 'inde var mı?
  expect(icon).toHaveClass("text-blue-500")

  //? text içeriklerini kontrol ederken iki ihtimal var
  //1) önce elemebti çağır sonra testine bak
  const h2 = screen.getByRole("heading")

  // 2) elementi textine göre çağır
  screen.getByText("Toplam Test")

})