import React, { useEffect, useState } from "react"; 
import Card from "./card";

const List = ({ type }) => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}`);
        const data = await res.json();
        setItems(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [type]);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 15);
  };

  const currentItems = items.slice(0, visibleItems);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {currentItems.map((item) => (
          <div className="col-md-4 d-flex justify-content-center" key={item.uid}>
            <Card item={item} type={type} />
          </div>
        ))}
      </div>
      {visibleItems < items.length && (
        <div className="text-center my-3">
          <button className="btn btn-primary" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
