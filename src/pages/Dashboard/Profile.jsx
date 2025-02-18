import { useState } from "react";
import { FaBell, FaMoon, FaExchangeAlt, FaHome, FaUser } from "react-icons/fa";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}

      {/* Main Content */}
      <main className="px-4 pt-20 pb-24">
        {/* Profile Header */}
        <section className="mb-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">John Doe</h1>
          <p className="text-green-600 mb-4">john.doe@example.com</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
            Edit Profile
          </button>
        </section>

        {/* Account Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Account Information
          </h2>
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-green-600">Account ID</span>
              <span className="font-medium">123456789</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-green-600">Joined Date</span>
              <span className="font-medium">May 1, 2023</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-600">Verification Status</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Verified
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
    </div>
  );
};

export default Profile;
