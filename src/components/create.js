import React, { useState } from "react";
import {useNavigate } from "react-router";
import Rabbi from "./entity";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        alias: "",
        born: "",
        died: "",
        birthPlace: "",
        deathPlace: "",
        description: "",
        externalLinks: "",
        books: [],
        teachers: [],
        students: [],
    });
    const API_URL = process.env.API_URL || "http://localhost:5050";

    const navigate = useNavigate();

    function onChangeForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        })
    }
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        console.log(newPerson)
        await fetch(API_URL + "record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
            });

        setForm({ name: "", alias: "",  born: "", died: "" , birthPlace: ""  , deathPlace: ""  , description: ""  , externalLinks: ""   ,books: [], teachers: []  , students: []});
        navigate("/");
    }

    const myObject = {
        form: form,
        onChangeForm: onChangeForm,
        onSubmit: onSubmit,
        title: "הוסף רשומה"
    };
    return (
        <div>
            <h3>הוסף רשומה</h3>
            <Rabbi myProp={myObject}/>
        </div>
    );
}

