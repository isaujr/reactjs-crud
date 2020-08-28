import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from '../Database/firebase';

const Contatcs = () => {

    var [contactObjects,setcontactObjects] = useState({})
    var [currentId,setCurrentId] = useState('')

    useEffect(()=>{
        firebaseDb.child('contacts').on('value',snapshot=>{
            if(snapshot.val()!=null)
                setcontactObjects({
                    ...snapshot.val()
                })
            else
                setcontactObjects({})
        })
    },[])

    const addOrEdit = obj =>{
        if(currentId=='')
            firebaseDb.child('contacts').push(
                obj,
                err=>{
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err=>{
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
            
    }

    const onDelete = key =>{
        if(window.confirm('Are you sure to delete this record?')){
            firebaseDb.child(`contacts/${key}`).remove(
                err=>{
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid bg-dark text-light">
                <div className="container">
                    <h1 className="display-4 text-center">Contact Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...({ addOrEdit, currentId, contactObjects })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped table-dark">
                        <thead className="thead-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{contactObjects[id].fullName}</td>
                                        <td>{contactObjects[id].mobile}</td>
                                        <td>{contactObjects[id].email}</td>
                                        <td style={{whiteSpace: "nowrap",padding: "6px 12px"}}>
                                            <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Contatcs;