import front from "../../assets/front.png";
import frontmiddle from "../../assets/front;middle.png";
import middle from "../../assets/middle.png";
import middleback from "../../assets/middle;back.png";
import back from "../../assets/back.png";
import dogsled from "../../assets/dogsled.jpg";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import PropTypes from 'prop-types';


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
        <div className="card" style={{ width: "18rem" }}>
            {dog.photo ? (
                <img
                    className="card-img-top"
                    src={`data:image/jpeg;base64,${hexToBase64(dog.photo)}`}
                    alt={`${dog.name}'s photo`}
                />
            ) : (
                <p>No photo available</p>
            )}
            <div className="card-body">
                <h2 className="card-title text-center">{dog.name == "Aylo" ? "Aÿlo" : dog.name}</h2>
                <div className="card-img-overlay" style={{ padding:"10px"}}>
                    <img src={dog.sex == 0 ? female : male} style={{ width: "40px", float: "inline-end", backgroundColor:"white", padding:"5px", borderRadius: "5px"}}/>
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
                        style={{ width: "260px" }}
                    />

                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <h5 className="mt-1 ms-lg-3">{calculateAge(dog.date_of_birth)} years</h5>
                    {birthDay === today ? (
                        <h5 className="badge bg-info mt-2">Birthday 🎉🎉</h5>
                    ) : null}
                    <a href={`/dogs/${dog.id}`} className="btn btn-primary px-3">See</a>
                </div>
            </div>
        </div>
    );
}

const hexToBase64 = (hex) => {
    const binaryString = hex.match(/\w{2}/g).map(char => {
        return String.fromCharCode(parseInt(char, 16));
    }).join('');
    return btoa(binaryString);
};

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}