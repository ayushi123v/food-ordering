import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { customerLogin, saveAuthData } from "@/services/api";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await customerLogin(formData);
      saveAuthData(response.token, response.user, "customer");
      toast.success("Login successful!");
      navigate("/customer/vendors");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-400 to-red-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .4 }}
        className="backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-8 rounded-2xl w-full max-w-md"
      >
        <div className=" flex flex-col items-center gap-2 mb-6">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: .5, repeat: Infinity, repeatType: "reverse" }}
            className="bg-white/30 p-3 rounded-full"
          >
            <User className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Welcome Back 👋</h2>
          <p className="text-white/80 text-sm">Login to order delicious food</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/70 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/20 text-white placeholder-white/70 py-3 pl-11 pr-3 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-300 outline-none"
              disabled={loading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/70 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-white/20 text-white placeholder-white/70 py-3 pl-11 pr-3 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-300 outline-none"
              disabled={loading}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: .95 }}
            whileHover={{ scale: 1.04 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="text-center mt-4 text-white/80 text-sm">
          Not registered?{" "}
          <Link to="/signup/customer" className="text-white font-semibold underline">
            Sign up
          </Link>
        </div>

        <div className="mt-4 text-center text-white text-xs opacity-70">
          Customer Login
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerLogin;
