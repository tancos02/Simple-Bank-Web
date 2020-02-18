import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import './History.css';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
      }
     
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
                        fetch("http://localhost:3000/getTransaction/" + auth_id)
                          .then(res => res.json())
                          .then(parsedJSON => parsedJSON.values.map(data => (
                            {
                              id : `${data.id}`,
                              id_tujuan: `${data.id_tujuan}`,
                              waktu: Date(`${data.waktu}`),
                              status: `${data.status}`,
                            }
                          )))
                          .then(items => this.setState({
                            items,
                            isLoaded: false
                          }))
                          .catch(error => console.log('parsing failed', error))
                }
            }
        }
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(sr);
    }

    render() {
      const {items } = this.state;
      console.log(items);
      return (
          <div className="History">
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
              <div className="history-body">
                { 
                  items.length > 0 ? items.map(item => {
                    const {id,id_tujuan, waktu, status} = item;
                     return (
  			              <ol type="1">
  			              	<ul>
  			              		<b>Destination ID: <span className="listResult">{id_tujuan}</span></b><br/>
  			              		<b>Transaction Time:</b> <span className="listResult">{waktu}</span><br/>
  			              		<b>Transaction Type:</b> <span className="listResult">debit</span><br/>
  			              		<b>Transaction Amount:</b> <span className="listResult">45000</span><br/>
                          <b>Transaction Status:</b> <span className="listResult">{status}</span><br/>
  			              		<br/>
  			              	</ul>
  			              </ol>
                     );
                     }) : null
                }
              </div>
          </div>
      );
    }
  }


export default History;

