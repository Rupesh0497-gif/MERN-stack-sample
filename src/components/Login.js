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
      email: "",
      phoneNumber: "",
      signUpDetails: false,
      loginFlag: false,errorFlag:false,
      errMessage: ""
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
    let request = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(request);
    axios.post("http://localhost:5000/users/login", request).then((res) => 
     this.setState({message:res.data.message},()=>{
        if (this.state.message !== "Login Successfully") {
            this.setState({errorFlag:true},()=>{
                document.getElementById("login-banner").classList.add("red");
            });
          } else {
            this.setState({ loginFlag: true },()=>{
              e.target.reset()
            });
          }
     })
     ).catch((e)=>{
      console.log(e)
      this.setState({errorFlag:true, message: "User not Found"},()=>{
        if(document.getElementById("login-banner")){
          document.getElementById("login-banner").classList.add("red");
        }
    });
     });
    
  };
  onSignUpDetails = (e) => {
    e.preventDefault();
  let request = {
    username: this.state.username,
    password: this.state.password,
    email: this.state.email,
    phoneNumber: this.state.phoneNumber
  };
  console.log(request);
  axios.post("http://localhost:5000/users/create", request).then((res) => 
   this.setState({message:res.data.message},()=>{
      if (this.state.message !== "User Added Successfully") {
          this.setState({errorFlag:true},()=>{
              document.getElementById("login-banner").classList.add("red");
          });
        } else {
          this.setState({ signUpDetails: false, message: "Your Accout has been created. Please login now" }, ()=>{
            document.getElementById("login-banner").classList.add("green");
          });
        }
   })
   );
  
};
  welfareContributeFunc = (e) => {
    this.setState({ welfareAmount: e.target.value });
  };
  onWelfareSubmit = (e) => {
    this.setState({ TotalPrice: this.state.welfareAmount });
    e.preventDefault();
    document.getElementById("welfare-submit").reset();
  };
  onSignUp(){
    this.setState({signUpDetails: true})
  }
  emailFunc(e){
    this.setState({email: e.target.value})
  }
  phoneNumberFunc(e){
    this.setState({phoneNumber: e.target.value})
  }
  render() {
    return (
        <section className="container-fluid main-container p0">
          <section className="header-wrapper col-lg-12 col-md-12 col-sm-12 p0">
            <section className="col-md-12 col-lg-12 col-sm-12 headerContent">
              <section className="col-lg-10 col-md-10 col-sm-12">
                <h1>Tally's Desi Foods</h1>
              </section>
              <section className="col-lg-2 col-md-2 col-sm-12">
                <button type="button" className="btn btn-light" style={{marginRight: '15px'}}>Login</button>
                <button type="button" className="btn btn-primary">SignUp</button>
              </section>
              <section
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <section className="modal-dialog" role="document">
                  <section className="modal-content">
                    <section className="modal-header">
                      <span className="modal-title" id="exampleModalLabel">
                        <strong>
                          We make a living by what we get....Actually we make a
                          life By what we give!!!!
                        </strong>
                      </span>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </section>
                    <section className="modal-body ">
                      <form onSubmit={this.onWelfareSubmit} id="welfare-submit">
                        <section className="row">
                          <section className="col-md-6 col-lg-6 col-sm-6 ">
                            <strong>Contribute what you could </strong>
                            <small>
                              (we will discount your contribution amount to your next
                              bill)
                            </small>
                          </section>
                          <section className="col-md-6 col-lg-6 col-sm-6 ">
                            <input
                              type="tel"
                              id="welfare-textbox"
                              className="form-control"
                              name={this.state.itemImage}
                              placeholder="Enter your amount"
                              onChange={(e) => {this.welfareContributeFunc(e)}}
                            />
                          </section>
                        </section>
                        <section className="modal-footer">
                          <input
                            type="submit"
                            className="btn btn-primary"
                            value="Contribute to Welfare"
                          />
                        </section>
                      </form>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            </section>
          {!this.state.loginFlag && 
          <>            <section className="loginpage-container">
            <section className="col-lg-4 col-md-4 col-sm-4 loginPage-wrapper">
            <section className="col-lg-10 col-md-10 col-sm-10 loginPage">
              <section
                id="login-banner"
                className="col-md-12 col-lg-12 col-sm-12 "
              >
                <strong>{this.state.message}</strong>
              </section>
            {!this.state.signUpDetails &&
            <form onSubmit={this.onSignIn}>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <strong>Username</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <input
                  type="text"
                  className="form-control"
                  name={this.state.userNameToAdd}
                  onChange={this.userNameFunc.bind(this)}
                />
              </section>

              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <strong>Password</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <input
                  type={`${this.state.showpassword? "text": "password"}`}
                  className="form-control"
                  name={this.state.passwordToAdd}
                  onChange={this.passwordFunc.bind(this)}
                />
                </section>
                <section className="col-md-12 col-lg-12 col-sm-12 mt10 p0" style={{display: 'flex'}}>
                <section className="col-md-3 col-lg-3 col-sm-3 mt10 p0">
                <input
                  type="checkbox"
                  className="form-control mt10" style={{height: '15px'}}
                  name={this.state.showpassword}
                  onChange={(e)=>{
                    this.setState({showpassword: !this.state.showpassword})
                  }}
                />
            </section>
            <section className="col-md-9 col-lg-9 col-sm-9 mt10 p0" style={{paddingTop: '4px'}}>
                <span>show password</span>
              </section>         
              </section>
              <section className="col-lg-12 col-md-12 col-sm-12 mt10">
                <input
                  type="submit"
                  className="btn btn-block btn-primary btn-checkout"
                  value="Sign In"
                />
              </section>
              <section className="col-lg-12 col-md-12 col-sm-12 mt10">
                New user? Create an account <a href="javascript:void(0)" onClick={(e) => this.onSignUp(e)}>Sign Up</a>
              </section>
            </form>
            }
            {this.state.signUpDetails &&
            <form onSubmit={this.onSignUpDetails}>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <strong>Email</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <input
                  type="text"
                  className="form-control"
                  name={this.state.email}
                  onChange={this.emailFunc.bind(this)}
                />
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <strong>Phone Number</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <input
                  type="text"
                  className="form-control"
                  name={this.state.phoneNumber}
                  onChange={this.phoneNumberFunc.bind(this)}
                />
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <strong>Username</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <input
                  type="text"
                  className="form-control"
                  name={this.state.userNameToAdd}
                  onChange={this.userNameFunc.bind(this)}
                />
              </section>

              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <strong>Password</strong>
              </section>
              <section className="col-md-12 col-lg-12 col-sm-12 mt10">
                <input
                  type={`${this.state.showpassword? "text": "password"}`}
                  className="form-control"
                  name={this.state.passwordToAdd}
                  onChange={this.passwordFunc.bind(this)}
                />
                </section>
              <section className="col-lg-12 col-md-12 col-sm-12 mt10">
                <input
                  type="submit"
                  className="btn btn-block btn-primary btn-checkout"
                  value="Create an Account"
                />
              </section>
            </form>
            }

          </section>
          </section>
          
          </section>
          </>

        }
        {this.state.loginFlag &&
        <>
        <Demo />
        <footer className="container-fluid p0 mt10">
        <section className="col-lg-12 col-md-12 col-sm-12 footer-section">
          <section className="col-lg-8 col-md-8 col-sm-8 footer-search ">
            <section className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search here for different dishes"
                aria-label="Search here for different dishes"
              />
              <section className="input-group-append">
                <span className="btn btn-primary searchbtn">search</span>
              </section>
            </section>
          </section>
          <section className="col-lg-12 col-md-12 footerStatistics">
            <span>
              To check the <strong>overall statistics</strong> of the day!!!!
              <span
                className="btn statisticsbtn"
              >
                Click Here
              </span>
            </span>
          </section>
        </section>
      </footer>
      </>
        }
       
      </section>
    
    );
  }
}
export default Login;