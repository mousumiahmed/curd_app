import React from 'react';
import axios from 'axios';
import {Router, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            persons: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/users`)
      .then(res => {
       console.log(res.data);
        this.setState({
             persons:res.data
             });
      })
      console.log(this.state.persons);
      //localStorage.setItem("xyz",JSON.stringify(this.state.persons));
  }
  /*Delete = (id)=> {
    console.log(id);
   this.setState({
    persons:this.state.persons.map((val,index)=>{
        console.log(index);
     if(index===id){
        this.state.persons.splice(id,1);
     }
    })
   })
   console.log(this.state.persons);  
  }*/
//   delete =(id)=>{
//     console.log(id)
//  axios({
//      method: 'GET',
//      url: `http://localhost:5000/users/delete/${this.props.match.params.id}`,
    
//  })
 
//      .then((response) =>{
//          console.log( "delele "+response.data)
     
//      })

// }
delete =(e)=>{
    console.log(e.target.id)
 axios({
     method: 'GET',
     url: `http://localhost:5000/users/delete/${e.target.id}`,
    
 })
 
     .then((response) =>{
         console.log( "delele "+response.data)
         axios.get(`http://localhost:5000/users`)
         .then(res => {
          console.log(res.data);
           this.setState({
                persons:res.data
                });
         })
         console.log(this.state.persons);
     })

}

  render() {
      console.log(this.state.persons);
    return (
            <div>
                <div className="table-responsive">
                 <table className="table table-dark">
                 <thead>
                 <tr>
                     <th scope="col">ID</th>
                     <th scope="col">Item_Name</th>
                     <th scope="col">Quantity</th>
                     <th scope="col">Show Detail</th>
                     <th scope="col">Edit</th>
                     <th scope="col">Delete</th>
                 </tr>
                </thead>
                <tbody>
                    {
                    this.state.persons.map((value,index)=>{
                        return(
                            <tr>
                            <th scope="row"key={index}>{index}</th>
                            <td>{value.name}</td>
                            <td>{value.quantity}</td>
                 
                            <td><Link to={`/show${value._id.$oid}`}>Show</Link></td>
                            <td><Link to={`/edit${value._id.$oid}`} >Edit</Link></td>                            
                            <td><button type="button" onClick = {this.delete} id={value._id.$oid}>Delete</button></td>
                            </tr>
                        )
                    })}             
                    </tbody>
                 </table>
                 
                </div>
    
            </div>
        )
  }
}