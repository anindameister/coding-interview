import React,{Fragment, useState} from 'react'

const EditTicketDescription = ({tickets}) => {
  // console.log(tickets)
    const [description, setDescription] = useState(tickets.description);


  
    //edit description function
    const updateDescription=async e=>{
      e.preventDefault()
      try {
        const body={description}
        const response=await fetch(`http://localhost:5000/tickets/${tickets.id}`,{
          method:"PATCH",
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
         
          <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${tickets.id}_edit_desc`}>
            Edit Description
          </button>

          <div className="modal" id={`id${tickets.id}_edit_desc`} onClick={()=>setDescription(tickets.description)}>
            <div className="modal-dialog">
              <div className="modal-content">

      
          <div className="modal-header">
            <h4 className="modal-title">Edit Ticket Description</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setDescription(tickets.description)}></button>
          </div>


          <div className="modal-body">
            <input type="text" className="form-control" value={description} onChange={e=>setDescription(e.target.value)}></input>
          </div>


          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e=>updateDescription(e)}>Edit Description</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>setDescription(tickets.description)}>Close</button>
          </div>

    </div>
  </div>
</div>

        
      </Fragment>
    )
}

export default EditTicketDescription
