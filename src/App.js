import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Sample() {
    const [name,setName] = useState("");
    const [designation,setDesignation] = useState('');
    const [success,setSuccess] = useState("");
    const [error,setError] = useState("");
    const [flag,setFlag] = useState(false);
    const [employees,setEmployees] = useState([]);
    const navigate =useNavigate();
    useEffect(()=>{
      axios.get("http://localhost:4000/employees").then((res)=>{
        setEmployees(res.data);
      })
    },[]
    )
    const dltEmployee =(empid)=>{
      axios.delete("http://localhost:4000/employees/"+empid).then((res)=>{
        axios.get("http://localhost:4000/employees").then((res)=>{
          setEmployees(res.data);
        })
      })
    }
    const validation =()=>{
      if(!name)
      {setError("Please Enter Employee Name");
       setSuccess();
      }
      else if(!designation)
      {setError("Please Enter Designation");
       setSuccess();
      }
      else{
        let newEmployee={name:name,designation:designation}
        
          axios.post("http://localhost:4000/employees/",newEmployee).then((res)=>{
            setEmployees([...employees,res.data]);
            console.log(res.data);
            setSuccess("Record Added Successfully");
            setError();
            setFlag(false);
          })
       
      
      }
    }
    return (
      <div className='container'>
        <table style={{width:"100%"}}className='table table-bordered mt-3'>
          <thead>
          <tr>
            <th>EMP ID</th>
            <th>EMP Name</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {employees.length>0 ? 
            (
              employees.map((employee)=>{
                return(
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.designation}</td>
                    <td><button className='btn btn-danger btn-xs' onClick={()=>dltEmployee(employee.id)}>Delete</button></td>
                  </tr>
                )
              })
            )
            :"No Record Found"}
          </tbody>

        </table>
        <div className='col-md-3 mt-3'>
        <button className='btn btn-primary me-3 mb-2' onClick={()=>setFlag(true)}>AddEmployee</button>
        <button className='btn btn-warning mb-2' onClick={()=>navigate("/getid")}>Route</button>
        </div>

        
        {flag ? (
          <div className='mt-3'>
        <div className='form-group'>
          <label htmlFor='name'>Employee Name:</label>
          <input style={{width:"50%"}} className="form-control" placeholder='Enter EmployeeName' value={name} onChange={(event)=>{setName(event.target.value)}}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='designation'>Designation:</label>
          <input style={{width:"50%"}} className="form-control" placeholder='Enter Designation' value={designation} onChange={(event)=>setDesignation(event.target.value)}></input>
        </div>
        <button className="btn btn-success mt-3 mb-3" onClick={validation}>Submit</button>
        {success ? <div className='text-success'>{success}</div>:null}
        {error ? <div className='text-danger'>{error}</div>:null}
        </div>) : null}
      </div>
    );
  }
  export default Sample;