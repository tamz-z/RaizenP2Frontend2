import React, { useEffect, useState } from "react";
import PrivacyToggle from "../components/PrivacyToggle";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../store/authStore";

const SettingsPage = () => {
  const { user: authUser } = useAuth();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlockedUsers = async () => {
    if (!authUser) return;
    setLoading(true);
    try {
      const blockListRef = collection(db, "users", authUser.uid, "blockList");
      const blockListSnapshot = await getDocs(blockListRef);
      const blocked = [];
      for (const docSnap of blockListSnapshot.docs) {
        blocked.push({ id: docSnap.id, ...docSnap.data() });
      }
      setBlockedUsers(blocked);
    } catch (error) {
      console.error("Error fetching blocked users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, [authUser]);

  const unblockUser = async (userId) => {
    if (!authUser) return;
    try {
      const blockDocRef = doc(db, "users", authUser.uid, "blockList", userId);
      await deleteDoc(blockDocRef);
      setBlockedUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Instellingen</h2>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Gebruikers blokkeren</h3>
        {loading ? (
          <p>Laden...</p>
        ) : blockedUsers.length === 0 ? (
          <p>Je hebt geen geblokkeerde gebruikers.</p>
        ) : (
          <ul>
            {blockedUsers.map((user) => (
              <li key={user.id} className="flex justify-between items-center mb-2">
                <span>{user.username || user.id}</span>
                <button
                  onClick={() => unblockUser(user.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Deblokkeren
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SettingsPage;
