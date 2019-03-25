import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
      currency: {},
      convert_from:'',
      convert_to:'',
      exchange_rates:'',
      check_convert: false,
    };
    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);
    swapping = this.swapping.bind(this);

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      check_convert: false
    });
  }

  handleSubmit(event) {
    if(this.state.convert_to in this.state.currency.rates){
      this.setState({
         exchange_rates: this.state.currency.rates[this.state.convert_to],
         check_convert: true
      })
    }
    event.preventDefault();
  }
  swapping(event){
    
    this.setState({
      convert_from: this.state.convert_to,
      convert_to: this.state.convert_from,
      check_convert: false
    })
    event.preventDefault();
  }
  fetchData = () =>{
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.convert_from}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Bad response");
      }
      return response.json();
    })
    .then(responseData => {
      this.setState({
        currency: responseData
      });
    })
    .catch(error => console.error(error));
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    this.fetchData();
  }
  render() {
    let userMessage;
    if (this.state.check_convert == true) {
      userMessage = (
        <div className="wrapper-exchange">
          <div><p className="first_text_exchange">1 {this.state.convert_from} = </p></div> 
          <div><p className="text_exchange">{this.state.exchange_rates} {this.state.convert_to}</p></div>
        </div>
      )
    }
    else {
      userMessage = (
        <p></p>
      )
    }
    return (
      <section className="currency">
         <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>Currency Converter</h1>
                <div className="wrapper-currency">
                  
                  <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group mr-sm-2">
                   
                      <input placeholder="Convert From" className="form-control  mr-sm-2"  type="text" name="convert_from" value={this.state.convert_from} onChange={this.handleChange} />
                    
                    </div>
                    <div className="wrapper-switch-icon">
                      <a className="swap-button mr-sm-2" onClick={this.swapping}>
                        <i class="desktop-icon material-icons">swap_horiz</i>
                        <i class="mobile-icon material-icons">swap_vert</i>
                      </a>
                    </div>
                  
                    <div className="form-group mr-sm-2">
                        <input placeholder="Convert To" className="form-control mr-sm-2" type="text" name="convert_to" value={this.state.convert_to} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary mr-sm-2">Convert</button>
                  </form>
                </div>
                  
              </div>
            </div>  
            {userMessage}
            
          </div>
      </section>
    );
  }
}

export default App;
