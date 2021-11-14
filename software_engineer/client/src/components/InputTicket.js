

import React, { Fragment, useState } from "react";

const InputTicket = () => {
    
    const [id, setId] = useState("99999999"); //cannot put text even within quotes
    const [priority, setPriority] = useState("critical");
    const [status, setStatus] = useState("put the status");
    const [subject, setSubject] = useState("put the subject");
    const [created_at, setCreated_at] = useState("2021-11-10");
  const [description, setDescription] = useState("put the description");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { id,priority,status,subject,created_at,description };
      const response = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response)
      window.location = "/"; //comment this out in order to check the response in the console
    } catch (err) {
      console.error(err.message);
      
    }
  };


  return (
    <Fragment>
      <h1 className="text-center mt-5">Zendesk, The ticketing Tool</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {/* id */}
        <input
          type="number"
          className="form-control"
          value={id}
          onChange={e => setId(e.target.value)}
        />
        {/* priority */}
        <input
          type="text"
          className="form-control"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        />
        {/* status */}
        <input
          type="text"
          className="form-control"
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
        {/* subject */}
        <input
          type="text"
          className="form-control"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        {/* created_at */}
        <input
          type="text"
          className="form-control"
          value={created_at}
          onChange={e => setCreated_at(e.target.value)}
        />

        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTicket;