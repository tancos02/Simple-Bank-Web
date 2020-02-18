import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id] : event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var validation = false;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/WebService/UserService?wsdl', true);
        var sr = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
                    <SOAP-ENV:Header/>\
                    <S:Body xmlns:ns2="http://webService/">\
                        <ns2:validateUser>\
                            <id>' + this.state.user + '</id>\
                        </ns2:validateUser>\
                    </S:Body>\
                </S:Envelope>';
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    validation = xhr.responseXML.documentElement.getElementsByTagName("return")[0].innerHTML;
                    console.log(validation);
                    if (validation == "true") {
                        xhr.open("POST", 'http://localhost:8080/WebService/UserService?wsdl', true);
                        var sr2 = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
                                <SOAP-ENV:Header/>\
                                <S:Body xmlns:ns2="http://webService/">\
                                    <ns2:updateAuthId>\
                                        <id>' + this.state.user + '</id>\
                                    </ns2:updateAuthId>\
                                </S:Body>\
                            </S:Envelope>';
                        xhr.onreadystatechange = () => {
                            if(xhr.readyState == 4) {
                                if(xhr.status == 200) {
                                    validation = xhr.responseXML.documentElement.getElementsByTagName("return")[0].innerHTML;
                                    console.log(validation);
                                    if(validation == "true") {
                                        this.props.history.push("/");
                                    }
                                }
                            }
                        }
                        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                        xhr.setRequestHeader('Content-Type', 'text/xml');
                        xhr.send(sr2);
                    }
                    else {
                        alert("Invalid user id !");
                        this.setState({user : ''});
                    }
                }
            }
        }
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(sr);
    }
    
    render() {
        return (
            <div className="Login">
                <Card>
                    <Card.Body>
                        <Card.Title>Welcome to Bank <b>Pro</b>!</Card.Title>
                        <Card.Text>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="user">
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control type="accountNo" value={this.state.user} onChange={this.handleChange} placeholder="place here"/>
                                </Form.Group>
                                <div className="form-footer">
                                    <Button variant="primary" type="submit" className="btn btn-primary btn-block">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}

export default Login;

