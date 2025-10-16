import { useAuth } from "../components/auth-context";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      className="btn btn-secondary"
      id="btn-logout"
      type="submit"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
