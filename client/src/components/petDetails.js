import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
import axios from "axios";

const urlPrefix = "http://localhost:8000/api/pets/";
const PetDetails = (props) => {
    const [pet, setPet] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                let petReq = await axios.get(`${urlPrefix}${props.id}/`);
                setPet(petReq.data);
            }
            catch (err){
                console.log(err);
            }
        })();
    }, [pet, props.id]);
    const adoptHandler = async (e) => {
        try {
            await axios.delete(`${urlPrefix}${props.id}/delete/`);
            navigate("/");
        }
        catch (err){
            console.log(err);
        }
    }
    const likeHandler = async () => {
        try {
            await axios.patch(`${urlPrefix}${props.id}/like/`);
            setIsLiked(true);
        }
        catch (err){
            console.log(err);
        }
    }
    const renderPet = () => {
        if (pet === null){
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            );
        }
        else {
            return (
                <>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <h2>Details about: {pet.name}</h2>
                        <button onClick={adoptHandler} style={{
                            backgroundColor: "red",
                            color: "white"
                        }}>Adopt {pet.name}</button>
                    </div>
                    <div style={{
                        borderStyle: "solid"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "left"
                        }}>
                            <div><h4>Pet type:</h4></div>
                            <div><p>{pet.type}</p></div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "left"
                        }}>
                            <div><h4>Description:</h4></div>
                            <div><p>{pet.description}</p></div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "left"
                        }}>
                            <div><h4>Skills:</h4></div>
                            <div>
                                {pet.skills.length === 0 ?
                                    <p>--no skills--</p> :
                                    pet.skills.map((skill, index) => <p key={index}>{skill}</p>)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        {isLiked ?
                            <button disabled style={{
                                backgroundColor: "grey",
                                color: "white"
                            }}>Like</button> :
                            <button onClick={likeHandler} style={{
                                backgroundColor: "green",
                                color: "white"
                            }}>Like</button>
                        }
                            <p>Likes: {pet.likes}</p>
                    </div>
                </>
            )
        }
    };
    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h1>Pet Shelter</h1>
                <Link to="/">Back to home</Link>
            </div>
            {renderPet()}
        </div>
    )
};

export default PetDetails;