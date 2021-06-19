import React from "react";
import Market from "./market/market"
import Error from './error/error';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

const api_address = "http://127.0.0.1"
let token = null

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { current_menu: 0, sub_menu: 0, current_popup: 0, current_context_menu: 0, display_mode: 0, connected: 0, username: "", mouse: { pos_x: 0, pos_y: 0 }, market_items: null};

    window.onresize = () => {
      if (window.innerWidth < 851) {
        if ((this.state as any).display_mode != 1) {
          this.setState({ display_mode: 1 })
        }
      } else {
        if ((this.state as any).display_mode != 0) {
          this.setState({ display_mode: 0 })
        }
      }
    }
    window.onclick = (e) => {
      if ((this.state as any).current_context_menu < 0) {
        this.setState({ current_context_menu: (this.state as any).current_context_menu * -1 })
      } else {
        if ((this.state as any).current_context_menu != 0) { this.setState({ current_context_menu: 0 }) }
      }
    }

    // Auto-Reconnect
    if (getCookie("token") != "") {
      fetch("/api/users/@me", {
        headers: {
          Authorization: `token ${getCookie("token")}`
        },
        method: "GET"
      }).then(result => {
        result.json().then(result => {
          if (result.username) {
            this.setState({ connected: 1, username: result.username, current_popup: 0 })
          }
        })
      })
    }
  }
  render() {
    let username = (this.state as any).username // getCookie("username")
    return (
      <Router>


      <div className="nav">
            {window.innerWidth >= 851 ?
                <div className="nav-panel-11ytpT">
                    <div className="nav-list-item-f5LS2Q nav-logo-VNfkwf">
                        <Link to="/"><img className="nav-logo-img-70mO4Z" src="static/img/34black.png" /></Link>
                    </div>
                    <ul className="nav-ul-nFC27e">
                        <li><NavButton label="Accueil" to="/" activeOnlyWhenExact /></li>
                        <li><NavButton label="Magasin" to="/market" /></li>
                        <li><NavButton label="Banque" to="/bank" /></li>
                        <li><NavButton label="Livraision" to="/delivery" /></li>
                    </ul>
                </div>
                :
                <div className="menuToggle-vLnKOr">
                    <input type="checkbox" className="menuCheckbox-OZJKwt" />

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul className="nav-ul-slOMJy">
                        <li><NavButton label="Accueil" to="/" buttonclass="nav-list-item-riNYaO " activeOnlyWhenExact onClick={() => { let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} /></li>
                        <li><NavButton label="Magasin" to="/market" buttonclass="nav-list-item-riNYaO " onClick={() => { let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} /></li>
                        <li><NavButton label="Banque" to="/bank" buttonclass="nav-list-item-riNYaO " onClick={() => { let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} /></li>
                        <li><NavButton label="Livraision" to="/delivery" buttonclass="nav-list-item-riNYaO " onClick={() => { let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} /></li>
                        {/* <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 0 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 0, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Accueil</Link></li>
              <li><Link to="/market" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 1 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 1, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Magasin</Link></li>
              <li><Link to="/bank" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 2 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 2, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Banque</Link></li>
              <li><Link to="/delivery" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 3 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 3, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Livraison</Link></li> */}
                    </ul>

                </div>
            }

            {(this.state as any).connected == "1" ?
                <div className="profile-panel-uUfevr" onClick={(e) => {

                    this.setState({ current_context_menu: -1, mouse: { pos_x: window.innerWidth - document.querySelector(".profile-panel-uUfevr").clientWidth - 50, pos_y: 60 } })
                }}>
                    <img className="profile-picture-OCrkEg" src={`https://mc-heads.net/avatar/${username}`}></img>
                    <p className="profile-name-otAgcz">{username}</p>
                </div>
                :
                <div className="connection-panel-RAxQEm">
                    <a className="connection-button-VQjSiq" onClick={() => { this.setState({ current_popup: 1 }); }}>Connexion</a>
                </div>
            }
        </div>


        <Switch>
          <Route exact path="/">
            <div />
          </Route>
          <Route path="/market">
            <div id="market"><Market items={(this.state as any).market_items} updateMarket={() => {
              fetch("/api/market/items").then(result => {
                result.json().then(x => {
                    if (result.status == 200) {
                        console.log("Market refresh")
                        this.setState({market_items: x.sort((a, b) => { a.name - b.name })})
                    } else {
                        console.error(x)
                    }
                })
            })}} /></div>
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>


      </Router>
    );
  }

  Connect() {
    let username = (document.querySelector('.username-textbox-AbSK30') as any).value;
    let password = (document.querySelector('.password-textbox-K8MPTQ') as any).value;
    fetch("/api/login", {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
      method: "POST"
    }).then(result => {
      if (result.status < 400) {
        result.json().then(result => {
          if (result.token) {
            var d = new Date();
            d.setTime(d.getTime() + 2592000000);
            document.cookie = `token=${result.token}; expires=${d.toUTCString()};path=/;SameSite=None; Secure`
            this.setState({ connected: 1, username: username, current_popup: 0 })
          }
        })
      }
    })
  }

  Header() {
    
  }
}

function NavButton({ label, to, buttonclass = "nav-list-item-f5LS2Q", activeOnlyWhenExact = false, onClick = (() => { }) }) {
  let match = useRouteMatch({ path: to, exact: activeOnlyWhenExact });
  console.log(`Home : ${(match && "selected")}`);
  return (<Link to={to} className={`${buttonclass} nav-list-button-Cidx8z ${(match && "selected")}`} onClick={() => { onClick() }}>{label}</Link>);
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}