import React from 'react';
import { 
  Container, Row, Col, Card, Input,
  CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button 
} from 'reactstrap';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  state = {
    users: [],
    usersSearch: ""
  };
  

  componentDidMount() {
    axios
    .get('https://api.github.com/users/eddiemadrigal')
    .then (res => {
      // console.log("Data: ", res.data);
      this.setState({
        users: res.data
      });
      console.log("Users array: ", this.state.users)
    })
    .catch (err => console.log(err));
  }

  handleChanges = e => {
    this.setState({
      usersSearch: e.target.value
    });
  };

  fetchUsers = e => {
    e.preventDefault();
    axios
    .get(`https://api.github.com/users/${this.state.usersSearch}`)
    .then( res => {
      this.setState ({
        users: res.data
      });
    })
    .catch(err => console.log('Error: ', err));
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1>GitHub User Search</h1>
                <Row form>
                  <Col md={{ size: 9 }}>
                    <Input placeholder="GitHub User Name" value = { this.state.usersSearch }  onChange = { this.handleChanges } />
                  </Col>
                  <Col md={{ size: 3 }}>
                    <Button color="success" onClick = { this.fetchUsers }>Search</Button>
                  </Col>
                </Row>
              <Card className="card-info">
                <CardImg top width="100%" src={ this.state.users.avatar_url } alt="GitHub profile pic" />
                <CardBody>
                  <CardTitle><h2>{ this.state.users.name }</h2></CardTitle>
                  <CardSubtitle><b>Login: { this.state.users.login }</b></CardSubtitle>
                  <CardText>Bio: { this.state.users.bio }</CardText>
                  <Button href={ this.state.users.html_url } target="_blank" color="primary">Learn More</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default App;