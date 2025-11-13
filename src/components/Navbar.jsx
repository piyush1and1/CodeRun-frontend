import React, { useState } from 'react';
import { Menu, X, Code2, User, LogOut, LogIn, LayoutPanelLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import toast, { Toaster } from 'react-hot-toast';

/**
 * Fixed Navbar with Glassmorphism Design + Real Functionality
 */
function Navbar({ user, setUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const NavLink = ({ to, children, icon: Icon }) => (
    <button
      onClick={() => {
        navigate(to);
        setIsMobileMenuOpen(false);
      }}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-black/5 hover:text-gray-900 md:text-base"
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );

  const LogoutButton = () => (
    <button
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-500 hover:to-purple-500 hover:scale-105 md:w-auto md:text-base"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );

  return (
    <>
      <Toaster />
      {/* ✅ Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-[1000] border-b border-white/20 bg-white/40 shadow-sm backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-2xl font-bold text-gray-900 transition-opacity hover:opacity-80"
              >
                <Code2 className="h-7 w-7 text-indigo-600" />
                CodeRun
              </button>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <NavLink to="/editor" icon={LayoutPanelLeft}>Editor</NavLink>
              {user ? (
                <>
                  <NavLink to="/profile" icon={User}>Profile</NavLink>
                  <LogoutButton />
                </>
              ) : (
                <NavLink to="/login" icon={LogIn}>Login</NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-black/10 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="space-y-1 border-b border-white/20 bg-white/40 px-2 pb-3 pt-2 backdrop-blur-lg md:hidden" id="mobile-menu">
            <NavLink to="/editor" icon={LayoutPanelLeft}>Editor</NavLink>
            {user ? (
              <>
                <NavLink to="/profile" icon={User}>Profile</NavLink>
                <LogoutButton />
              </>
            ) : (
              <NavLink to="/login" icon={LogIn}>Login</NavLink>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
