const express = require('express');
const app = express();

//body parser
app.use(express.json({ limit: '10kb' }));

app.get('/', (req,res)=>{
    res.status(200).json({
        message:"hello from server"
    })
});
  
module.exports = app;