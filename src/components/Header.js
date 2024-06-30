import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="overlay">
          <h1>Рейтинг пользователей</h1>
          <h3>Присоединяйтесь к самому дружелюбному рейтингу личностей</h3>
        </div>
      </header>
    );
  }
}

export default Header;