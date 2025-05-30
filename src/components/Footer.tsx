import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">To'yBooking</h3>
          <p className="text-sm text-gray-400">
            Orzuingizdagi to'yni oson va qulay rejalashtiring.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Tezkor Havolalar</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-gray-400 hover:text-white">
                Asosiy
              </Link>
            </li>
            <li>
              <Link
                to="/venues"
                className="text-sm text-gray-400 hover:text-white"
              >
                To'yxonalar
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm text-gray-400 hover:text-white"
              >
                Biz haqimizda
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm text-gray-400 hover:text-white"
              >
                Bog'lanish
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Biz bilan bog'laning</h3>
          <p className="text-sm text-gray-400">Email: info@toybooking.uz</p>
          <p className="text-sm text-gray-400">Telefon: +998 XX XXX XX XX</p>
          {/* Ijtimoiy tarmoq ikonkalari qo'shilishi mumkin */}
        </div>
      </div>
      <div className="container mx-auto text-center mt-8 border-t border-gray-700 pt-8">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} To'yBooking. Barcha huquqlar
          himoyalangan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
