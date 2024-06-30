import React, { Component } from 'react';
import '../css/modal.css';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      patronymic: '',
      birth_date: '',
      phone: '', 
      department: '',
      position_in_rating: '', 
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      const {
        first_name,
        last_name,
        patronymic,
        birth_date,
        phone, 
        department,
        position_in_rating, 
      } = user;
      this.setState({
        first_name: first_name || '',
        last_name: last_name || '',
        patronymic: patronymic || '',
        birth_date: birth_date ? new Date(birth_date).toISOString().slice(0, 10) : '',
        phone: phone || '',
        department: department || '',
        position_in_rating: position_in_rating || '',
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  };
  handleBirthDateChange = (e) => {
    this.setState({ birth_date: e.target.value });
  };

  handleRankingPositionChange = (e) => {
    this.setState({ position_in_rating: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userId } = this.props;
    const {
      first_name,
      last_name,
      patronymic,
      birth_date,
      phone,
      department,
      position_in_rating,
    } = this.state;

    const userData = {
      first_name,
      last_name,
      patronymic,
      birth_date,
      phone,
      department,
      position_in_rating,
    };
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); 
        this.props.onClose();
        window.location.reload();
      } else {
        throw new Error('Не удалось обновить пользователя');
      }
    } catch (error) {
      console.error('Произошла ошибка!', error);
    }
  };

  render() {
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="signup__container">
            <div className="container__child signup__thumbnail">
              <div className="thumbnail__logo"></div>
              <div className="thumbnail__content text-center"></div>
              <div
                className="signup__overlay"
                style={{
                  backgroundImage: "url('https://i.pinimg.com/564x/5b/13/6e/5b136ea604347f74ab846aca452023ec.jpg')",
                  backgroundSize: "cover"
                }}
              ></div>
            </div>
            <div className="container__child signup__form">
              <span className="close" onClick={this.props.onClose}>&times;</span>
              <h1 className="heading--primary">Редактирование пользователя</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="first_name">Имя</label>
                  <input
                    className="form-control"
                    type="text"
                    pattern="[а-яА-ЯЁё]+"
                    name="first_name"
                    id="first_name"
                    value={this.state.first_name || ''}
                    onChange={this.handleChange}
                    title="Пожалуйста, введите имя, используя только русские буквы"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Фамилия</label>
                  <input
                    className="form-control"
                    type="text"
                    pattern="[а-яА-ЯЁё]+"
                    name="last_name"
                    id="last_name"
                    value={this.state.last_name || ''}
                    onChange={this.handleChange}
                    required
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
                    value={this.state.patronymic || ''}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birth_date">Дата рождения</label>
                  <input
                    className="form-control"
                    type="date"
                    name="birth_date"
                    id="birth_date"
                    value={this.state.birth_date || ''}
                    onChange={this.handleBirthDateChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    type="tel"
                    pattern="^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$"
                    name="phone"
                    id="phone"
                    value={this.state.phone || ''}
                    onChange={this.handlePhoneChange}
                    title="Пожалуйста, введите действительный телефонный номер в формате: +7(XXX)XXX-XX-XX"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Отдел</label>
                  <input
                    className="form-control"
                    type="text"
                    pattern="[а-яА-ЯЁё]+"
                    name="department"
                    id="department"
                    value={this.state.department || ''}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position_in_rating">Позиция в рейтинге</label>
                  <input
                    className="form-control"
                    type="number"
                    name="position_in_rating"
                    id="position_in_rating"
                    value={this.state.position_in_rating || ''}
                    onChange={this.handleRankingPositionChange}
                    required
                  />
                </div>
                <div className="m-t-lg">
                  <input className="btn btn--form" type="submit" value="Сохранить" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser; 