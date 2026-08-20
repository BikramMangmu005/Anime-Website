import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import background from "../assets/images/background.png";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterOpen] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, email, password, confirmPassword });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#152a45] font-sans text-white flex flex-col justify-between p-6 md:p-8">
      {/* Background Layer with Correctly Nested Elements */}
      <div
        className="absolute animate-slow-zoom inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-black/30" />

        {/* Abstract forest line silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a1526] to-transparent opacity-80" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="text-2xl tracking-wider font-[var(--font-code)]">
          Bikram Anime
        </div>
      </header>

      {/* Main Container with Frosted Glass Modal */}
      <main className="relative z-10 flex-grow flex items-center justify-center my-auto">
        {isRegisterOpen && (
          <div className="relative w-full max-w-md mx-4 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
            <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">
              Register
            </h2>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Username Field */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  className="w-full bg-transparent border-b border-white/40 pb-2 pl-1 pr-10 text-sm placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
                <User className="absolute right-1 bottom-2 h-4 w-4 text-white/60 pointer-events-none" />
              </div>

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

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-transparent border-b border-white/40 pb-2 pl-1 pr-10 text-sm placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
                <Lock className="absolute right-1 bottom-2 h-4 w-4 text-white/60 pointer-events-none" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#152338] hover:bg-[#101b2c] text-white font-medium text-sm shadow-lg transition-all border border-white/10 mt-4"
              >
                Register
              </button>

              {/* Login Redirect */}
              <div className="text-center text-xs text-white/70 pt-2">
                Already have an account?{" "}
                <a
                  href="#login"
                  className="text-white font-medium hover:underline"
                >
                  Login
                </a>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
