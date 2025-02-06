import { useState } from "react";
import { updateProfile, updatePassword, updateEmail, deleteUser, signOut } from "firebase/auth";
import { auth, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User } from "firebase/auth";

const ProfileSettings = ({ user }: { user: User }) => {
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [newPassword, setNewPassword] = useState("");
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [orderAlerts, setOrderAlerts] = useState(true);

    const handleUpdateProfile = async () => {
        if (!user) return;
        try {
            await updateProfile(user, { displayName });
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile.");
        }
    };

    const handleProfilePicUpload = async () => {
        if (!profilePic || !user) return;
        try {
            const storageRef = ref(storage, `profile_pictures/${user.uid}`);
            await uploadBytes(storageRef, profilePic);
            const downloadURL = await getDownloadURL(storageRef);
            await updateProfile(user, { photoURL: downloadURL });
            alert("Profile picture updated!");
        } catch (error) {
            alert("Failed to update profile picture.");
        }
    };

    const handleChangeEmail = async () => {
        if (!user) return;
        try {
            await updateEmail(user, newEmail);
            alert("Email updated successfully!");
        } catch (error) {
            alert("Failed to update email.");
        }
    };

    const handleChangePassword = async () => {
        if (!user) return;
        try {
            await updatePassword(user, newPassword);
            alert("Password updated successfully!");
        } catch (error) {
            alert("Failed to update password.");
        }
    };

    const handleLogoutFromAllDevices = async () => {
        try {
            await signOut(auth);
            alert("Logged out from all devices!");
        } catch (error) {
            alert("Failed to logout.");
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        try {
            await deleteUser(user);
            alert("Account deleted successfully.");
        } catch (error) {
            alert("Failed to delete account.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Profile Settings</h2>

            {/* Change Display Name */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Change Display Name</label>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleUpdateProfile}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                >
                    Save Name
                </button>
            </div>

            {/* Update Profile Picture */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Update Profile Picture</label>
                <input
                    type="file"
                    onChange={(e) => setProfilePic(e.target.files ? e.target.files[0] : null)}
                    className="block w-full"
                />
                <button
                    onClick={handleProfilePicUpload}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                >
                    Upload Picture
                </button>
            </div>

            {/* Change Email */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Change Email</label>
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleChangeEmail}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                >
                    Update Email
                </button>
            </div>

            {/* Change Password */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Change Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleChangePassword}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                >
                    Update Password
                </button>
            </div>

            {/* Notification Preferences */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
                <label className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="mr-2"
                    />
                    Enable Email Notifications
                </label>
                <label className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        checked={orderAlerts}
                        onChange={() => setOrderAlerts(!orderAlerts)}
                        className="mr-2"
                    />
                    Order Status Alerts
                </label>
            </div>

            {/* Privacy & Security */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Privacy & Security</h3>
                <button
                    onClick={handleLogoutFromAllDevices}
                    className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg w-full"
                >
                    Logout from All Devices
                </button>
                <button
                    onClick={handleDeleteAccount}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg w-full"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
