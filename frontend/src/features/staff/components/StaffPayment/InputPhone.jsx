import { Smartphone, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const phoneSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "Số điện thoại không quá 11 chữ số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số"),
});

function InputPhone() {
  const { register, formState: { errors } } = useForm({
    resolver: zodResolver(phoneSchema),
    mode: "onChange"
  });

  return (
    <div className="mt-6 mb-4">
      <p className="font-bold text-[#1a1b22] text-base mb-3">Thông tin khách hàng</p>
      <div className={`flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border transition-all ${errors.phoneNumber ? 'border-rose-200 bg-rose-50/10' : 'border-transparent focus-within:border-teal-100'}`}>
        <div className={`p-1.5 rounded-lg ${errors.phoneNumber ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-[#0D9488]'}`}>
          <Smartphone size={18}/>
        </div>
        <input
          {...register("phoneNumber")}
          className="w-full outline-none placeholder:text-gray-300 font-medium text-[#1a1b22] text-sm bg-transparent" 
          type="tel" 
          placeholder="Số điện thoại khách hàng" 
        />
      </div>
      {errors.phoneNumber && (
        <div className="flex items-center gap-1.5 mt-2 ml-1 text-rose-500">
          <AlertCircle size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wide text-rose-500">{errors.phoneNumber.message}</span>
        </div>
      )}
    </div>
  );
}

export default InputPhone;
