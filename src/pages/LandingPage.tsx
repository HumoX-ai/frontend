/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useGetVenuesQuery } from "@/store/api/venueApi";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

const LandingPage = () => {
  const {
    data: venues,
    isLoading,
    isError,
    error,
  } = useGetVenuesQuery({ limit: 3 });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Orzuingizdagi to'yni biz bilan rejalashtiring!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Eng yaxshi to'yxonalarni toping, solishtiring va osonlik bilan band
            qiling. Hayotingizdagi eng muhim kunni unutilmas qiling.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg"
          >
            Hoziroq boshlash
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
            Nima uchun bizni tanlashingiz kerak?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Keng tanlov
              </h3>
              <p className="text-gray-600">
                Har xil did va byudjetga mos keladigan yuzlab to'yxonalar bir
                joyda.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Oson buyurtma
              </h3>
              <p className="text-gray-600">
                Bir necha oddiy qadam bilan orzuingizdagi to'yxonani band
                qiling.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Ishonchli xizmat
              </h3>
              <p className="text-gray-600">
                Tasdiqlangan to'yxonalar va shaffof narxlar bilan xotirjam
                bo'ling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
            Qanday ishlaydi?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-4 text-2xl font-bold w-16 h-16 flex items-center justify-center">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Qidirish
              </h3>
              <p className="text-gray-600">
                Manzil, sana va mehmonlar soni bo'yicha ideal to'yxonangizni
                toping.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-4 text-2xl font-bold w-16 h-16 flex items-center justify-center">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Solishtirish
              </h3>
              <p className="text-gray-600">
                Narxlar, qulayliklar va sharhlarni solishtirib, eng yaxshisini
                tanlang.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-4 text-2xl font-bold w-16 h-16 flex items-center justify-center">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Band qilish
              </h3>
              <p className="text-gray-600">
                Bir necha tugma bilan onlayn band qiling va tasdiqnoma oling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Venues Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
            Mashhur To'yxonalar
          </h2>
          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {isError && (
            <div className="text-center text-red-500">
              <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
              <p className="text-xl">
                To'yxonalarni yuklashda xatolik yuz berdi.
              </p>
              {error && (
                <p className="text-sm">
                  {(error as any)?.data?.message || (error as any)?.status}
                </p>
              )}
            </div>
          )}
          {!isLoading && !isError && venues && venues.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {venues.map((venue) => (
                <div
                  key={venue._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={
                      venue.images && venue.images.length > 0
                        ? venue.images[0].startsWith("/")
                          ? `https://backend-exam-tuxona.onrender.com${venue.images[0]}`
                          : venue.images[0]
                        : "https://via.placeholder.com/400x300?text=Rasm+Yo'q"
                    }
                    alt={venue.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3
                      className="text-xl font-semibold mb-2 text-gray-700 truncate"
                      title={venue.name}
                    >
                      {venue.name}
                    </h3>
                    <p className="text-gray-600 mb-1 text-sm truncate">
                      Manzil: {venue.district}
                    </p>
                    <p className="text-gray-600 mb-2 text-sm">
                      Sig'imi: {venue.capacity} kishi
                    </p>
                    <p className="text-purple-600 font-semibold mb-3">
                      Narxi: {venue.pricePerSeat.toLocaleString()} so'm / kishi
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-auto w-full border-purple-500 text-purple-500 hover:bg-purple-50"
                    >
                      <Link to={`/venues/${venue._id}`}>Batafsil</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isLoading && !isError && venues && venues.length === 0 && (
            <p className="text-center text-gray-500 text-xl">
              Hozircha mashhur to'yxonalar mavjud emas.
            </p>
          )}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg text-lg"
            >
              <Link to="/venues">Barcha to'yxonalarni ko'rish</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default LandingPage;
