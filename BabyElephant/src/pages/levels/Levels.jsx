import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './levels.css';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const Levels = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onPageLoad = () => {
      var isLogged = ReactSession.get('isLogged');
      if (!isLogged) {
        window.alert('Not Logged In');
        navigate('/login');
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [navigate]);

  const handleLogout = () => {
    ReactSession.set('isLogged', false); // Optionally clear session
    navigate('/'); // Redirect to Home page or correct path
  };

  return (
    <div className="levels">
      <form id="levelForm">
        <h2 id="d">BABY ELEPHANT</h2>
        <h2 id="e">Forest Math Mission</h2>
        <Link to="/game">
          <button id="Easy-btn">Game Start</button>
        </Link>
        <button id="Medium-btn" onClick={handleLogout}>Log Out</button>
        <div className="imgs" />
      </form>
    </div>
  );
}

export default Levels;
