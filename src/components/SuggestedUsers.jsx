const SuggestedUsers = () => {
  // Placeholder suggested users list
  const users = [
    { id: 1, username: "user1", avatar: "/profilepic.png" },
    { id: 2, username: "user2", avatar: "/profilepic.png" },
    { id: 3, username: "user3", avatar: "/profilepic.png" },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-md p-4 shadow-md max-w-xs">
      <h2 className="text-lg font-semibold mb-4">Suggested Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-700">{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUsers;
