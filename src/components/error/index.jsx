const Error = ({ info, refetch }) => {

  const errorMessage = typeof info === 'object' ? (info.message || "Veriler alınamadı") : info;

  return (
    <div data-testid="error" className="col-span-3 my-20 flex flex-col justify-center text-center gap-10">
      <div className="bg-red-400 p-5 rounded-md text-white">
        <p className="font-bold text-lg">Üzgünüz bir sorun oluştu</p>
        {/* Hata mesajını direkt ekrana basıyoruz */}
        <p className="mt-2">{errorMessage}</p>
      </div>

      <button
        className="border shadow mt-10 text-black p-2 hover:bg-gray-100 transition"
        onClick={refetch}
      >
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;