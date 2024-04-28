import React from "react";
import axios from "axios";

class ManageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemNameToAdd: "",
      itemCategory: "Sides",
      itemImage: "",
      itemPrice: "",
      itemOrigin: "",
      itemId: 0
    };
  }
 
  itemNameFunc = (e) => {
    this.setState({ itemNameToAdd: e.target.value });
  };
  itemCategoryFunc = (e) => {
    var element = document.getElementById("itemCategory");
    var category = element.options[element.selectedIndex].value;
    this.setState({ itemCategory: category });
  };
  itemImageFunc = (e) => {
    
    this.setState({ itemImage: e.target.value });
  };
  itemPriceFunc = (e) => {
    this.setState({ itemPrice: e.target.value });
  };
  itemOriginFunc = (e) => {
    this.setState({ itemOrigin: e.target.value });
  };
  itemIdFunc = (e) => {
    this.setState({ itemId: e.target.value });
  };
  onProceedFunc = (e) => {
    e.preventDefault();
    let d = new Date();
    document.getElementById("myForm").reset();
    let requestData = {
      itemNameToAdd: this.state.itemNameToAdd,
      itemCategory: this.state.itemCategory,
      itemImage: this.state.itemImage,
      itemPrice: this.state.itemPrice,
      itemOrigin: this.state.itemOrigin,
      itemId: this.state.itemId
    };
    console.log(requestData);
    axios.post("http://localhost:5000/itemsDetails/add", requestData)
      .then((res) => console.log(res))
  };

  render() {
    return (
      <section className="container">
        <section className="manageItem-wrapper col-md-12 col-lg-12 col-sm-12">
          <section className="col-md-6 col-lg-6 col-sm-6 col-xs-12 manageItem ">
            <section className="col-md-12 col-lg-12 col-sm-12 p0">
              <h2>You can add your dish</h2>
            </section>
            <form onSubmit={this.onProceedFunc} id="myForm">
              <section className="row">
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <strong>Item to be Added</strong>
                </section>
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <input
                    type="text"
                    className="form-control"
                    name={this.state.itemNameToAdd}
                    placeholder="Item to be Added"
                    onChange={this.itemNameFunc.bind(this)}
                  />
                </section>
              </section>
              <section className="row">
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <strong>Item category</strong>
                </section>
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <select
                    id="itemCategory"
                    className="custom-select"
                    onChange={this.itemCategoryFunc.bind(this)}
                  >
                    <option>Sides</option>
                    <option>Main Dish</option>
                  </select>
                </section>
              </section>
              <section className="row">
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <strong>Item Price</strong>
                </section>
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <input
                    type="text"
                    className="form-control"
                    name={this.state.itemPrice}
                    placeholder="Item Price"
                    onChange={this.itemPriceFunc.bind(this)}
                  />
                </section>
              </section>
              <section className="row">
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <strong>Item Id</strong>
                </section>
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <input
                    type="text"
                    className="form-control"
                    name={this.state.itemId}
                    placeholder="Item Id"
                    onChange={this.itemIdFunc.bind(this)}
                  />
                </section>
              </section>
              <section className="row">
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <strong>Origin of Adding Item</strong>
                </section>
                <section className="col-md-6 col-lg-6 col-sm-6 ">
                  <input
                    type="text"
                    className="form-control"
                    name={this.state.itemOrigin}
                    placeholder="Item Origin"
                    onChange={this.itemOriginFunc.bind(this)}
                  />
                </section>
              </section>
              <section className="row">
                <input
                  type="submit"
                  className="btn btn-block btn-primary btn-checkout"
                  value="Proceed to confirm"
                />
              </section>
            </form>
          </section>
        </section>
      </section>
    );
  }
}
export default ManageItem;
