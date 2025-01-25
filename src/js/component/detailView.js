import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                const data = await res.json();
                setDetails(data.result.properties);

                let imgType;
                switch (type) {
                    case "people":
                        imgType = "characters";
                        break;
                    case "vehicles":
                        imgType = "vehicles";
                        break;
                    case "planets":
                        imgType = "planets";
                        break;
                    default:
                        imgType = "characters";
                        break;
                }

                const imageUrl = `https://starwars-visualguide.com/assets/img/${imgType}/${id}.jpg`;

                const imgRes = await fetch(imageUrl);

                if (imgRes.status === 404) {
                    setImageUrl("https://via.placeholder.com/400"); // Imagen de respaldo
                } else {
                    setImageUrl(imageUrl);
                }

                if (type === "people") {
                    setAdditionalInfo([
                        { label: "Appearances", value: data.result?.properties?.films?.join(", ") || "No data available" },
                        { label: "Affiliations", value: data.result?.properties?.affiliations?.join(", ") || "No data available" },
                        { label: "Locations", value: data.result?.properties?.locations?.join(", ") || "No data available" },
                        { label: "Gender", value: data.result?.properties?.gender || "No data available" },
                        { label: "Dimensions", value: data.result?.properties?.dimensions || "No data available" },
                        { label: "Species", value: data.result?.properties?.species?.join(", ") || "No data available" },
                        { label: "Vehicles", value: data.result?.properties?.vehicles?.join(", ") || "No data available" },
                        { label: "Weapons", value: data.result?.properties?.weapons?.join(", ") || "No data available" },
                        { label: "Tool", value: data.result?.properties?.tool || "No data available" },
                    ]);
                } else if (type === "planets") {
                    setAdditionalInfo([
                        { label: "Residents", value: data.result?.properties?.residents?.join(", ") || "No data available" },
                        { label: "Related Films", value: data.result?.properties?.films?.join(", ") || "No data available" },
                    ]);
                } else if (type === "vehicles") {
                    setAdditionalInfo([
                        { label: "Related Films", value: data.result?.properties?.films?.join(", ") || "No data available" },
                        { label: "Related Pilots", value: data.result?.properties?.pilots?.length > 0 ? data.result.properties.pilots.join(", ") : "There are no related items for this category" },
                    ]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetails();
    }, [type, id]);

    if (!details) return <div>Loading...</div>;


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <img
                        src={imageUrl}
                        className="img-fluid"
                    />
                </div>
                <div className="col">
                    <h1>{details.name}</h1>
                    <p>{Object.entries(details).map(([key, value]) => (
                        <li key={key} className="list-group-item">
                            <strong>{key.replace("_")}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                        </li>
                    ))}</p>
                </div>
            </div>
            {additionalInfo && (
                <div className="row">
                    {additionalInfo.map(info => (
                        <div key={info.label} className="col-md-2">
                            <h4>{info.label}</h4>
                            <p>{info.value}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-2">
                    <Link to={`/`} className="btn btn-primary">
                        Back to home
                    </Link>
                </div>
                <div className="col-md-6"></div>
            </div>
        </div>
    );
};

export default Detail;

