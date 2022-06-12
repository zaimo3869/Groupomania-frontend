import React,{Component} from 'react';
import PostService from '../service/post.service';



export default class ModifyPost extends Component {
 
    
    handleChange = event => {
      const isCheckbox = event.target.type === "checkbox";
      this.setState({
        [event.target.name]: isCheckbox
          ? event.target.checked
          : event.target.value
      });
    };
  
    constructor (props) {
      super(props)
      this.getPost = this.getPost.bind(this)
      this.state = { 
        post:[],
          comment : [],
          id:[],
          admin:[],
          titre: "",
          name: "",
          photo:"",
          message: "",
          date:"",
          User_Id: "",
          nameError: ""
      }
  }
  
  componentDidMount () {
    this.getPost()
  }
  getPost() {
    let baseURL = (window.location).href;
    let id = baseURL.substring(baseURL.lastIndexOf('/')+1)
    PostService.getOnePost({id:id}).then((res) => {
      this.setState({
        titre: res.data[0].title,
        name: res.data[0].name,
        photo:res.data[0].image_url,
        message: res.data[0].message})
   })

}
handleChangeFile = event => {
  this.setState({ photo: event.target.files[0] });
};

    validate = () => {
      let nameError = "";
 

      //============= Mise ne place state error ================
      if ( nameError ) {
        this.setState({  nameError });
        return false;
      }
  
      return true;
    };
  
    handleSubmit = event => {
      event.preventDefault();
      const isValid = this.validate();
      if (isValid) {
        let baseURL = (window.location).href;
        let id = baseURL.substring(baseURL.lastIndexOf('/')+1)
        console.log(id);
          PostService.updatePost({title:this.state.titre, id:id, 
          image_url:this.state.photo, message: this.state.message, post_date:this.date})
      }
     
    };
    
    render() {
      const post = [this.state.post]
      return (
        <form className='Signup' style={{minHeight:"700px"}} onSubmit={this.handleSubmit}>
            <h1>Modifier votre post !</h1>
            <div className='inputDiv'>
              
            <label >titre</label>
            <input name="titre" value={this.state.titre} onChange={this.handleChange} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.prenomError}
            </div>

           
            <label >Photo</label>
            <input type="file" name="image" placeholder={post.title} onChange={this.handleChangeFile} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.photoError}
            </div>

          <label >Massage</label>
            <input name="message"  value={this.state.message} onChange={this.handleChange}/>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.emailError}
            </div>
        
          <button type="submit">submit</button>
            </div>
        </form>
      );
    }
  }
