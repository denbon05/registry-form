import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import validate from './validator';
import './RegistryForm.css';

const url = 'localhost'

const offDangerFor = (item = 'all') => {
  if (item === 'all') {
    const dangerFieldsEl = _.values(document.getElementsByClassName('danger'));
    dangerFieldsEl.forEach((el) => el.classList.remove('danger'));
    const errDivElements = document.querySelectorAll('.err');
		_.values(errDivElements).forEach((el) => el.remove());
		return;
	}
	const currentDangerFieldEl = document.getElementById(item);
	currentDangerFieldEl.classList.remove('danger');
	const errDivEl = currentDangerFieldEl.parentElement.querySelector('.err');
	if (errDivEl) errDivEl.remove();
};

const errorOn = (on, error = null) => {
  const getNameOfInput = (err) => _.head(_.words(err));
  const nameInput = getNameOfInput(error);
  if (!on) {
    offDangerFor('all');
    console.log('errOff');
  } else {
    offDangerFor('all');
    const formFieldEl = document.getElementById(nameInput);
    formFieldEl.classList.add('danger');
    const divErrEl = document.createElement('div');
    divErrEl.className = 'err';
    divErrEl.textContent = error;
    formFieldEl.parentElement.appendChild(divErrEl);
  }
};

const sendData = async (data) => await axios.post(url, data);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
      },
      status: 'filling',
      error: null,
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    try {
      await validate(data);
      offDangerFor('all');
      this.setState({ status: 'sending' });
      setTimeout(() => {
				sendData(data).then((res) => {
					console.log('response=>', res);
					this.setState({ status: 'success', data: { username: '', password: '' } });
				})
			}, 500);
    } catch (error) {
      console.log('validate-message=>>', error.message);
      if (error.name === 'ValidationError') errorOn(true, error.message);
      if (error.name === 'NetErr') this.setState({ status: 'failed', error });
    }
  };

  handlerInput = (dataType) => ({ target }) => {
    const { data } = this.state;
    offDangerFor(target.id);
    this.setState({ data: { ...data, [dataType]: target.value } });
  };

  render() {
    const { status, error, data } = this.state;
    const buttonOff = status === 'sending';
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.submitForm}>
          {status === 'failed' && <div className="danger">{error}</div>}
          {status === 'success' && <div className="success">Registered success!</div>}
          <div className="form-item">
            <label htmlFor="username">Username:</label>
            <input
              value={data.username}
              onChange={this.handlerInput('username')}
              type="text"
              className="input-filed"
              aria-label="username"
              id="username"
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <input
              value={data.password}
              onChange={this.handlerInput('password')}
              type="password"
              aria-label="password"
              className="input-filed"
              id="password"
            />
          </div>

          <div className="form-item">
            <input disabled={buttonOff} type="submit" value="Sign Up" id="formButton" />
          </div>
        </form>
      </div>
    );
  }
}
