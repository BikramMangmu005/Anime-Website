import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import background from "../assets/images/background.png";
import hinataImage from "../assets/images/picture2b.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

import { useAuth } from "../context/Auth-Context";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoginOpen] = useState(true);

  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      console.log("LOGIN DATA:", data);
      console.log("TOKEN:", data.token);

      localStorage.setItem("token", data.token);

      login(data.user, data.token);
      console.log("Login API response:", data);
      console.log("User from API:", data.user);
      console.log("Token from API:", data.token);

      console.log("STORED TOKEN:", localStorage.getItem("token"));

      const username =
        data?.user?.username || data?.user?.Username || "Adventurer";

      // --- COMPACT ANIME POPUP WITH HINATA IMAGE ---
      const popupWrapper = document.createElement("div");
      popupWrapper.id = "anime-welcome-popup-container";
      popupWrapper.style.cssText =
        "position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-start;justify-content:center;padding-top:1.5rem;pointer-events:none;";

      popupWrapper.innerHTML = `
          <style>
            @keyframes animePop {
              0% { transform: scale(0.5) translateY(-30px); opacity: 0; }
              60% { transform: scale(1.03) translateY(5px); opacity: 1; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
          </style>
          <div style="animation: animePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; width: 100%; max-width: 22rem; background-color: rgba(10, 21, 38, 0.95); border: 2px solid #22d3ee; box-shadow: 0 0 25px rgba(34, 211, 238, 0.6); color: white; padding: 0.75rem 1rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 0.75rem; backdrop-filter: blur(12px); pointer-events: auto;">
            <img src="${hinataImage}" alt="Hinata" style="width: 2.5rem; height: 2.5rem; border-radius: 9999px; object-fit: cover; border: 2px solid #22d3ee; flex-shrink: 0;" />
            <div style="overflow: hidden; width: 100%;">
              <p style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; font-family: monospace; color: #22d3ee; margin: 0;">Welcome</p>
              <p style="font-size: 0.95rem; font-weight: bold; letter-spacing: 0.025em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0.1rem 0 0 0;">${username}</p>
            </div>
          </div>
        `;
      document.body.appendChild(popupWrapper);

      // Remove popup after 3.5 seconds
      setTimeout(() => {
        popupWrapper.remove();
      }, 3500);

      // Redirect to Home
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);

      setNotification({
        show: true,
        message: "Authentication Failed. Try Again!",
        type: "error",
      });

      setTimeout(() => {
        setNotification({ show: false, message: "", type: "success" });
      }, 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#152a45] font-sans text-white flex flex-col justify-between p-6 md:p-8">
      <style>{`
          @keyframes slowZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }
          @keyframes animePop {
            0% { transform: scale(0.5) translateY(-50px); opacity: 0; }
            60% { transform: scale(1.05) translateY(10px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          .animate-slow-zoom { animation: slowZoom 15s ease-in-out infinite; }
          .animate-anime-pop { animation: animePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        `}</style>

      {notification.show && notification.type === "error" && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <div className="animate-anime-pop w-full max-w-sm bg-[#0a1526]/95 border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)] text-white px-5 py-4 rounded-xl flex items-center space-x-3 backdrop-blur-md">
            <span className="text-2xl animate-bounce flex-shrink-0">⚠️</span>
            <div className="w-full overflow-hidden">
              <p className="text-xs uppercase tracking-widest font-bold font-mono text-red-400">
                System Notice
              </p>
              <p className="text-sm font-semibold tracking-wide truncate mt-0.5">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a1526] to-transparent opacity-80 z-20 pointer-events-none" />
      </div>

      <header className="relative z-30 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="text-1xl tracking-wider font-[var(--font-code)]">
          Bikram Anime
        </div>
      </header>

      <main className="relative z-30 flex-grow flex items-center justify-center my-auto">
        {isLoginOpen && (
          <div className="relative w-full max-w-md mx-4 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
            <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">
              Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full bg-transparent border-b border-white/40 pb-2 pl-1 pr-10 text-sm placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
                <Mail className="absolute right-1 bottom-2 h-4 w-4 text-white/60 pointer-events-none" />
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-transparent border-b border-white/40 pb-2 pl-1 pr-10 text-sm placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
                <Lock className="absolute right-1 bottom-2 h-4 w-4 text-white/60 pointer-events-none" />
              </div>

              <div className="flex items-center justify-between text-xs text-white/80 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-transparent border-white/40 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="hover:underline transition-all">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#152338] hover:bg-[#101b2c] text-white font-medium text-sm shadow-lg transition-all border border-white/10 mt-4"
              >
                Login
              </button>

              <div className="text-center text-xs text-white/70 pt-2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-white font-medium hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
