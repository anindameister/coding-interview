import React, { Fragment, useEffect, useState } from "react";
import EditEntireTicket from "./EditEntireTicket";

import EditTicketDescription from "./EditTicketDescription";

const ListTicket = () => {
  const [tickets, setTickets] = useState([]);
 


  //delete ticket function

  const deleteTicket = async id => {
    try {
      const deleteTicket = await fetch(`http://localhost:5000/tickets/${id}`, {
        method: "DELETE"
      });

      console.log(deleteTicket)

      setTickets(tickets.filter(tickets => tickets.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/tickets");
      const jsonData = await response.json();

      setTickets(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  console.log(tickets);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>id</th>
            <th>priority</th>
            <th>status</th>
            <th>subject</th>
            <th>created_at</th>
            <th>Description</th>
            <th>Edit Just Description</th>
            <th>Edit Entire Ticket except id</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {tickets.map(tickets => (
            <tr key={tickets.id}>
              <td>{tickets.id}</td>
              <td>{tickets.priority}</td>
              <td>{tickets.status}</td>
              <td>{tickets.subject}</td>
              <td>{tickets.created_at}</td>
              <td>{tickets.description}</td>
              <td>
                <EditTicketDescription tickets={tickets} />
              </td>
              <td>
                <EditEntireTicket tickets={tickets} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTicket(tickets.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTicket;