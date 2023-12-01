import React, {useState} from "react";


export default function Rabbi(props){
    function updateForm(value) {
        return props.myProp.onChangeForm(value);
    }

    const [newBookTitle, setNewBookTitle] = useState(
        ""
    );

    function addBook() {
        const newBook = {
            title: newBookTitle,
        };
        return props.myProp.form.books ?
            updateForm({ books: [...props.myProp.form.books, newBook]})
            :updateForm({ books: [ newBook]})
    }

    function removeBook(item){
        const newBooks = props.myProp.form.books.filter(value => value.title !== item)
        updateForm({books:newBooks})
    }

    const [newStudentName, setNewStudentName] = useState(
        ""
    );

    function addStudent() {
        const newStudent = {
            name: newStudentName,
        };
        return props.myProp.form.students ?
            updateForm({ students: [...props.myProp.form.students, newStudent]})
            :updateForm({ students: [ newStudent]})
    }

    const removeStudent =(item) =>{
        // console.log(item)
        const newStudents = props.myProp.form.students.filter(value => {
            return (value.name !== item)
        })
        updateForm({students:newStudents})
    }

    const [newTeacherName, setNewTeacherName] = useState(
        ""
    );

    function addTeacher() {
        const newTeacher = {
            name: newTeacherName,
        };
        return props.myProp.form.teachers ?
            updateForm({ teachers: [...props.myProp.form.teachers, newTeacher]})
            :updateForm({ teachers: [ newTeacher]})
    }

    const removeTeacher = (item) => {
        const newTeachers = props.myProp.form.teachers.filter(value => value.name !== item)
        updateForm({teachers:newTeachers})
    }

    return(

        <form onSubmit={props.myProp.onSubmit}>
            <div className="form-group w-25">
                <label htmlFor="name">שם: </label>
                <input
                    type="text"
                    className="form-control "
                    id="name"
                    value={props.myProp.form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="alias">כינוי: </label>
                <input
                    type="text"
                    className="form-control"
                    id="alias"
                    value={props.myProp.form.alias}
                    onChange={(e) => updateForm({ alias: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="born">נולד: </label>
                <input
                    type="text"
                    className="form-control"
                    id="born"
                    value={props.myProp.form.born}
                    onChange={(e) => updateForm({ born: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="died">נפטר: </label>
                <input
                    type="text"
                    className="form-control"
                    id="died"
                    value={props.myProp.form.died}
                    onChange={(e) => updateForm({ died: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="birthPlace">מקום לידה: </label>
                <input
                    type="text"
                    className="form-control"
                    id="birthPlace"
                    value={props.myProp.form.birthPlace}
                    onChange={(e) => updateForm({ birthPlace: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="deathPlace">מקום פטירה: </label>
                <input
                    type="text"
                    className="form-control"
                    id="deathPlace"
                    value={props.myProp.form.deathPlace}
                    onChange={(e) => updateForm({ deathPlace: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="description">תיאור: </label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={props.myProp.form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <label htmlFor="externalLinks">קישורים: </label>
                <input
                    type="text"
                    className="form-control"
                    id="externalLinks"
                    value={props.myProp.form.externalLinks}
                    onChange={(e) => updateForm({ externalLinks: e.target.value })}
                />
            </div>
            <div className="form-group w-25">
                <h4>ספריו: </h4>
                {props.myProp.form.books ?
                    <ul className="list-group" id="books">
                        {props.myProp.form.books.map(book => (
                            <li className="list-group-item  " key={book.title} >
                                {/*<button onClick={() => removeBook(book.title)}> X </button>*/}
                                <input
                                    type="button"
                                    value="X"
                                    className="btn btn-secondary"
                                    onClick={()=>removeBook(book.title)}
                                />
                                {book.title}
                            </li>
                        ))}
                    </ul> : ""
                }
                <input
                    type="text"
                    className="form-control"
                    id="add_book"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                />
                <input
                    type="button"
                    value="הוסף ספר"
                    className="btn btn-secondary"
                    onClick={addBook}
                />
            </div>
            <div className="form-group w-25">
                <h4>רבותיו: </h4>

                {props.myProp.form.teachers ?
                    <ul className="list-group" id="teachers">
                        {props.myProp.form.teachers.map(teacher => (
                            <li className="list-group-item  " key={teacher.name} >
                                {/*<button onClick={() => removeTeacher(teacher.name)}> X </button>*/}
                                <input
                                    type="button"
                                    value="X"
                                    className="btn btn-secondary"
                                    onClick={()=>removeTeacher(teacher.name)}
                                />
                                {teacher.name}
                            </li>
                        ))}
                    </ul> : ""
                }
                <input
                    type="text"
                    className="form-control"
                    id="add_teacher"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                />
                <input
                    type="button"
                    value="הוסף רב"
                    className="btn btn-secondary"
                    onClick={addTeacher}
                />
            </div>
            <div className="form-group w-25">
                <h4>תלמידיו: </h4>
                {props.myProp.form.students ?
                    <ul className="list-group" id="students">
                        {props.myProp.form.students.map(student => (
                            <li className="list-group-item  " key={student.name}>
                                {/*<button onClick={() => removeStudent(student.name)}>X</button>*/}
                                <input
                                    type="button"
                                    value="X"
                                    className="btn btn-secondary"
                                    onClick={()=>removeStudent(student.name)}
                                />
                               {student.name}
                            </li>
                        ))}
                    </ul> : ""
                }
                <input
                    type="text"
                    className="form-control"
                    id="add_student"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                />
                <input
                    type="button"
                    value="הוסף תלמיד"
                    className="btn btn-secondary"
                    onClick={addStudent}
                />
            </div>
            <br />

            <div className="form-group">
                <input
                    type="submit"
                    value={props.myProp.title}
                    className="btn btn-primary"
                />
            </div>
        </form>
    );

}
