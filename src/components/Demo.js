import React from "react";
import axios from "axios";
import ManageItem from "./ManageItem.js";
import ItemModal from "./ItemModal.js";
import MainDishes from "../assert/maindishes.png";
import Sides from "../assert/Sides.png";
import Logo from "../assert/Logo.png";
import Food1 from "../assert/1.jpg";
import Food2 from "../assert/2.jpg";
import Food3 from "../assert/3.jpg";
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
      welfareEnable: false,
      currSlide: 1,
      cartMsg: "",
    };
  }
  componentDidMount = () => {
    axios.get("http://localhost:5000/itemsDetails/").then((res) => {
      let Responsedata = res.data;
      console.log(Responsedata);
      this.setState({ itemData: Responsedata, cartMsg: "" });
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
      welfareEnable: false,
      cartMsg: "",
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
      welfareEnable: false,
      cartMsg: "",
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
      welfareEnable: false,
      cartMsg: "",
    });
  };
  dropdownlistShow = () => {
    if (this.state.dropdownlistEnable === true) {
      this.setState({ dropdownlistEnable: false, cartMsg: "" });
      console.log("aaaaa");
    } else {
      console.log("bbbbb");
      this.setState({ dropdownlistEnable: true, cartMsg: "" });
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
      welfareEnable: false,
      cartMsg: "",
    });
  };

  welfareList = () => {
    this.setState({
      welfareEnable: true,
      managelistEnable: false,
      homeEnable: false,
      listEnable: false,
      aboutEnable: false,
      statisticsEnable: false,
      statisticsEmpty: false,
      cartMsg: "",
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
        cartMsg: "",
      });
    } else {
      this.setState({
        statisticsEmpty: true,
        statisticsEnable: false,
        listEnable: false,
        homeEnable: false,
        cartMsg: "",
        aboutEnable: false,
      });
    }
  };
  onAddCart = (itemName, price, count, category) => {
    let cartData = {
      itemName: itemName,
      orderPrice: price,
      category: category
    };
    let cartItems = [];
    let itemprice = 0;
    for (let i = 1; i <= count; i++) {
      itemprice = itemprice + price;
      cartItems.push(cartData);
    }
    let value = this.state.TotalPrice + itemprice;
    this.setState({
      orderStatistics: [...this.state.orderStatistics, ...cartItems],
      TotalPrice: value,
      cartMsg: "Item has been added to cart",
    });
  };
  welfareContributeFunc = (e) => {
    this.setState({ welfareAmount: e.target.value, cartMsg: "" });
  };
  onWelfareSubmit = (e) => {
    this.setState({ TotalPrice: this.state.welfareAmount, cartMsg: "" });
    e.preventDefault();
    document.getElementById("welfare-submit").reset();
  };
  onSlideClick(flow) {
    let currentId = this.state.currSlide;
    document
      .getElementById(`carosal_Item_${currentId}`)
      .classList.remove("active");
    if (flow === "prev") {
      currentId = currentId - 1;
      if (currentId < 0 || currentId === 0) {
        currentId = 3;
      }
    } else {
      currentId = currentId + 1;
      currentId = currentId > 3 ? 1 : currentId;
    }
    this.setState({ currSlide: currentId }, () => {
      document
        .getElementById(`carosal_Item_${this.state.currSlide}`)
        .classList.add("active");
    });
  }
  render() {
    return (
      <section className="page-wrapper mainContainer">
        <section className="container-fluid p0">
          <section className="col-md-12 col-lg-12 col-sm-12 header">
            <section className="col-lg-12 col-md-12 col-sm-12 navContent position-relative">
              <ul className="nav">
                <li
                  className={`${this.state.homeEnable ? "selected" : ""}`}
                  onClick={this.homeContent}
                >
                  Home
                </li>
                <li
                  className={`${this.state.listEnable ? "selected" : ""}`}
                  onClick={this.menuContent}
                >
                  Available dishes
                </li>
                <li
                  className={`${this.state.aboutEnable ? "selected" : ""}`}
                  onClick={this.aboutContent}
                >
                  About Us
                </li>
                <li className="dropdowntrigger" onClick={this.dropdownlistShow}>
                  My Profile
                  {this.state.dropdownlistEnable && (
                    <ul className="position-absolute dropdownlist" role="menu">
                      <li onClick={this.cartShow}>Cart</li>
                      <li onClick={this.manageList}>Add Items and Manage Orders</li>
                      <li onClick={this.welfareList}>
                        Your Contribution for Welfare
                      </li>
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
            <section
              className="homeContent-wrapper mt10"
              style={{
                background: "white",
                border: "1px solid #ddd",
                "border-radius": "15px",
                "box-shadow": "1px 2px 2px 0px",
                display: "flex",
                padding: "15px",
              }}
            >
              <section className="col-lg-8 col-md-8 col-sm-8 welcometext mt10">
                <h2 className="mt10">Welcome to Tally's Desi Foods!</h2>
                <p className="mt10">Discover the Magic of Authentic Flavors</p>
                <ul className="unordered-list mt10">
                  <li>
                    Delve into a world where every dish tells a story of
                    tradition and taste.
                  </li>
                  <li>
                    Embark on a culinary journey with our diverse selection of
                    Indian cuisine.
                  </li>
                  <li>
                    Experience the warmth of spices that will tantalize your
                    palate.
                  </li>
                  <li>
                    Your adventure with food begins here – explore, search, and
                    indulge.
                  </li>
                </ul>
              </section>
              <section className="col-lg-4 col-md-4 col-sm-4 col-xs-4 mt10">
                {/* <div style={{ fontSize: "36px", fontWeight: "bold" }}>
                  Today's Specials
                </div> */}
                 <div style={{
                 fontSize: "20px",  fontFamily: "Belleza, sans-serif",fontWeight: "bold",textAlign: "center", padding: "7px",border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"  }}>    TODAY'S SPECIALS!!
                 </div>
                <div
                  id="carouselExampleAutoplaying"
                  class="carousel slide"
                  data-bs-ride="carousel"
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active" id={`carosal_Item_1`}>
                      <img
                        src={Food1}
                        class="d-block"
                        width={"200px"}
                        height={"200px"}
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item" id={`carosal_Item_2`}>
                      <img
                        src={Food2}
                        class="d-block"
                        width={"200px"}
                        height={"200px"}
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item" id={`carosal_Item_3`}>
                      <img
                        src={Food3}
                        class="d-block"
                        width={"200px"}
                        height={"200px"}
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev"
                    style={{ border: "none" }}
                    onClick={(e) => {
                      this.onSlideClick("prev");
                    }}
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden"></span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next"
                    style={{ border: "none " }}
                    onClick={(e) => {
                      this.onSlideClick("next");
                    }}
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden"></span>
                  </button>
                </div>
              </section>
            </section>
          )}
          {this.state.aboutEnable && (
            <section
              className="col-lg-12 col-md-12 col-sm-12 aboutContent-wrapper mt10"
              style={{
                background: "white",
                display: "flex",
                padding: "15px",
                border: "1px solid #ddd",
                "border-radius": "15px",
                "box-shadow": "1px 2px 2px 0px",
              }}
            >
              <section
                className="col-md-4 col-lg-4 col-sm-4 mt10"
                style={{ textAlign: "center" }}
              >
                <img src={Logo} width={"250px"} height={"250px"} alt="logo" />
              </section>
              <section className="col-lg-8 col-md-8 col-sm-8 mt10">
                <p className="mt10">
                  Our Desi Foods has home cooked foods items.We are in this
                  feild for past three decades and we do offer for franchise
                </p>
                <p className="mt10">
                  Our Desi Foods offers a delectable array of home-cooked Indian
                  dishes, crafted with love and expertise honed over three
                  decades in the culinary field. Inspired by our experiences as
                  international students craving authentic home-cooked meals, we
                  noticed a gap in the market for such offerings in Tally. Thus,
                  we envisioned a platform where people could not only share
                  their homemade delights but also earn from their culinary
                  skills.
                </p>
                <p className="mt10">
                  Indian cuisine, steeped in tradition and diversity, is a
                  testament to the country's rich cultural tapestry. From the
                  robust flavors of North Indian gravies and bread to the
                  aromatic spices of South Indian delicacies, each region boasts
                  its own unique culinary heritage.
                </p>
                <p className="mt10">
                  In the North, savor the richness of butter chicken, tandoori
                  delights, and succulent kebabs. Journey South for the
                  tantalizing taste of dosas, idlis, and spicy sambars, enriched
                  with coconut and seafood. Head East to indulge in freshwater
                  fish curries, sweet roshogollas, and comforting rice cakes.
                  Meanwhile, in the West, revel in the diverse flavors of
                  dhoklas, spicy curries, and delightful sweets like modaks and
                  shrikhand.
                </p>
                <p className="mt10">
                  Our franchise offers you the opportunity to bring the warmth
                  and flavors of home-cooked Indian meals to your community,
                  bridging the gap between nostalgia and convenience. Join us in
                  celebrating the richness of Indian cuisine while creating a
                  rewarding culinary venture for yourself.
                </p>
              </section>
            </section>
          )}
          {this.state.listEnable && (
            <section className="col-lg-12 col-md-12 col-sm-12 listContent-wrapper">
              {this.state.cartMsg !== "" && (
                <div
                  className="col-lg-12 col-md-12 col-sm-12"
                  style={{
                    "font-size": "30px",
                    "font-weight": "bold",
                    color: "green",
                    background: "white",
                    "border-radius": "15px",
                  }}
                >
                  {this.state.cartMsg}
                </div>
              )}
              {this.state.itemData.map((item, i) => {
                return (
                  <section
                    key={i}
                    className="box-shadow col-lg-3 col-md-3 col-sm-4 col-xs-6 mt10"
                  >
                    <section className="cardContainer col-lg-12 col-md-12 col-xs-12">
                      <section className="col-lg-12 col-md-12 col-xs-12 p0 mt10">
                        <h4 className="my-0 font-weight-normal">
                          {item.itemNameToAdd}
                        </h4>
                      </section>
                      <section className="col-lg-12 col-md-12 col-xs-12 p0 mt10">
                        <img
                          src={
                            item.itemCategory &&
                            item.itemCategory.toLowerCase().includes("sides")
                              ? Sides
                              : MainDishes
                          }
                          width="200px"
                          height="200px"
                          alt="cart "
                        />
                        <h3 className="mt10">
                          ${item.itemPrice}{" "}
                          <small className="text-muted">/ per piece</small>
                        </h3>
                        <ul className="list-unstyled mt-3 mb-4 mt10">
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
                          className="btn btn-lg btn-block btn-primary mt10"
                        >
                          Add
                        </button>
                      </section>
                    </section>
                    <ItemModal
                      item={item}
                      key={i}
                      currentId={i}
                      onAddCart={this.onAddCart}
                    />
                  </section>
                );
              })}
            </section>
          )}
          {this.state.statisticsEnable && !this.state.statisticsEmpty && (
            <section className="col-lg-12 col-md-12 statistics-wrapper">
              <section className="col-lg-12 col-md-12 col-sm-12 statisticsTable">
                {this.state.orderStatistics.map((item, i) => {
                  return (
                    <section
                      className="col-lg-12 col-md-12 col-sm-12 mt10"
                      style={{ display: "flex", background: 'white', 'border-radius': '15px', 'box-shadow': '1px 2px 2px 0px', height: '80px', padding:'15px' }}
                    >
                      <section className="col-lg-4 col-md-4 col-sm-4">
                      <img
                          src={
                            item.category &&
                            item.category.includes("sides")
                              ? Sides
                              : MainDishes
                          }
                          width="50px"
                          height="50px"
                          alt="cart "
                        />
                      </section>
                      <section className="col-lg-4 col-md-4 col-sm-4">
                        {item.itemName}
                      </section>
                      <section className="col-lg-4 col-md-4 col-sm-4">
                        ${item.orderPrice}
                      </section>
                    </section>
                  );
                })}
              </section>
              <section className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statistics-align mt10">
                <section className="col-lg-6 col-md-6 col-sm-6 col-xs-6 statistics-align-center" style={{'background': 'white',
    'padding': '10px',
    'border-radius': '15px',
    'text-align': 'center'}}>
                  <section className="col-md-6 col-lg-6 col-sm-6">
                    <strong>Total </strong>
                  </section>
                  <section className="col-md-6 col-lg-6 col-sm-6 " style={{fontSize: '20px', fontWeight: 'bold'}}>
                      ${this.state.TotalPrice}
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
              <p>
                your contribution till date for welfare of downtrodden people is{" "}
                <strong>{this.state.welfareAmount}</strong>
              </p>
            </section>
          )}
        </section>
      </section>
    );
  }
}

export default Demo;
