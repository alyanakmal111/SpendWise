import React, { useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    profileImageUrl: user.profileImageUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );
      toast.success("Profile updated successfully");
      updateUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    }
  };

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="my-5 mx-auto max-w-4xl">
        <h2 className="text-[22px] text-gray-950 font-semibold mb-6">
          Edit Profile
        </h2>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-gray-200 rounded-xl p-5"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Last Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Phone Number"
            />
          </div>

          {/* Profile Image URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <input
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste profile image URL"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-lg text-sm font-semibold transition-colors"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
