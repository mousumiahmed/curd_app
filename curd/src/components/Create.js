import React, { Component } from 'react';
import Home from './Home.js';
import axios from 'axios';



export default class Create extends Component {
    constructor(props) {
        super(props);

  
        this.state = {
            name: '',
            quantity: '',
            description:''
            
            
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
    onChangeQuantity(e) {
      this.setState({
        quantity: e.target.value
      })  
    }
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      })
    }
  
  
    onSubmit(e) {
      e.preventDefault();
     // console.log(this.state.code , this.state.name ,this.state.email)
     // console.log(this.state.arr);
      
      const data={name:this.state.name,quantity:this.state.quantity,description:this.state.description}
      //console.log(data);
      //const arr=[...this.state.arr, data];
      //console.log(arr);
      //const json=JSON.stringify(arr);
      //console.log(json);
      //localStorage.setItem("xyz",json);
      axios.post(`http://localhost:5000/users/create`,data)
      .then(res => {
        console.log(res);
        //console.log(res);
      })
      
      
      this.setState({
            name: '',
            quantity: '',
            description:''
      })
    }
   
    render() {
     // console.log(this.state.arr);
        return (
            <div>
                   <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter Item_name:  </label>
                        <input type="text" className="form-control"  value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Enter Amount:  </label>
                        <input type="text" className="form-control"  value={this.state.quantity} onChange={this.onChangeQuantity} />
                    </div>
                    <div className="form-group">
                        <label>Enter Your Email:  </label>
                        <input type="text" className="form-control"  value={this.state.description} onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <input type="submit"  className="btn btn-primary"/>
                    </div>
                </form>
               
            </div>
        )
    }
  }