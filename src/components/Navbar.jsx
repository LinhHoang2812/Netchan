import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const [isToggle, setToggle] = useState(false);
  const [isScrollHeight, setScrollHeight] = useState(false);
  const { displaySearch, setSearch } = useGlobalContext();
  const refContainer = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.pageYOffset > refContainer.current.getBoundingClientRect().bottom
      ) {
        setScrollHeight(true);
        return;
      }
      setScrollHeight(false);
    });
  }, [isScrollHeight]);
  const handleNavbar = (e) => {
    if (
      !e.target.classList.contains("icon") &&
      !e.target.classList.contains("nav-link") &&
      !e.target.classList.contains("input") &&
      !e.target.classList.contains("search-btn") &&
      !e.target.classList.contains("input-container")
    ) {
      setSearch(false);
    }
  };
  const handleChangeInput = (e) => {
    const searchTerm = e.target.form.elements.search.value;
    if (!searchTerm) {
      navigate(`/`);
    }
  };
  const handleSubmit = (e) => {
    const searchTerm = e.target.elements.search.value;
    e.preventDefault();
    navigate(`/search?search=${searchTerm}`);
  };

  return (
    <Wrapper
      onClick={isHome && handleNavbar}
      ref={refContainer}
      style={{
        backgroundColor: isScrollHeight ? "#1e1e1e" : "transparent",
      }}
    >
      <div className="nav-center">
        <div className="nav-left">
          <button>
            <FaBars
              className="icon bar"
              onClick={() => {
                setToggle(!isToggle);
              }}
            />
          </button>
          <div className="logo">NETCHAN</div>
          <div className="nav-links">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            {/* <NavLink to="/list" className="nav-link">
              Your List
            </NavLink> */}
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </div>
        </div>
        <div className="nav-right">
          {displaySearch && (
            <form
              className="input-container"
              style={{ height: "33px", width: "290px" }}
              onSubmit={handleSubmit}
            >
              <button type="submit" className="search-btn">
                <FaSearch className="icon" />
              </button>

              <input
                type="text"
                className="input"
                placeholder="anime name..."
                name="search"
                onChange={handleChangeInput}
                autoFocus
              />
            </form>
          )}
          {displaySearch || (
            <button
              className="nav-search-btn"
              onClick={() => {
                setSearch(true);
              }}
            >
              <FaSearch className="icon" />
            </button>
          )}
        </div>
      </div>
      <aside className={isToggle ? "sidebar show-sidebar" : "sidebar"}>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </aside>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: ease 0.5ms;
  z-index: 5;
  .bar {
    display: none;
  }
  .sidebar {
    display: none;
  }
  .nav-center {
    margin: 0 2rem;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    font-size: 3rem;
    font-weight: bold;
    color: red;
    transform: skew(-10deg) scale(0.8, 0.5);
    justify-self: start;
  }
  button {
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
  }
  a {
    color: #cdc8c8;
    text-decoration: none;
    margin-right: 1rem;
    font-size: 0.9rem;
  }
  .active {
    color: white;
  }
  .nav-left {
    display: flex;
    align-items: center;
    /* gap: 5rem; */
  }
  .nav-right {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .nav-links {
    display: flex;
    gap: 0.5rem;
  }
  .input-container {
    width: 0;
    height: 0;
    transition: width 0.5s ease position 0.5s ease;
    border: 1px solid white;
    background-color: black;
    overflow: hidden;
    display: flex;
    column-gap: 0.5rem;
    align-items: center;
    padding-left: 0.2rem;
  }
  .input {
    width: 100%;
    height: 100%;
    color: white;
    font-size: 0.9rem;
    background-color: transparent;
    border: none;
  }
  .icon {
    font-size: 1.4rem;
    color: #cdc8c8;
    cursor: pointer;
  }
  button {
    color: white;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    .logo {
      font-size: 2rem;
    }
    .logo .icon {
      font-size: 1rem;
    }
    .nav-links {
      display: none;
    }
    .bar {
      display: block;
      margin-right: 0;
    }

    .sidebar {
      padding: 3rem 2rem;
      display: flex;
      row-gap: 1rem;
      flex-direction: column;
      position: absolute;
      left: 0;
      top: 3rem;
      width: 40%;
      min-height: 100vh;
      transform: translateX(-100%);
      transition: ease-in-out 0.5ms;
      background-color: #1e1e1e;
    }
    .show-sidebar {
      transform: translateX(0);
    }
    .nav-center {
      margin: 0;
    }
    .input-container {
      width: 80% !important;
      height: 25px !important;
    }
    .icon {
      font-size: 1.2rem;
    }
    input {
      font-size: 0.9rem;
    }
  }
`;
