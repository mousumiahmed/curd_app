import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

export default class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
           quantity:"",
           description:""

        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `http://localhost:5000/users/show/${this.props.match.params.id}`,
            
        })
        .then((response) =>{
            console.log(response)
            this.setState({
                "name": response.data[0].name,
                "quantity":  response.data[0].quantity,
                "description": response.data[0].description,
                
            })
           
        })
       
    }

    edit = ()=>{
        //console.log(code,name,id)
         axios({
             method: 'POST',
             url: `http://localhost:5000/users/update/${this.props.match.params.id}`,
             data:{
                 
              "name": this.state.name,
              "quantity": this.state.quantity,
              "description":this.state.description
                 
             }
         })
         .then((response) =>{
             console.log(response.data)
         })
        
    }

    render(){
        return(
            <div className = "container">
                <br/>
                <br/>
                <form >
                <div className="form-group col-sm">
                    <label for="code">Enter Name of item</label>
                    <input type="text" className="form-control" id="name" onChange={(e)=>this.setState({name:e.target.value})}   value ={this.state.name}  />
                </div>
                <div className="form-group col-sm">
                    <label for="name">Quantity</label>
                    <input type="text" className="form-control" id="quantity" onChange={(e)=>this.setState({quantity:e.target.value})} value={this.state.quantity} ></input>
                </div>
                <div className="form-group col-sm">
                    <label for="name">description</label>
                    <input type="text" className="form-control" id="description" onChange={(e)=>this.setState({description:e.target.value})} value={this.state.description} ></input>
                </div>
                
                <div className = "form-group">
                    <button type="button" className="btn btn-primary text" onClick ={()=> {this.edit();this.props.history.push('/home') }}>Submit</button>
                </div>
                </form>
                </div>
        )
    }
}

