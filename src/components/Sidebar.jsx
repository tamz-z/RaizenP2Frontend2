import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import PropTypes from "prop-types";
import styled from "styled-components";

const SidebarContainer = styled.div`
  height: 100vh;
  width: 5rem;
  @media(min-width: 768px) {
    width: 15rem;
  }
  border-right: 1px solid #d1d5db; /* Tailwind gray-300 */
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem 0.5rem 2rem 1.5rem;
  position: sticky;
  top: 0;
`;

const LogoWrapper = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;
  @media(min-width: 768px) {
    justify-content: flex-start;
  }
`;

const LogoLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937; /* Tailwind gray-800 */
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
`;

const NavLink = styled(Link)`
  color: #374151; /* Tailwind gray-700 */
  text-align: center;
  @media(min-width: 768px) {
    text-align: left;
  }
  text-decoration: none;
  font-weight: 500;
  &:hover {
    color: #111827; /* Tailwind gray-900 */
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  @media(min-width: 768px) {
    justify-content: flex-start;
  }
  gap: 0.5rem;
  color: #dc2626; /* Tailwind red-600 */
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: #991b1b; /* Tailwind red-800 */
  }
  outline: none;
`;

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <SidebarContainer>
      <LogoWrapper>
        <LogoLink to="/">Raizen</LogoLink>
      </LogoWrapper>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </Nav>
      <LogoutButton onClick={handleLogout}>
        <BiLogOut size={24} />
        <span className="hidden md:inline">Logout</span>
      </LogoutButton>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  onLogout: PropTypes.func,
};

export default Sidebar;
