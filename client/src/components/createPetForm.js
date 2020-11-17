import React, {useState} from "react";
import {Link, navigate} from "@reach/router";
import axios from "axios";

const urlPrefix = "http://localhost:8000/api/pets/";
const CreatePetForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [petType, setPetType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        let skills = [];
        if (skill1.length > 0){
            skills.push(skill1);
        }
        if (skill2.length > 0){
            skills.push(skill2);
        }
        if (skill3.length > 0){
            skills.push(skill3);
        }
        try {
            await axios.post(`${urlPrefix}create/`, {
                name,
                type: petType,
                description,
                skills
            })
            navigate("/")
        }
        catch (err){
            setErrors(Object.values(err.response.data.errors).map(error => error.message));
        }
    };
    const renderErrors = () => {
        if (errors.length === 0){
            return "";
        }
        else {
            return (
                <div>
                    <ul>
                        {errors.map((error, index) =>
                            <li key={index}>{error}</li>
                        )}
                    </ul>
                </div>
            )
        }
    }
    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h1>Pet Shelter</h1>
                <Link to="/">Return to home</Link>
            </div>
            <div>
                <h3>Know a pet needing a home?</h3>
            </div>
            <div style={{
                borderStyle: "solid"
            }}>
                <form onSubmit={submitHandler}>
                    {renderErrors()}
                    <p>
                        <label>Pet Name: </label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </p>
                    <p>
                        <label>Pet Type: </label>
                        <input type="text" value={petType} onChange={(e)=>setPetType(e.target.value)}/>
                    </p>
                    <p>
                        <label>Description: </label>
                        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </p>
                    <h4>Skills: (Optional)</h4>
                    <p>
                        <label>Skill 1: </label>
                        <input type="text" value={skill1} onChange={(e)=>setSkill1(e.target.value)}/>
                    </p>
                    <p>
                        <label>Skill 2: </label>
                        <input type="text" value={skill2} onChange={(e)=>setSkill2(e.target.value)}/>
                    </p>
                    <p>
                        <label>Skill 3: </label>
                        <input type="text" value={skill3} onChange={(e)=>setSkill3(e.target.value)}/>
                    </p>
                    <button type="submit" style={{
                        backgroundColor: "blue",
                        color: "white"
                    }}>Add Pet</button>
                </form>
            </div>
        </div>
    )
};

export default CreatePetForm;