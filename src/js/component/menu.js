import React from "react";
import { Link } from "react-router-dom";

const MiniMenu = () => (
  <div className="d-flex justify-content-center my-3">
    <Link to="/" className="btn btn-outline-primary mx-1">Characters</Link>
    <Link to="/vehicles" className="btn btn-outline-primary mx-1">Vehicles</Link>
    <Link to="/planets" className="btn btn-outline-primary mx-1">Planets</Link>
  </div>
);

export default MiniMenu;
