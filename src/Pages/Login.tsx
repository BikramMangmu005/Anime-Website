import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import background from "../assets/images/background.png";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoginOpen] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#152a45] font-sans text-white flex flex-col justify-between p-6 md:p-8">
      {/* Inline styles for custom background animation */}
      <style>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-slow-zoom {
          animation: slowZoom 15s ease-in-out infinite;
        }
      `}</style>

      {/* Background Layer with Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Abstract forest line silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a1526] to-transparent opacity-80 z-20 pointer-events-none" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-30 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="text-1xl tracking-wider font-[var(--font-code)]">
          Bikram Anime
        </div>
      </header>

      {/* Main Container with Frosted Glass Modal */}
      <main className="relative z-30 flex-grow flex items-center justify-center my-auto">
        {isLoginOpen && (
          <div className="relative w-full max-w-md mx-4 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
            <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">
              Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Remember Me & Forgot Password */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#152338] hover:bg-[#101b2c] text-white font-medium text-sm shadow-lg transition-all border border-white/10 mt-4"
              >
                Login
              </button>

              {/* Register Redirect */}
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
