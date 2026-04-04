import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authAdmin.service";
import useAuthStore from "@/features/auth/store/useAuthStore";

const useLoginAdmin = () => {
  return useMutation({
    mutationFn: ({ username, password }) => login({ username, password }),
    onSuccess: (data) => {
      const { user, accessToken } = data;

      localStorage.setItem("staff_has_session", "true");
      useAuthStore.setState({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    },
    onError: (error) => {
      console.log(error.response);
    },
  });
};

export { useLoginAdmin };
