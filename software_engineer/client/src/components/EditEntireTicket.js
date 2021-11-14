import React,{Fragment, useState} from 'react'


const EditEntireTicket = ({tickets}) => {
  // console.log(tickets)
    const [description, setDescription] = useState(tickets.description);

    const [id, setId] = useState(tickets.id); 
    // const [priority, setPriority] = useState(tickets.priority);
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState(tickets.status);
    const [subject, setSubject] = useState(tickets.subject);
    const [created_at, setCreated_at] = useState(tickets.created_at);

  
    //edit description function
    const updateDescription=async e=>{
      e.preventDefault()
      try {
        const body = { id,priority,status,subject,created_at,description };
        const response=await fetch(`http://localhost:5000/tickets/${tickets.id}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(body)
        })

        console.log(response)
        window.location="/"
        
      } catch (error) {
        console.error(error.message)
        
      }

    }

    
    return (
        <Fragment>
                 
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${tickets.id}`}>
        EditAllTicketInfo
        </button>

        <div className="modal" id={`id${tickets.id}`} 
        // {/*below is creating problem*/}
        // onClick={()=>{setDescription(tickets.description);setId(tickets.id);setPriority(tickets.priority);setStatus(tickets.status);setSubject(tickets.subject);setCreated_at(tickets.setCreated_at)}}
        >
        <div className="modal-dialog">
            <div className="modal-content">

           
            <div className="modal-header">
                <h4 className="modal-title">TicketInfoToBeEdited</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

       
            <div className="modal-body">
                <input type="text" className="form-control" value={id} onChange={e=>setId(e.target.value)}></input>
                <input type="text" className="form-control" value={priority} onChange={e=>setPriority(e.target.value)}></input>
                <input type="text" className="form-control" value={status} onChange={e=>setStatus(e.target.value)}></input>
                <input type="text" className="form-control" value={subject} onChange={e=>setSubject(e.target.value)}></input>
                <input type="text" className="form-control" value={created_at} onChange={e=>setCreated_at(e.target.value)}></input>
                <input type="text" className="form-control" value={description} onChange={e=>setDescription(e.target.value)}></input>

            </div>

            
            <div className="modal-footer">
                {/* <h6>PleaseUseTAB2Move2NextCell</h6> */}
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e=>updateDescription(e)}>EditAnyOrAllInfo</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div> 



        
        </Fragment>
    )
}

export default EditEntireTicket
