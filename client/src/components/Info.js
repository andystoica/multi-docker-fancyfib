import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="ui container">
      <p>The additional information page is provided for testing correct routing to the application.</p>
      <Link to="/" className="ui button">
        Back home
      </Link>
    </div>
  );
};
