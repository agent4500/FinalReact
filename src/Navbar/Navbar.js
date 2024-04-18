import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './Navbar.css'; // Import custom CSS for Navbar

const Navbar = () => {
  const { pathname } = useLocation();

  // Define a spring for button click animation
  const [props, set] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 20 },
  }));

  return (
    <nav className="navbar">
      <div className="container mx-auto">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              <animated.span
                onMouseDown={() => set({ scale: 0.9 })}
                onMouseUp={() => set({ scale: 1 })}
                style={{ scale: props.scale }}
                className="button"
              >
                Home
              </animated.span>
            </Link>
          </li>
          <li>
            <Link to="/login" className={`nav-link ${pathname === '/login' ? 'active' : ''}`}>
              <animated.span
                onMouseDown={() => set({ scale: 0.9 })}
                onMouseUp={() => set({ scale: 1 })}
                style={{ scale: props.scale }}
                className="button"
              >
                Login
              </animated.span>
            </Link>
          </li>
          <li>
            <Link to="/register" className={`nav-link ${pathname === '/register' ? 'active' : ''}`}>
              <animated.span
                onMouseDown={() => set({ scale: 0.9 })}
                onMouseUp={() => set({ scale: 1 })}
                style={{ scale: props.scale }}
                className="button"
              >
                Register
              </animated.span>
            </Link>
          </li>
          <li>
            <Link to="/add-post" className={`nav-link ${pathname === '/add-post' ? 'active' : ''}`}>
              <animated.span
                onMouseDown={() => set({ scale: 0.9 })}
                onMouseUp={() => set({ scale: 1 })}
                style={{ scale: props.scale }}
                className="button"
              >
                Add Post
              </animated.span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
