const express = require('express');
const mysql= require('mysql');
const cors= require('cors');


const app = express();
app.use(cors())

app.use(express.json())

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"emp-details"

});

app.get('/',(req,res)=>{
  return res.json("Serverside");
})
app.get('/empDetails',(req,res)=>{
  const sql= "SELECT * FROM persons";
  db.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
});
app.post('/insertEmp',(req,res)=>{
  const sql = 'INSERT INTO persons (fname, lname, email, eid, address, resume) VALUES (?)';
  const values=[
    req.body.fname,
    req.body.lname, 
    req.body.email, 
    req.body.eid, 
    req.body.address, 
    req.body.resume
  ];
  console.log("  in person post ");
  db.query(sql,[values],(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
});


app.post('/updateEmp/:id',(req,res)=>{
  const value = req.body;
  console.log(" updateEmp ==  ", req.params.id);

  const sql = `UPDATE persons SET fname = '${value.fname}', lname = '${value.lname}', email = '${value.email}', eid = '${value.eid}', address = '${value.address}' WHERE id = ${req.params.id}`;
  console.log("  updateEmp in person post ");
  db.query(sql,(err,data)=>{
    
    console.log("  updateEmp sql ==> ", sql); 
    console.log("  updateEmp res === > ", res); 
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.delete("/deleteEmp/:id",(req, res)=>{
  const sql=`DELETE FROM persons WHERE eid='${req.params.id}'`;
  db.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
  
})
app.listen(8081, ()=>{
  console.log("listenings")
})
















































// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Employee data storage
// let employeeData = [];

// // Get all employees
// app.get('/api/employees', (req, res) => {
//   res.json(employeeData);
// });

// // Add a new employee
// app.post('/api/employees', (req, res) => {
//   const { name, place, number } = req.body;
//   const newEmployee = { name, place, number };
//   employeeData.push(newEmployee);
//   res.status(201).json(newEmployee);
// });

// // Update an employee
// app.put('/api/employees/:id', (req, res) => {
//   const id = req.params.id;
//   const { name, place, number } = req.body;
//   const updatedEmployee = { name, place, number };
//   employeeData[id] = updatedEmployee;
//   res.json(updatedEmployee);
// });

// // Delete an employee
// app.delete('/api/employees/:id', (req, res) => {
//   const id = req.params.id;
//   employeeData.splice(id, 1);
//   res.sendStatus(204);
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
