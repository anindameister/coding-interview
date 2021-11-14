const Pool=require("pg").Pool;

const pool=new Pool({
    user: "postgres",
    password: "@Ninda17071988",
    host: "localhost",
    port:5432,
    database: "enhancingticketingtool"
})

module.exports=pool;