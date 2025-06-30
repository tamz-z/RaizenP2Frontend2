import create from "zustand";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  fetchUserProfile: async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      set({ userProfile: docSnap.data() });
    } else {
      set({ userProfile: null });
    }
  },
  subscribeToUserProfile: (uid) => {
    const docRef = doc(db, "users", uid);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        set({ userProfile: docSnap.data() });
      } else {
        set({ userProfile: null });
      }
    });
  },
  setUserProfile: (profile) => set({ userProfile: profile }),
}));

export default useUserProfileStore;
