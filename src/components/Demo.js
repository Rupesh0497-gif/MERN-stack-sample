import React from "react";
import axios from "axios";
import ManageItem from "./ManageItem.js";
import ItemModal from "./ItemModal.js";
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
  }
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
        <section className="container-fluid p0">
          <section className="col-md-12 col-lg-12 col-sm-12 header">
            <section className="col-lg-12 col-md-12 col-sm-12 navContent position-relative">
              <ul className="nav">
                <li className={`${this.state.homeEnable? 'selected': ''}`} onClick={this.homeContent}>Home</li>
                <li className={`${this.state.aboutEnable? 'selected': ''}`} onClick={this.aboutContent}>About Us</li>
                <li className={`${this.state.listEnable? 'selected': ''}`} onClick={this.menuContent}>Today's Special</li>
                <li className="dropdowntrigger" onClick={this.dropdownlistShow}>
                  My Profile
                  {this.state.dropdownlistEnable && (
                    <ul className="position-absolute dropdownlist" role="menu">
                      <li>Your Account</li>
                      <li>See your Orders</li>
                      <li onClick={this.cartShow}>Cart</li>
                      <li onClick={this.manageList}>Build your own fortune</li>
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
                <h2>Welcome User, a experience to feel</h2>
                <ul className="unordered-list">
                  <li>If you are need of something mesmerizing you are at right place</li>
                  <li>Wanna try some new indian foods,you are welcomed</li>
                  <li>Wanna feel the pleasure of spices</li>
                  <li>Wanna explore foods?? you are at right place</li>
                </ul>
              </section>
            </section>
          )}
          {this.state.aboutEnable && (
            <section className="col-lg-12 col-md-12 col-sm-12 aboutContent-wrapper">
              <p>
              Our Desi Foods has home cooked foods items.We are in this feild for past three decades and we do offer for franchise
              </p>
            <span  className="mt10">Indian cuisine is as diverse as its culture, with each region boasting its own unique flavors, ingredients, and cooking styles. It is renowned for its rich and aromatic spices, vibrant colors, and a wide variety of vegetarian and non-vegetarian dishes. Indian cuisine is deeply rooted in tradition and history, 
              influenced by ancient customs, trade routes, and the cultural exchange that has occurred over centuries.</span>
            <div>Regional Diversity:

India's vast geographical and cultural diversity is reflected in its cuisine. Here are some of the prominent regional cuisines:

North Indian Cuisine: Known for its rich gravies, bread (roti/naan), and dairy products like paneer (cottage cheese) and ghee (clarified butter). Popular dishes include butter chicken, tandoori chicken, and various types of kebabs.
South Indian Cuisine: Characterized by its generous use of spices, rice, coconut, and seafood. South Indian cuisine includes dishes like dosa (fermented crepe), idli (steamed rice cake), sambar (lentil stew), and rasam (spicy soup).
East Indian Cuisine: Influenced by Bengali, Odia, and Assamese traditions, East Indian cuisine features freshwater fish, rice, and mustard oil. Dishes like macher jhol (fish curry), roshogolla (syrupy dessert), and pitha (rice cake) are popular in this region.
West Indian Cuisine: Known for its diverse range of flavors, West Indian cuisine includes dishes from Gujarat, Maharashtra, and Rajasthan. It features an array of snacks like dhokla, pav bhaji, and vada pav, as well as spicy curries and sweets like modak and shrikhand.</div>
            
            
            </section>
          )}
          {this.state.listEnable && (
            <section className="col-lg-12 col-md-12 col-sm-12 listContent-wrapper">
                {this.state.itemData.map((item, i) => {
                  return (
                    <section
                      key={i}
                      className="box-shadow col-lg-3 col-md-3 col-sm-4 col-xs-6 mt10"
                    >
                      <section className="cardContainer col-lg-12 col-md-12 col-xs-12 p0">
                      <section className="">
                        <h4 className="my-0 font-weight-normal">
                          {item.itemNameToAdd}
                        </h4>
                      </section>
                      <section className="">
                        <img
                          src={item.itemImage}
                          width="100px"
                          height="90px"
                          alt="cart "
                        />
                        <h3 className="">
                          ${item.itemPrice}{" "}
                          <small className="text-muted">/ per piece</small>
                        </h3>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>
                            {" "}
                            category :<strong>{item.itemCategory}</strong>
                          </li>
                          <li>
                            Origin of seller:<strong>{item.itemOrigin}</strong>
                          </li>
                        </ul>
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target={`#exampleModalToggle_${i}`}
                          className="btn btn-lg btn-block btn-primary"
                        >
                          Add
                        </button>
                      </section>
                      </section>
                      <ItemModal item={item} key={i} currentId={i} onAddCart={this.onAddCart}/>
                    </section>
                  );
                })}
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

        
      </section>
    );
  }
}

export default Demo;
