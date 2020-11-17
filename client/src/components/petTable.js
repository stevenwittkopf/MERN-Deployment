import React, {useState, useEffect} from "react";
import {Link} from "@reach/router";
import axios from "axios";

const urlPrefix = "http://localhost:8000/api/pets/";
const PetTable = () => {
    const [pets, setPets] = useState(null);
    useEffect(() => {
        (async () => {
            try{
                let petsReq = await axios.get(urlPrefix);
                let petList = petsReq.data;
                petList.sort((a, b) => a.type.localeCompare(b.type));
                setPets(petList);
            }
            catch (err){
                console.log(err);
            }
        })();
    }, [pets]);
    const renderTable = () => {
        if (pets === null){
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }
        else if (pets.length === 0){
            return (
                <div>
                    <h3>The shelter is currently empty!</h3>
                </div>
            )
        }
        else {
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet, index) => 
                                <tr key="index">
                                    <td>{pet.name}</td>
                                    <td>{pet.type}</td>
                                    <td>
                                        <Link to={`/pets/${pet._id}`}>details</Link> | <Link to={`/pets/${pet._id}/edit/`}>edit</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }
    };
    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h1>Pet Shelter</h1>
                <Link to="/pets/new/">Add a pet to shelter</Link>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h2>These pets are looking for a good home</h2>
            </div>
            {renderTable()}
        </div>
    )
};

export default PetTable;