import React, { Component} from 'react';
import { Navbar, NavItem, Card, Form, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import './Transfer.css';

class Transfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_transaksi: '',
            rekening:'',
            uang:''
        };
        console.log(this.props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.submitChange = this.submitChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id] : event.target.value});
        console.log(event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        var validation = false;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/WebService/UserService?wsdl', true);
        var sr = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
            <SOAP-ENV:Header/>\
            <S:Body xmlns:ns2="http://webService/">\
                <ns2:getAuthId/>\
            </S:Body>\
        </S:Envelope>';
        var auth_id = 0;
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    auth_id = xhr.responseXML.documentElement.getElementsByTagName("return")[0].innerHTML;
                    xhr.open("POST", 'http://localhost:8080/WebService/UserService?wsdl', true);
                    var sr2 = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
                                <SOAP-ENV:Header/>\
                                <S:Body xmlns:ns2="http://webService/">\
                                    <ns2:transferUang>\
                                        <uang>' + this.state.uang + '</uang>\
                                        <id_asal>'+ auth_id +'</id_asal>\
                                        <id_va>' + this.state.tujuan + '</id_va>\
                                    </ns2:transferUang>\
                                </S:Body>\
                            </S:Envelope>';
                     xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                validation = xhr.responseXML.documentElement.getElementsByTagName("return")[0].innerHTML;
                                console.log(xhr.responseXML.documentElement);
                                console.log(validation);
                                if (validation == "true") {
                                    alert("Transaksi Sukses !");
                                    const url = 'http://localhost:3000/updateStatus';
                                    const Data = {
                                        id : this.state.id_trans,
                                        status : 'success'
                                    };
                                    const otherParam = {
                                        headers:{
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify(Data),
                                        method:"POST",
                                        mode: 'cors'
                                    };
                                    fetch(url,otherParam).then(data=>{console.log(data.json())}).catch(error=>console.log(error))
                                }
                                else {
                                    alert("Transaksi gagal !\nUang tidak mencukupi");
                                    this.setState({id_trans : ''});
                                    this.setState({uang : ''});
                                    this.setState({tujuan : ''});
                                }
                            }
                        }
                    }
                    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                    xhr.setRequestHeader('Content-Type', 'text/xml');
                    xhr.send(sr2);
                }
            }
        }
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(sr);
    }
    render() {
        return (
            <div className="Transfer">
                <Navbar className="Navbar" fixed="top">
                    <Navbar.Brand href="/"><b>Bank <span>Pro</span></b></Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <LinkContainer to="/transfer">
                                    <NavItem className="btn-navbar">Transfer</NavItem>
                                </LinkContainer>
                            </Navbar.Text>
                            <Navbar.Text>
                                <LinkContainer to="/history">
                                    <NavItem className="btn-navbar">Transaction History</NavItem>
                                </LinkContainer>
                            </Navbar.Text>
                            <Navbar.Text>
                                <LinkContainer to="/login">
                                    <NavItem className="btn-navbar">Logout</NavItem>
                                </LinkContainer>
                            </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Card className="trans">
                    <Card.Body>
                    <Card.Text>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="user">
                        <Form.Label>ID Transaksi</Form.Label>
                        <Form.Control type="id_transaksi" value={this.state.user} onChange={this.handleChange} id="id_transaksi"/>
                        <Form.Label>Rekening tujuan</Form.Label>
                        <Form.Control type="rekening" value={this.state.user} onChange={this.handleChange} id="rekening"/>
                        <Form.Label>Jumlah uang</Form.Label>
                        <Form.Control type="uang" value={this.state.user} onChange={this.handleChange} id="uang"/>
                    </Form.Group>
                    <div className="form-footer">
                        <Button variant="primary" type="submit" className="btn btn-primary btn-block">
                            Transfer
                        </Button>
                    </div>
                </Form>
                </Card.Text>
                </Card.Body>
                </Card>
                {/* <form class="box">
                    <p>ID Transaksi</p>
                    <input type="id_transaksi" name="id_transaksi" id="id_transaksi"/>
                    <p>Rekening tujuan</p>
                    <input type="rekening" name="rekening" id="rekening"/>
                    <p>Jumlah uang</p>
                    <input type="uang" name="uang" id="uang"/>
                    <input type="submit" name="submit" onClick={this.handleSubmit}/>
                </form> */}
            </div>
        )
    }
}

export default Transfer;
