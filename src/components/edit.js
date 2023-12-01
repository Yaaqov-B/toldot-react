import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Rabbi from "./entity";

export default function Edit() {

  const [form, setForm] = useState({});
  const API_URL = process.env.API_URL || "http://localhost:5050";

  const params = useParams();
  const navigate = useNavigate();

  function onChangeForm(value) {
    return setForm((prev) => {
      let newVar = {...prev, ...value};
      console.log('onChangeForm')
      return newVar;
    })
  }

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(API_URL + `/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);


  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      alias: form.alias,
      born: form.born,
      died: form.died,
      birthPlace: form.birthPlace,
      deathPlace: form.deathPlace,
      description: form.description,
      externalLinks: form.externalLinks,
      books: form.books,
      teachers: form.teachers,
      students: form.students,
    };

    // This will send a post request to update the data in the database.
    await fetch(API_URL + `/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // navigate("/");
  }

  const myObject = {
    form: form,
    onChangeForm: onChangeForm,
    onSubmit: onSubmit,
    title: "עדכן רשומה"
  };

  return (
      <div>
        <h3>עדכן רשומה</h3>
        <Rabbi myProp={myObject}/>
      </div>

  );
}


