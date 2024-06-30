import React, { Component } from 'react';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { MdOutlineEdit } from 'react-icons/md';
import EditUser from './EditUser';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      showEditUser: false,
      userToEdit: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ users: data });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  
  deleteUser = (user_id) => {
    if (!user_id) {
      console.error('Неверный идентификатор пользователя');
      return;
    }
  
    const url = `http://localhost:5000/users/${user_id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`DELETE ${url} не удался: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);  
        this.setState(prevState => ({
          users: prevState.users.filter(user => user.user_id !== user_id)
        }));
      })
      .catch(error => {
        console.error('Ошибка при удалении пользователя:', error);
      });
  };
  openEditUser = (user) => {
    this.setState({
      showEditUser: true,
      userToEdit: user
    });
  };
  closeEditUser = () => {
    this.setState({
      showEditUser: false,
      userToEdit: null
    });
  };

  render() {
    const users = this.state.users;
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => a.position_in_rating - b.position_in_rating);

    const formatBirthDate = (birthdate) => {
      const date = new Date(birthdate);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('ru-RU', options);
    };

    const renderUserCard = (user) => {
      return (
        <div key={user.user_id} className="card" style={{ margin: '0 10px', boxShadow: user.position_in_rating >= 1 && user.position_in_rating <= 2 ? '0 0 20px #ffed66' : 'none' }}>
          <div className="card-header" style={{ backgroundImage: "url(https://i.pinimg.com/564x/33/e5/3d/33e53d58955602d75b1623f6d07d16c0.jpg)" }}>
            <div className="card-header-bar">
              <TiUserDeleteOutline
                className='delete-icon'
                onClick={() => this.deleteUser(user.user_id)}
              />
              <MdOutlineEdit
                className='edit-icon'
                onClick={() => this.openEditUser(user)}
              />
            </div>
            <div className="card-header-slanted-edge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200"><path className="polygon" d="M-20,200,1000,0V200Z" /></svg>
              <div className="rating-star">
                <div className="rating">
                  <div className="new-rating" style={{ color: "black" }}>
                    {user.position_in_rating}
                  </div>
                </div>
                <div className="rating-corners-one">
                  <div className="corner two"></div>
                  <div className="corner four"></div>
                  <div className="corner six"></div>
                  <div className="corner eight"></div>
                </div>
                <div className="rating-corners-two">
                  <div className="corner one"></div>
                  <div className="corner three"></div>
                  <div className="corner five"></div>
                  <div className="corner seven"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="user-info">
              <h2 className="name">{user.first_name} {user.last_name} {user.patronymic}</h2>
              <div className="bio">
                <p><strong>Дата рождения:</strong> {formatBirthDate(user.birth_date)}</p>
                <p><strong>Телефон:</strong> {user.phone}</p>
                <p><strong>Отдел:</strong> {user.department}</p>
              </div>
              <div className="social-accounts">
              </div>
            </div>
          </div>
          <div className="card-footer">
          </div>
        </div>
      );
    };

    const userCards = sortedUsers.map(user => renderUserCard(user));

    const userRows = [];
    let i = 0;
    while (i < userCards.length) {
      userRows.push(
        <div key={i} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {userCards.slice(i, i + 3)}
        </div>
      );
      i += 3;
    }

    return (
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {userRows}
        {this.state.showEditUser && (
  <EditUser
    user={this.state.userToEdit}
    userId={this.state.userToEdit.user_id} 
    onClose={this.closeEditUser}
  />
)}
      </div>
    );
  }
}

export default User;

