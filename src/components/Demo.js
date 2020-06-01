import React from "react";
import axios from "axios";
import ManageItem from "./ManageItem.js";
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeEnable: true,
      aboutEnable: false,
      listEnable: false,
      managelistEnable: false,
      statisticsEnable: false,
      statisticsEmpty: false,
      dropdownlistEnable: false,
      itemData: [],
      orderStatistics: [],
      overallOrderStatistics: [],
      welfareAmount: 0,
      TotalPrice: 0,
      welfareEnable:false
    };
  }
  componentDidMount = () => {
    axios.get("http://localhost:5000/itemsDetails/").then((res) => {
      let Responsedata = res.data;
      console.log(Responsedata);
      this.setState({ itemData: Responsedata });
    });
  };

  homeContent = () => {
    this.setState({
      homeEnable: true,
      aboutEnable: false,
      listEnable: false,
      statisticsEnable: false,
      managelistEnable: false,
      statisticsEmpty: false,
      welfareEnable:false
    });
  };
  aboutContent = () => {
    this.setState({
      homeEnable: false,
      aboutEnable: true,
      listEnable: false,
      managelistEnable: false,
      statisticsEnable: false,
      statisticsEmpty: false,
      welfareEnable:false
    });
  };
  menuContent = () => {
    this.setState({
      homeEnable: false,
      aboutEnable: false,
      listEnable: true,
      statisticsEnable: false,
      statisticsEmpty: false,
      managelistEnable: false,
      welfareEnable:false
    });
  };
  dropdownlistShow = () => {
    if (this.state.dropdownlistEnable === true) {
      this.setState({ dropdownlistEnable: false });
      console.log("aaaaa");
    } else {
      console.log("bbbbb");
      this.setState({ dropdownlistEnable: true });
    }
  };
  manageList = () => {
    this.setState({
      managelistEnable: true,
      homeEnable: false,
      listEnable: false,
      aboutEnable: false,
      statisticsEnable: false,
      statisticsEmpty: false,
      welfareEnable:false
    });
  };
  
  welfareList = () => {
    this.setState({
      welfareEnable:true,
      managelistEnable: false,
      homeEnable: false,
      listEnable: false,
      aboutEnable: false,
      statisticsEnable: false,
      statisticsEmpty: false,
    });
  };
  cartShow = () => {
    let arr = this.state.orderStatistics;
    console.log(arr.length);
    if (arr && arr.length > 0 && arr !== undefined) {
      this.setState({
        statisticsEnable: true,
        statisticsEmpty: false,
        listEnable: false,
        homeEnable: false,
        aboutEnable: false,
      });
    } else {
      this.setState({
        statisticsEmpty: true,
        statisticsEnable: false,
        listEnable: false,
        homeEnable: false,
        aboutEnable: false,
      });
    }
  };
  onAddCart = (itemName, price) => {
    let cartData = {
      itemName: itemName,
      orderPrice: price,
    };
    let value = this.state.TotalPrice + price;
    this.setState({
      orderStatistics: [...this.state.orderStatistics, cartData],
      TotalPrice: value,
    });
  };
  welfareContributeFunc = (e) => {
    this.setState({ welfareAmount: e.target.value });
  };
  onWelfareSubmit = (e) => {
    this.setState({ TotalPrice: this.state.welfareAmount });
    e.preventDefault();
    document.getElementById("welfare-submit").reset();
  };
  render() {
    return (
      <section className="page-wrapper mainContainer">
        <section className="container-fluid ">
          <section className="col-md-12 col-lg-12 col-sm-12 header">
            <section className="col-md-12 col-lg-12 col-sm-12 headerContent">
              <section className="col-lg-8 col-md-8 col-sm-12">
                <h1>WalKart</h1>
              </section>
              <section className="col-lg-4 col-md-4 col-sm-12">
                <span className="support-text">
                  Support daily wages with some amount.No amount is less so
                  contribute to our workers folks.
                </span>
                <span
                  className="btn button-text"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Donate now!!!!{" "}
                </span>
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
                              (we will you contribution amount to your next
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
                              onChange={this.welfareContributeFunc.bind(this)}
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
            <section className="col-lg-12 col-md-12 col-sm-12 navContent position-relative">
              <ul className="nav">
                <li onClick={this.homeContent}>Home</li>
                <li onClick={this.aboutContent}>About Us</li>
                <li onClick={this.menuContent}>Today's Special</li>
                <li className="dropdowntrigger" onClick={this.dropdownlistShow}>
                  My Profile
                  {this.state.dropdownlistEnable && (
                    <ul className="position-absolute dropdownlist" role="menu">
                      <li>Your Account</li>
                      <li>Your Orders</li>
                      <li onClick={this.cartShow}>Cart</li>
                      <li onClick={this.manageList}>Manage Orders</li>
                      <li onClick={this.welfareList}>Your Contribution for Welfare</li>
                      <li>
                        <a href="/">Sign Out</a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </section>
          </section>
        </section>

        <section className="container mainpageContent" role="main">
          {this.state.homeEnable && (
            <section className="homeContent-wrapper">
              <section className="col-lg-12 col-md-12 welcometext">
                <h2>Welcome to our website</h2>
                <ul className="unordered-list">
                  <li>If you are need of something you are at right place</li>
                  <li>Bored at work,you are welcomed</li>
                  <li>Sitting at home need something productive</li>
                  <li>Wanna explore goods ?? you are at right place</li>
                </ul>
              </section>
            </section>
          )}
          {this.state.aboutEnable && (
            <section className="col-lg-12 col-md-12 col-sm-12 aboutContent-wrapper">
              <p>
              Our Walkart has all the electronic and houseneed items.We are in this feild for past three decades
              </p>
            </section>
          )}
          {this.state.listEnable && (
            <section className="col-lg-12 col-md-12 col-sm-12 listContent-wrapper">
              <section className="card-deck mb-3 text-center">
                {this.state.itemData.map((item, i) => {
                  return (
                    <section
                      key={i}
                      className="card mb-4 box-shadow col-lg-3 col-md-3 col-sm-4 col-xs-6"
                    >
                      <section className="card-header">
                        <h4 className="my-0 font-weight-normal">
                          {item.itemNameToAdd}
                        </h4>
                      </section>
                      <section className="card-body">
                        <img
                          src={item.itemImage}
                          width="100px"
                          height="90px"
                          alt="cart "
                        />
                        <h1 className="pricing-card-title">
                          ${item.itemPrice}{" "}
                          <small className="text-muted">/ per piece</small>
                        </h1>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>
                            {" "}
                            category :<strong>{item.itemCategory}</strong>
                          </li>
                          <li>
                            Origin of seller:<strong>{item.itemOrigin}</strong>
                          </li>
                          <li>Priority email support</li>
                          <li>Help center access</li>
                        </ul>

                        <button
                          type="button"
                          className="btn btn-lg btn-block btn-primary"
                          onClick={this.onAddCart.bind(
                            this,
                            item.itemNameToAdd,
                            item.itemPrice
                          )}
                        >
                          Add to cart
                        </button>
                      </section>
                    </section>
                  );
                })}
              </section>
            </section>
          )}
          {this.state.statisticsEnable && !this.state.statisticsEmpty && (
            <section className="col-lg-12 col-md-12 statistics-wrapper">
              <section className="col-lg-12 col-md-12 col-sm-12 statisticsTable">
                <table>
                  <thead>
                    <tr>
                      <td>S.No</td>
                      <td>Item Name</td>
                      <td>Item Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.orderStatistics.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.itemName}</td>
                          <td>{item.orderPrice}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
              <section className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statistics-align">
                <section className="col-lg-6 col-md-6 col-sm-6 col-xs-6 statistics-align-center">
                  <section className="col-md-6 col-lg-6 col-sm-6 ">
                    <strong>Total </strong>
                  </section>
                  <section className="col-md-6 col-lg-6 col-sm-6 ">
                    <input
                      type="button"
                      className="btn btn-primary"
                      value={this.state.TotalPrice}
                    />
                  </section>
                </section>
              </section>
            </section>
          )}
          {this.state.statisticsEmpty && (
            <section className="statisticsnull">
              No order has been placed today!!!!!
            </section>
          )}
          {this.state.managelistEnable && (
            <section className="managelist-wrapper">
              <ManageItem />
            </section>
          )}
           {this.state.welfareEnable && (
            <section className="welfare-wrapper">
             <p>your contribution till date for welfare of downtrodden people is <strong>{this.state.welfareAmount}</strong></p>
            </section>
          )}
        </section>

        <footer className="container-fluid">
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
                  onClick={this.statisticsShow}
                >
                  Click Here
                </span>
              </span>
            </section>
          </section>
        </footer>
      </section>
    );
  }
}

export default Demo;
