import React, { Component } from 'react';
import { Container, Row, Col, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import './Home.css';


class Home extends Component {
    componentDidMount() {
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
                            <ns2:getUser>\
                                <id>'+ auth_id + '</id>\
                            </ns2:getUser>\
                        </S:Body>\
                    </S:Envelope>';
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                console.log(auth_id);
                                var id = xhr.responseXML.documentElement.getElementsByTagName("id")[0].innerHTML;
                                var nama = xhr.responseXML.documentElement.getElementsByTagName("nama")[0].innerHTML;
                                var namaBank = xhr.responseXML.documentElement.getElementsByTagName("namaBank")[0].innerHTML;
                                var saldo = xhr.responseXML.documentElement.getElementsByTagName("saldo")[0].innerHTML;
                                var nama_user = document.getElementById("name");
                                nama_user.innerText = 'Hello, ' + nama;
                                var id_user = document.getElementById("id");
                                id_user.innerText = id;
                                var namaBank_user = document.getElementById("bank");
                                namaBank_user.innerText = namaBank;
                                var saldo_user = document.getElementById("balance");
                                saldo_user.innerText = saldo;
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
            <div className="Home">
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
                <div className="home-body">
                    <h1 className="name" id='name'><b>Hello, <span>Name</span>!</b></h1>
                    <Container>
                        <Row>
                            <Col><b>Account Number</b></Col>
                            <Col id='id'></Col>
                        </Row>
                        <Row>
                            <Col><b>Bank</b></Col>
                            <Col id='bank'>Name</Col>
                        </Row>
                        <Row>
                            <Col><b>Balance</b></Col>
                            <Col id='balance'>0</Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;
