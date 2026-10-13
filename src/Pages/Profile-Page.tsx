    import { useAuth } from "../context/Auth-Context";
    import ProfilePictureUpload from "../components/Profile-Picture-Upload";

    export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#12121a] px-6 py-28 text-white">
        <div className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

            <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl">Account Information</h2>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl">Profile Picture</h2>
            <ProfilePictureUpload />
            </div>
        </div>
        </div>
    );
    }
