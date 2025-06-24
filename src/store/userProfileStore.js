import { doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../../../RaizenP2Frontend2/src/config/firebase";
const useUserProfileStore = addDoc((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  fetchUserProfile: async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ userProfile: docSnap.data() });
      } else {
        set({ userProfile: null });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ userProfile: null });
    }
  },
}));

export default useUserProfileStore;
