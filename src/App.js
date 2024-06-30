import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import User from './components/User';
import AddUser from './components/AddUser';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="centered">
        <button type='submit' onClick={this.openModal}>Добавить</button>
        {this.state.isModalOpen && <AddUser onClose={this.closeModal} />}
      </div>
        <div className="main-content">
          <User />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;