import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scoreboard.css';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const Scoreboard = () => {
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

  // Leave userScores empty for an empty scoreboard
  const userScores = [];

  return (
    <div className="scoreboard">
      <form id="scoreboardForm">
        <h2 id="topic">Scoreboard</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {userScores.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/game">
          <button id="back-btn">Back</button>
        </Link>
      </form>
      <div className="imags" />
    </div>
  );
};

export default Scoreboard;
