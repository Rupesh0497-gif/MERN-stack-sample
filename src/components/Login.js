import React from "react";
import axios from "axios";
import Demo from './Demo';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      message: "",
      loginFlag: false,errorFlag:false
    };
  }
 
  userNameFunc = (e) => {
    this.setState({ username: e.target.value });
  };
  passwordFunc = (e) => {
    this.setState({ password: e.target.value });
  };
  onSignIn = (e) => {
      e.preventDefault();
      this.setState({ loginFlag: true });
    let request = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(request);
    axios.post("http://localhost:5000/users/add", request).then((res) => 
     this.setState({message:res.data},()=>{
        if (this.state.message !== "Login Successfully") {
            this.setState({errorFlag:true},()=>{
                document.getElementById("login-banner").classList.add("red");
            });
          } else {
            this.setState({ loginFlag: true });
          }
     })
     );
    
  };
  render() {
    return (
        <section className="container-fluid main-container">
             {!this.state.loginFlag && 
<section className="loginpage-container">
            <section className="header-wrapper col-lg-12 col-md-12 col-sm-12">
            <h1>Get Started with world at your doorsteps SIGN IN!!!!!!!</h1>
            </section>
      <section className="col-lg-12 col-md-12 col-sm-12 loginPage-wrapper">
          <section className="col-lg-4 col-md-4 col-sm-4 loginPage">
            {this.state.errorFlag && (
              <section
                id="login-banner"
                className="col-md-12 col-lg-12 col-sm-12 "
              >
                <strong>{this.state.message}</strong>
              </section>
            )}
            <form onSubmit={this.onSignIn}>
              <section className="col-md-12 col-lg-12 col-sm-12 ">
                <strong>Username</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 ">
                <input
                  type="text"
                  className="form-control"
                  name={this.state.userNameToAdd}
                  onChange={this.userNameFunc.bind(this)}
                />
              </section>

              <section className="col-md-12 col-lg-12 col-sm-12 ">
                <strong>Password</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 ">
                <input
                  type="password"
                  className="form-control"
                  name={this.state.passwordToAdd}
                  onChange={this.passwordFunc.bind(this)}
                />
              </section>
              <section className="col-lg-12 col-md-12 col-sm-12">
                <input
                  type="submit"
                  className="btn btn-block btn-primary btn-checkout"
                  value="Sign In"
                />
              </section>
            </form>
          </section>
          </section>
          </section>
        }

        {this.state.loginFlag &&
        <Demo />
        }
      </section>
    
    );
  }
}
export default Login;