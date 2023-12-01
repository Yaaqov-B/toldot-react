import React from "react";


export default function Rabbi(props){
    return(

        <form>
            <div className="form-group w-25">
                <label htmlFor="name">   שם:</label>
                <label className="form-control" > {props.myProp.form.name} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="alias">כינוי: </label>
                <label className="form-control" > {props.myProp.form.alias} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="born">נולד: </label>
                <label className="form-control" > {props.myProp.form.born} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="died">נפטר: </label>
                <label className="form-control" > {props.myProp.form.died} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="birthPlace">מקום לידה: </label>
                <label className="form-control" > {props.myProp.form.birthPlace} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="deathPlace">מקום פטירה: </label>
                <label className="form-control" > {props.myProp.form.deathPlace} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="description">תיאור: </label>
                <label className="form-control" > {props.myProp.form.description} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="externalLinks">קישורים: </label>
                <label className="form-control" > {props.myProp.form.externalLinks} </label>

            </div>
            <div className="form-group w-25">
                <label htmlFor="books">ספריו: </label>
                {props.myProp.form.books ?
                    <ul className="list-group">
                        {props.myProp.form.books.map(book => (
                            <li className="list-group-item  " key={book.title}>
                                <label className="form-control" > {book.title} </label>
                            </li>
                        ))}
                    </ul> : ""
                }
            </div>
            <div className="form-group w-25">
                <label htmlFor="teachers">רבותיו: </label>
                {props.myProp.form.teachers ?
                    <ul className="list-group">
                        {props.myProp.form.teachers.map(teacher => (
                            <li className="list-group-item  " key={teacher.name}>
                                <label className="form-control" > {teacher.name} </label>

                            </li>
                        ))}
                    </ul> : ""
                }
            </div>
            <div className="form-group w-25">
                <label htmlFor="students">תלמידיו: </label>
                {props.myProp.form.students ?
                    <ul className="list-group">
                        {props.myProp.form.students.map(student => (
                            <li className="list-group-item  " key={student.name}>
                                <label className="form-control" > {student.name} </label>
                            </li>
                        ))}
                    </ul> : ""
                }
            </div>
            <br />

        </form>
    );

}
