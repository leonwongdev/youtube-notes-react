import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        CS Video Vault - A place for comp sci video notes
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Video
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
