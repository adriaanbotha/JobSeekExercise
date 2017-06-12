import React, {Component} from 'react';
import './JobAddForm.css';
import TextInput from '../../components/FormElements/TextInput/TextInput';
import TextArea from '../../components/FormElements/TextArea/TextArea';
import Select from '../../components/FormElements/Select/Select';
import Button from '../../components/FormElements/Button/Button';
const CATEGORIES = require('../../data/categories');
const PRICING_RULES = require('../../data/priceRules');

class JobAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobTitle: '',
      jobDescription: '',
      jobCategory: '',
      jobProduct: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleOnAddToCart = this.handleOnAddToCart.bind(this);
    this.handleOnClearCart = this.handleOnClearCart.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCategoryChange(category) {
    this.setState({jobCategory: category.label});
  }

  handleProductChange(product) {
    this.setState({jobProduct: product.label || ''});
  }

  handleOnAddToCart() {
    const cartPrice = PRICING_RULES.PRODUCT_PRICE.find((product) => {
      return product.label === this.state.jobProduct
    });

    if (this.state.jobTitle.length > 0
      && this.state.jobDescription.length > 0
      && this.state.jobCategory.length > 0
      && this.state.jobProduct) {
      const cartItem = Object.assign({},
        {jobTitle: this.state.jobTitle},
        {jobDescription: this.state.jobDescription},
        {jobCategory: this.state.jobCategory},
        {jobProduct: this.state.jobProduct},
        {jobPrice: cartPrice.price || 0});
      this.props.addToCart(cartItem);
    }
  }

  handleOnClearCart() {
    this.props.clearCart();
    this.setState({jobTitle: ''});
    this.setState({jobDescription: ''});
    this.setState({jobCategory: ''});
    this.setState({jobProduct: ''});
  }

  render() {
    const categories = CATEGORIES.CATEGORIES.map((cat) => {
      return {value: cat.label, label: cat.label};
    });
    const products = PRICING_RULES.PRODUCTS.map((product) => {
      return {value: product, label: product};
    });
    return (
      <div className="Job-Add-Form">
        <h2 className="Job-Add-Form-Heading">Jobs Add Form</h2>

        <TextInput
          name="jobTitle"
          label="Job Title"
          value={this.state.jobTitle}
          onChange={this.handleInputChange}/>

        <TextArea
          name="jobDescription"
          label="Description"
          onChange={this.handleInputChange}
          value={this.state.jobDescription}
          rows={10}
          resize={true}
          placeholder="Copy Paste you Description here...."/>

        <Select name="jobCategory"
                label="Category"
                value={this.state.jobCategory}
                options={categories}
                multi={false}
                allowCreate={false}
                onChange={this.handleCategoryChange}/>

        <Select name="jobProduct"
                label="Products"
                value={this.state.jobProduct}
                options={products}
                multi={false}
                allowCreate={false}
                onChange={this.handleProductChange}/>

        <div className="form-group-right">
          <button className="form-button-primary" onClick={this.handleOnAddToCart}>Add to Cart</button>
        </div>
        <div className="form-group-right">
          <button className="form-button-primary " onClick={this.handleOnClearCart}>Clear Cart</button>
        </div>
      </div>

    );
  }
}

export default JobAddForm;
