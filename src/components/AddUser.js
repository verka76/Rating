import React, { Component } from 'react';
import '../css/modal.css';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      patronymic: '',
      birthDate: '',
      phoneNumber: '',
      department: '',
      rankingPosition: '',
      users: []
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBirthDateChange = (e) => {
    this.setState({ birthDate: e.target.value });
  };

  handleRankingPositionChange = (e) => {
    this.setState({ rankingPosition: e.target.value });
  };


  handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, patronymic, birthDate, phoneNumber, department, rankingPosition } = this.state;

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          patronymic,
          birthDate,
          phone: phoneNumber,
          department,
          positionInRating: rankingPosition,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        this.props.onClose();
        window.location.reload();
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  render() {
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="signup__container">
            <div className="container__child signup__thumbnail">
              <div className="thumbnail__logo"></div>
              <div className="thumbnail__content text-center">

              </div>
              <div className="signup__overlay"></div>
            </div>
            <div className="container__child signup__form">
              <span className="close" onClick={this.props.onClose}>&times;</span>
              <h1 className="heading--primary">Добавление  пользователя </h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">Имя</label>
                  <input
                    className="form-control"
                    type="text"
                    pattern="[а-яА-ЯЁё]+"
                    name="firstName"
                    id="firstName"
                    onChange={this.handleChange}
                    title="Пожалуйста, введите имя, используя только русские буквы"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Фамилия</label>
                  <input
                    className="form-control"
                    type="text"
                    pattern="[а-яА-ЯЁё]+"
                    title="Пожалуйста, введите фамилию, используя только русские буквы"
                    name="lastName"
                    id="lastName"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patronymic">Отчество</label>
                  <input
                    className="form-control"
                    type="text"
                    pattern="[а-яА-ЯЁё]+"
                    title="Пожалуйста, введите отчество, используя только русские буквы"
                    name="patronymic"
                    id="patronymic"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate">Дата рождения</label>
                  <input
                    className="form-control"
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    required
                    onChange={this.handleBirthDateChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Телефон</label>
                  <input
                    className="form-control"
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    title="Пожалуйста, введите действительный телефонный номер в формате: +7(XXX)-XXX-XX-XX"
                    pattern="^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Отдел</label>
                  <input className="form-control" type="text" pattern="[а-яА-ЯЁё]+" name="department" id="department" required onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="rankingPosition">Позиция в рейтинге</label>
                  <input
                    className="form-control"
                    type="number"
                    name="rankingPosition"
                    id="rankingPosition"
                    onChange={this.handleRankingPositionChange}
                    value={this.state.rankingPosition}
                    required
                  />
                </div>

                <div className="m-t-lg">
                  <input className="btn btn--form" type="submit" value="Добавить" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;