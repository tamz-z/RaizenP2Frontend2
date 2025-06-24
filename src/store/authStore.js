import addDoc from "firebase/firestore";

const useAuthStore = addDoc((set) => ({
  user: JSON.parse(localStorage.getItem("user-info")) || null,
  setUser: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user-info");
    set({ user: null });
  },
}));

export default useAuthStore;
