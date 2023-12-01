import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./search";
import VisualGraph from "./visualGraph";

const API_URL = process.env.API_URL || "http://localhost:5050";

const Record = (props) => (
    <React.Fragment key={props.record._id}>
        <tr>
            <td>
                <button className="btn btn-link" onClick={() => props.handleExpand(props.record)}>
                    {props.record.name}
                </button>
            </td>
            <td>{props.record.alias}</td>
            <td>{props.record.born}</td>
            <td>{props.record.died}</td>
            <td>{props.record.birthPlace}</td>
            <td>{props.record.deathPlace}</td>
            <td>{props.record.description}</td>
            <td>
                {props.record.books ?
                    <ul>
                        {props.record.books.map(book => (
                            <li key={book.title}>{book.title}</li>
                        ))}
                    </ul> : ""
                }
            </td>
            <td>
                {props.teachers ?
                    <ul>
                        {props.teachers.filter(teacher=>teacher != null && teacher._id  != null).map(teacher => (

                            <li key={teacher._id}>
                                {/*<Link className="btn btn-link" to={`/show/${teacher._id}`}>{teacher.name}</Link>*/}
                                <button className="btn btn-link" onClick={() =>  props.setSearchTerm(teacher.name)}>{teacher.name}</button>
                            </li>
                        ))}
                    </ul> : ""
                }
            </td>
            <td>
                {props.students ?
                    <ul>
                        {props.students.filter(student=>student != null && student._id  != null).map(student => (

                            <li key={student._id}>
                                {/*<Link className="btn btn-link" to={`/show/${student._id}`}>{student.name}</Link>*/}
                                <button className="btn btn-link" onClick={() =>  props.setSearchTerm(student.name)}>{student.name}</button>

                            </li>
                        ))}
                    </ul> : ""
                }
            </td>
            <td>
                {props.record.externalLinks ?
                    <Link className="btn btn-link" to={props.record.externalLinks}>עוד מידע</Link>: "1 "
                }
            </td>
            <td>
                <Link className="btn btn-link" to={`/edit/${props.record._id}`}>ערוך</Link> |
                <button className="btn btn-link"
                        onClick={() => {
                            props.deleteRecord(props.record._id);
                        }}
                >
                    מחק
                </button>
            </td>
        </tr>
        {props.expandedId === props.record._id && (
            <tr>
                <td colSpan={12}>
                    <div>
                        <VisualGraph elements={props.elements} />
                    </div>


                </td>


            </tr>
        )}
    </React.Fragment>

);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [expandedRowId, setExpandedRowId] = useState(null);

    const [elements, setElements] = useState({
        'nodes':[],
        'edges':[]
    });


    function setGraph(root){
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
                    if (student && student._id){
                        edges.push({from: rabbi._id, to: student._id});
                        q.push(student);
                    } else {
                        console.log(rabbi.name)
                    }
                        
                    })
                }
            }
        }

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
                        if(teacher && teacher._id){
                            edges.push({from: teacher._id, to: rabbi._id});
                            q.push(teacher);
                        } else {
                            console.log(rabbi.name)
                        }
                
                    })
                }
            }
        }
        setElements({'nodes':nodes, 'edges':edges})
    }

    function handleExpand(rabbi){
        if (expandedRowId === rabbi._id) {
            setExpandedRowId(null);
        } else {
            setExpandedRowId(rabbi._id);
            setGraph(rabbi)
        }
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearSearchInput = () => {
        setSearchTerm('');
    };

    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    records.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return sortOrder === 'asc' ? -1 : 1;
        } else

        if (a[sortField] > b[sortField]) {
            return sortOrder === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    });

    const filteredItems = records.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())  ||
        (item.alias && item.alias.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.birthPlace && item.birthPlace.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.deathPlace && item.deathPlace.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.books && item.books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase())).length>0)
        ||         (item.students && item.students.filter((student) => student && student.name? student.name.toLowerCase().includes(searchTerm.toLowerCase()) : false).length>0)
        ||         (item.teachers && item.teachers.filter((teacher) => teacher && teacher.name? teacher.name.toLowerCase().includes(searchTerm.toLowerCase()): false).length>0)

    );
    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(API_URL + `/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();
    }, [records.length]);

    async function deleteRecord(id) {
        await fetch(API_URL + `/record/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    function find_by_name(student){
        if (!student) return null;
        const res = records.filter((el) =>el.name === student.name);
        return res? res.at(0) : null;
    }

    function recordList() {
        return filteredItems.map((record) => {
            const students_ids = record.students?record.students.map((student) => find_by_name(student)):null;
            record.students=students_ids;
            const teachers_ids = record.teachers?record.teachers.map((teacher) => find_by_name(teacher)):null;
            record.teachers=teachers_ids

            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                    teachers={teachers_ids}
                    students={students_ids}
                    setSearchTerm={setSearchTerm}
                    expandedId = {expandedRowId}
                    handleExpand = {() => handleExpand(record)}
                    elements = {elements}
                />
            );
        });
    }

    return (
        <div >
            <h3>רבנים</h3>
            <SearchBox value={searchTerm} onChange={handleChange} handleClearSearchInput={handleClearSearchInput}/>

            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>
                        <button className="btn "
                                onClick={() => handleSort('name')}>
                            שם
                            {sortField === 'name' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'name' && sortOrder === 'desc' && <span>▾</span>}
                        </button>
                    </th>
                    <th>
                        <button className="btn "
                                onClick={() => handleSort('alias')}>
                            כינוי
                            {sortField === 'alias' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'alias' && sortOrder === 'desc' && <span>▾</span>}
                        </button>
                    </th>
                    <th  >
                        <button className="btn "
                                onClick={() => handleSort('born')}>
                            נולד
                            {sortField === 'born' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'born' && sortOrder === 'desc' && <span>▾</span>}
                        </button>
                    </th>
                    <th >
                        <button className="btn "
                                onClick={() => handleSort('died')}>
                            נפטר
                            {sortField === 'died' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'died' && sortOrder === 'desc' && <span>▾</span>}
                        </button>
                    </th>
                    <th>
                        <button className="btn "
                                onClick={() => handleSort('birthPlace')}>
                            מקום לידה
                            {sortField === 'birthPlace' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'birthPlace' && sortOrder === 'desc' && <span>▾</span>}
                        </button>
                    </th>
                    <th>
                        <button className="btn "
                                onClick={() => handleSort('deathPlace')}>
                            מקום פטירה
                            {sortField === 'deathPlace' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'deathPlace' && sortOrder === 'desc' && <span>▾</span>}
                        </button>
                    </th>
                    <th>תיאור</th>
                    <th>ספריו</th>
                    <th>רבותיו</th>
                    <th>תלמידיו</th>
                    <th>
                        <button className="btn "
                                onClick={() => handleSort('externalLinks')}>
                            הרחבה
                            {sortField === 'externalLinks' && sortOrder === 'asc' && <span> ▴</span>}
                            {sortField === 'externalLinks' && sortOrder === 'desc' && <span>▾</span>}
                        </button>
                    </th>
                    <th>פעולה</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}
