import React from 'react'; 
import {Link} from 'react-router-dom';
import { useAppContext } from '../store/blogContext'; 

const Navbar = () => {
  const { favorites, removeFavorite } = useAppContext();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">Star Wars Encyclopedia</Link>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          Favorites {favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {favorites.map((fav) => ( 
            <li key={fav.uid} className="dropdown-item d-flex justify-content-between"> 
              <Link to={`/${fav.type}/${fav.uid}`} className="text-decoration-none">{fav.name}</Link> 
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFavorite(fav.uid)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
