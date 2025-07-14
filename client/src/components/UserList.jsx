const UserList = ({ users }) => {
  return (
    <ul className="space-y-1">
      {users.map((user) => (
        <li key={user.id} className="text-sm">
          🟢 {user.username}
        </li>
      ))}
    </ul>
  );
};

export default UserList;