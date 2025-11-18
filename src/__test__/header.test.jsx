import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import Header from "../pages/detail/Header";
import { BrowserRouter } from "react-router-dom";
import { mockData } from './../utils/constants';
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
// useNavigate'i taklit ediyoruz
import * as router from 'react-router-dom';

// Geri Git Testi İçin Mock Fonksiyonları

const mockNavigate = jest.fn();

// react-router-dom içindeki useNavigate'i taklit ediyoruz

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate, 
}));



// Redux Mock Fonksiyonu (Reducer)


const mockReducer = (state = { isLoading: true, data: null }) => state;



// TEST BLOĞU

describe('Header Bileşeni Testleri', () => {

  beforeEach(() => {
    // Her testten önce navigate çağrı geçmişini temizle
    mockNavigate.mockClear();
  });


  it("Store yüklenme durumundayken ekrana Loader basılmalı", () => {
    const store = configureStore({ reducer: mockReducer });

    // bileşeni render et
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    // ekranda loader var mı?
    screen.getByTestId("header-loader");
  });

  it("Store yükleme bittiğinde loader kalkar", () => {
    const loadedState = { isLoading: false, data: mockData };
    const mockLoadedReducer = (state = loadedState) => state;
    const store = configureStore({ reducer: mockLoadedReducer });

    // bileşeni render et (yükleme tamamlandığında loader görünmemeli)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    // loader kaldırıldı mı?
    expect(screen.queryByTestId("header-loader")).toBeNull();
  });

  it("Yükleme tamamlandığında ülke adı ve bayrak ekranda gösterilmeli", () => {
    const loadedState = { isLoading: false, data: mockData };
    const mockLoadedReducer = (state = loadedState) => state;
    const store = configureStore({ reducer: mockLoadedReducer });

    // bileşeni render et (yükleme tamamlandığında ülke adı ve bayrak görünmeli)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    // ülke adı ve bayrak ekranda mı?
    screen.getByText(mockData.country);
    // bayrak img alt'ında ülke adını içermeli
    screen.getByAltText(new RegExp(mockData.country, "i"));
  });

 
  it("Geri butonuna tıklandığında kullanıcı bir önceki sayfaya yönlendirilmeli", () => {
    const loadedState = { isLoading: false, data: mockData };
    const mockLoadedReducer = (state = loadedState) => state;
    const store = configureStore({ reducer: mockLoadedReducer });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    // Header bileşenindeki geri butonunu bulun

 const backButton = screen.getByRole('link', { name: /geri/i });

    // Butona tıklama eylemini simüle edin
    fireEvent.click(backButton);

    // Doğrulama: mockNavigate fonksiyonunun -1 argümanıyla çağrılıp çağrılmadığını kontrol edin
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});

