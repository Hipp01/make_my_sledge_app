import front from "../../assets/images/front.png";
import frontmiddle from "../../assets/images/front;middle.png";
import middle from "../../assets/images/middle.png";
import middleback from "../../assets/images/middle;back.png";
import back from "../../assets/images/back.png";
import dogsled from "../../assets/images/dogsled.jpg";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import PropTypes from 'prop-types';
import { hexToBase64, calculateAge } from "../../utils/utils";


export default function CardDog({ dog }) {

    CardDog.propTypes = {
    dog: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        photo: PropTypes.string,
        sex: PropTypes.bool.isRequired,
        place: PropTypes.string.isRequired,
        date_of_birth: PropTypes.string.isRequired,
    }).isRequired,
    };

    const birthDay = dog.date_of_birth.split("T")[0].slice(5);
    const today = new Date().toISOString().slice(5, 10);

    return (
        <div className="card">
            {dog.photo ? (
                <img
                    className="card-img-top img-fluid"
                    src={`data:image/jpeg;base64,${hexToBase64(dog.photo)}`}
                    alt={`${dog.name}'s photo`}
                />
            ) : (
                <p>No photo available</p>
            )}
            <div className="card-body">
                <h2 className="card-title text-center">{dog.name == "Aylo" ? "Aÿlo" : dog.name}</h2>
                <div className="card-img-overlay" style={{ padding:"10px", height:"50px" }}>
                    <img src={dog.sex == 0 ? female : male} style={{ width: "40px", float: "inline-end", backgroundColor:"white", padding:"5px", borderRadius: "5px"}}/>
                    {birthDay === today ? (
                        <h5 className="badge bg-info ms-2">Birthday 🎉🎉</h5>
                    ) : null}
                </div>
                <div className="card-img">
                    <img
                        src={
                            dog.place === "front" ? front :
                            dog.place === "front;middle" ? frontmiddle :
                            dog.place === "middle" ? middle :
                            dog.place === "middle;back" ? middleback :
                            dog.place === "back" ? back :
                            dogsled 
                        }
                        alt={dog.place.split(";").map( str => str.charAt(0).toUpperCase() + str.slice(1)).join(" & ")}
                        className="img-fluid"
                    />

                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mt-2">
                    <h5 className="mt-1 ms-lg-3">{calculateAge(dog.date_of_birth)} years</h5>
                    <a href={`/dogs/${dog.id}`} className="btn btn-primary px-3">See</a>
                </div>
            </div>
        </div>
    );
}
