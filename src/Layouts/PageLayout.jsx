import React from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.js";

// Layout containers
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  height: 100vh;
`;

const SidebarContainer = styled.aside`
  width: ${({ collapsed }) => (collapsed ? "70px" : "240px")};
  transition: width 0.3s ease;
`;

const ContentContainer = styled.main`
  flex: 1;
  width: ${({ collapsed }) =>
    collapsed ? "calc(100% - 70px)" : "calc(100% - 240px)"};
  margin: 0 auto;
  padding: 16px;
`;

// Spinner animation
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: #333;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Centered = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PageLayoutSpinner = () => (
  <Centered>
    <Spinner />
  </Centered>
);

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);

  const showSidebar = pathname !== "/auth" && user;
  const showNavbar = !user && !loading && pathname !== "/auth";
  const checkingAuth = !user && loading;
  const collapsed = showSidebar && window.innerWidth < 768;

  if (checkingAuth) return <PageLayoutSpinner />;

  return (
    <LayoutWrapper column={showNavbar}>
      {showSidebar && (
        <SidebarContainer collapsed={collapsed}>
          <Sidebar />
        </SidebarContainer>
      )}
      {showNavbar && <Navbar />}
      <ContentContainer collapsed={showSidebar}>
        {children}
      </ContentContainer>
    </LayoutWrapper>
  );
};

export default PageLayout;
