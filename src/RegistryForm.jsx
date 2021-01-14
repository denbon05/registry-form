import React from 'react';
import './RegistryForm.css';

class RegistryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="form-container">
        <form className="form">
          <div className="form-item">
            <label htmlFor="formNameInput">Username:</label>
            <input
              required
              type="text"
              className="input-filed"
              name="name"
              id="formNameInput"
            />
          </div>
          <div className="form-item">
            <label htmlFor="formPasswordInput">Password:</label>
            <input
              required
              type="password"
              className="input-filed"
              id="formPasswordInput"
            />
          </div>

          <div className="form-item">
            <input type="submit" value="Sign Up" id="formButton" />
          </div>
        </form>
      </div>
    );
  }
}

export default RegistryForm;
