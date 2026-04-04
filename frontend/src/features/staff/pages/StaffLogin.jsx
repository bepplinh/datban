
import { useNavigate } from "react-router-dom";
import { User, Lock, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/features/auth/store/useAuthStore";
import { toast } from "sonner";
import loginSchema from "@/shared/schema/loginSchema";

export default function StaffLogin() {
  const { login, isLoading, error: apiError } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const onSubmit = async (data) => {
    const success = await login(data.username, data.password);
    if (success) {
      toast.success("Đăng nhập thành công!", { duration: 2000 });
      
      // Lấy user trực tiếp từ store để có dữ liệu mới nhất sau khi login
      const user = useAuthStore.getState().user;
      
      setTimeout(() => {
        const role = user?.role?.toUpperCase();
        if (role === "KITCHEN") {
          navigate("/kds");
        } else {
          navigate("/staff");
        }
      }, 500);
    } else {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ca8a04]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
          <span className="text-3xl font-bold text-white">W</span>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
          Warm Staff Portal
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Hệ thống quản lý chuỗi nhà hàng Warm
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-white/50 ring-1 ring-gray-900/5">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                Tài khoản (Username)
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${errors.username ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  {...register("username")}
                  id="username"
                  type="text"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 focus:bg-white text-gray-900 sm:text-sm placeholder-gray-400 ${
                    errors.username ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1 ml-1">
                  <AlertCircle size={12} /> {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Mật khẩu
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 focus:bg-white text-gray-900 sm:text-sm placeholder-gray-400 ${
                    errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1 ml-1">
                  <AlertCircle size={12} /> {errors.password.message}
                </p>
              )}
            </div>

            {/* API Error Notification */}
            {apiError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start border border-red-100 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="shrink-0 mt-0.5 mr-2 h-4 w-4" />
                <span>{apiError}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 cursor-pointer active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng Nhập Ngay"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
