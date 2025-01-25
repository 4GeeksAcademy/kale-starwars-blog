import React from "react"; 
import { Link } from "react-router-dom"; 
import { useAppContext } from "../store/blogContext";

const Card = ({ item, type }) => {
  const { addFavorite } = useAppContext();

const getImageUrl = (type, uid) => {
    let baseUrl = "https://starwars-visualguide.com/assets/img/";
    switch (type) {
      case "people":
        baseUrl = "https://starwars-visualguide.com/assets/img/characters/";
        break;
      case "vehicles":
        baseUrl = "https://starwars-visualguide.com/assets/img/vehicles/";
        break;
      case "planets":
        baseUrl = "https://starwars-visualguide.com/assets/img/planets/";
        break;
      default:
        break;
    }
    return `${baseUrl}${uid}.jpg`;
  };

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img
        src={getImageUrl(type, item.uid)}
        className="card-img-top"
        alt={item.name}
        onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg")}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <Link to={`/${type}/${item.uid}`} className="btn btn-primary">
          Learn More
        </Link>
        <button
          className="btn btn-warning ms-2"
          onClick={() => addFavorite({ ...item, type })}
        >
          ❤️
        </button>
      </div>
    </div>
  ); 
};

export default Card;
