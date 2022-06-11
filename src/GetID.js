import {useNavigate} from 'react-router-dom';
const GetID =()=> {
  const navigate=useNavigate();
    return(
        <>
        <h4>Successfully Routed to New Component</h4>
        <button className="btn btn-warning" onClick={()=>{navigate  ('/app')}}>Back</button>
        </>
    )
}
export default GetID;