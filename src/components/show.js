import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import Rabbi from "./entity-view";
import VisualGraph from "./visualGraph";

export default function Show() {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState([]);

  const [form, setForm] = useState({});
  const API_URL = process.env.API_URL || "http://localhost:5050";

  const params = useParams();
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(false);
  const elements = useRef({
    'nodes':[],
    'edges':[]
  });

  const handleToggle = () => {
      setGraph(record)

      setShowDiv((prevShowDiv) => !prevShowDiv);
  };

  function find_by_name(items, student){
    const res = items.filter((el) =>el.name === student.name);
    return res? res.at(0) : null;
  }


  function normalizedRecords(items){
    return items.map((record)=>{
      record.students=record.students? record.students.map((student) => find_by_name(items, student)): null;
      record.teachers=record.teachers? record.teachers.map((teacher) => find_by_name(items, teacher)): null;
      return record
    });
  }

  function setGraph(root){
    root = find_by_name(records, root);
    const q = [];
    const visited = {};
    const nodes = [];
    const edges = [];
    q.push(root);
    while(q.length>0){
        const rabbi = q.shift();
        if (!visited[rabbi._id]){
            visited[rabbi._id] = true;
            nodes.push({id: rabbi._id, label: rabbi.name, title: rabbi.died});
            if (rabbi.students){
              rabbi.students.map(student=>{
                edges.push({from: rabbi._id, to: student._id});
                q.push(student);
              })
            }
        }
    }

    // q.push(root);
    if(root.teachers){
      root.teachers.map(teacher=>{
        edges.push({from: teacher._id, to: root._id});
        q.push(teacher);
      })
    }
    while(q.length>0){
      const rabbi = q.shift();
      console.log(rabbi)
      if (!visited[rabbi._id]){
        visited[rabbi._id] = true;
        nodes.push({id: rabbi._id, label: rabbi.name, title: rabbi.died});
        if (rabbi.teachers){
          rabbi.teachers.map(teacher=>{
            edges.push({from: teacher._id, to: rabbi._id});
            q.push(teacher);
          })
        }
      }
    }

    elements.current = {'nodes':nodes, 'edges':edges}
  }

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(API_URL + `record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const res = await response.json();
      const normalized = normalizedRecords(res);

      setRecords(normalized);
    }

    getRecords();
  }, [records.length]);


  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(API_URL + `/${params.id.toString()}`);

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
      console.log(record)
      setRecord(record);
      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);


  const myObject = {
    form: form,
    setForm: setForm,
  };
  return (
      <div>
        <h3> רשומה</h3>
        <Rabbi myProp={myObject}/>
        <div>
          <button onClick={handleToggle}>גרף</button>
          {showDiv && <div>
            <VisualGraph elements={elements.current} />
          </div>}
        </div>
      </div>


  );
}


