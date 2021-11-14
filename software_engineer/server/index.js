const express= require("express")
const app= express()


//middleware
const cors=require("cors")
app.use(cors())

// we get data from client side using req.body object
app.use(express.json()) //this gives access to req.body and then we get json data

//database part
const pool=require("./db")

//routes

//CREATE a ticket

app.post("/tickets",async(req,res)=>{
    try {
        // console.log(req.body)
        const {id}=req.body
        const {priority}=req.body
        const {status}=req.body
        const {subject}=req.body
        const {description}=req.body
        const {created_at}=req.body
        const newTodo = await pool.query(
            "INSERT INTO tickets (id,priority,status,subject,description,created_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            [id,priority,status,subject,description,created_at]
          );
      
          res.json(newTodo.rows[0]);
        
    } catch (err) {
        console.error(err.message)
        
    }

})

//get all tickets

app.get("/tickets", async (req, res) => {
    try {
      const allTickets = await pool.query("SELECT * FROM tickets");
      res.json(allTickets.rows);
    } catch (error) {
      console.error(error.message);
    }
  });




app.get("/tickets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const tickets = await pool.query("SELECT * FROM tickets WHERE id = $1", [
        id
      ]);
  
      res.json(tickets.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });



//update a ticket


app.put("/tickets/:id", async (req, res) => {
    try {
     

      const {priority}=req.body
      const {status}=req.body
      const {subject}=req.body
      const {description}=req.body
      const {created_at}=req.body
      const { id } = req.params;
      

      
      const updateTicket = await pool.query(
        "UPDATE tickets SET priority=$1,status=$2,subject=$3,description=$4,created_at=$5 WHERE id = $6",
        [priority, status,subject,description,created_at,id]
        
      );
  
      res.json("Ticket has been updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

//update just the description using patch

app.patch("/tickets/:id", async (req, res) => {
  try {
   

    const {description}=req.body

    const { id } = req.params;
    

    
    const updateTicket = await pool.query(
      "UPDATE tickets SET description=$1 WHERE id = $2",
      [description,id]
      
    );

    res.json("Ticket has been patched!");
  } catch (err) {
    console.error(err.message);
  }
});


//delete a ticket

app.delete("/tickets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTicket = await pool.query("DELETE FROM tickets WHERE id = $1", [
        id
      ]);
      res.json("Ticket have been deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });


app.listen(5000,()=>{
    console.log("server has started on port 5000")
})