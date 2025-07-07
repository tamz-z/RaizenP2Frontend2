import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import useLogout from "../hooks/useLogout";
import useLogin from "../hooks/useLogin";

const Nav = styled.nav`
  background-color: white;
  border-bottom: 1px solid #d1d5db; /* Tailwind gray-300 */
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937; /* Tailwind gray-800 */
  text-decoration: none;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  display: none;
  color: #374151; /* Tailwind gray-700 */
  @media (min-width: 640px) {
    display: inline;
  }
`;

const UserImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  object-fit: cover;
`;

const LogoutButton = styled.button`
  background-color: #dc2626; /* Tailwind red-600 */
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  &:hover:enabled {
    background-color: #b91c1c; /* Tailwind red-700 */
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AuthLink = styled(Link)`
  color: #2563eb; /* Tailwind blue-600 */
  text-decoration: none;
  margin-left: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const { user } = useLogin();
  const { logout, loading } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Nav>
      <LogoLink to="/">Raizen</LogoLink>
      <UserSection>
        {user ? (
          <>
            <UserImage src={user.photoURL || "/profilepic.png"} alt={user.displayName || "User"} />
            <UserName>{user.displayName || user.email}</UserName>
            <LogoutButton onClick={logout} disabled={loading}>
              Uitloggen
            </LogoutButton>
          </>
        ) : (
          <>
            <AuthLink to="/login">Inloggen</AuthLink>
            <AuthLink to="/signup">Registreren</AuthLink>
          </>
        )}
      </UserSection>
    </Nav>
  );
};

export default Navbar;
