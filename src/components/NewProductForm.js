import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../constants';

class NewProductForm extends React.Component {
  state = {
    id: 0,
    name: "",
    price: "",
    quantity: "",
  };

  componentDidMount() {
    if (this.props.product) {
      const { id, name, price, quantity} = this.props.product;
      this.setState({ id, name, price, quantity });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createProduct = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editProduct = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.product ? this.editProduct : this.createProduct}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="char"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price:</Label>
          <Input
            type="float"
            name="price"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.price)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity:</Label>
          <Input
            type="integer"
            name="quantity"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.quantity)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewProductForm;