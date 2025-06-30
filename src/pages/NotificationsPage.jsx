import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import useAuthStore from "../store/authStore";

const NotificationsPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!authUser) return;

    const notificationsRef = collection(db, "users", authUser.uid, "notifications");
    const q = query(notificationsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, [authUser]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Notificaties</h2>
      {notifications.length === 0 ? (
        <p>Geen nieuwe notificaties.</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id} className="border-b py-2">
              <p>{notif.message}</p>
              <small className="text-gray-500">{new Date(notif.createdAt?.toDate()).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
