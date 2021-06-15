import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import MarketComponent from "../market"

const api_address = "http://127.0.0.1"
let token = null

export default class Market extends React.Component {

  constructor(props) {
    super(props);
    this.state = { current_menu: 1, sub_menu: 0 , current_popup: 0, current_context_menu: 0, display_mode: 0, connected: 0, username: "", mouse: { pos_x: 0, pos_y: 0 } };

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
        {window.innerWidth >= 851 ?
          <div className="nav-panel-11ytpT">
            <div className="nav-list-item-f5LS2Q nav-logo-VNfkwf">
              <img className="nav-logo-img-70mO4Z" src="static/img/34black.png">
              </img>
            </div>
            <ul className="nav-ul-nFC27e">
              <li><Link to="/" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 0 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 0, sub_menu: 0 }); }} >Accueil</Link></li>
              <li><Link to="/market" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 1 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 1, sub_menu: 0 }); }} >Magasin</Link></li>
              <li><Link to="/" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 2 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 2, sub_menu: 0 }); }} >Banque</Link></li>
              <li><Link to="/" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 3 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 3, sub_menu: 0 }); }} >Livraisons</Link></li>
            </ul>
          </div>
          :
          <div className="menuToggle-vLnKOr">
            <input type="checkbox" className="menuCheckbox-OZJKwt" />

            <span></span>
            <span></span>
            <span></span>

            <ul className="nav-ul-slOMJy">
              <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 0 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 0, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Accueil</Link></li>
              <li><Link to="/market" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 1 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 1, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Magasin</Link></li>
              <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 2 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 2, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Banque</Link></li>
              <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 3 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 3, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Livraison</Link></li>
            </ul>

          </div>
        }

        {(this.state as any).connected == 1 ?
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
        <div className="">
          {(this.state as any).current_menu == 0 ?
            <div />
            :
            (this.state as any).current_menu == 1 ?
              // @ts-ignore
              <MarketComponent sub_menu={(this.state as any).sub_menu} setState={(state) => {this.setState(state);}} />
              :
              (this.state as any).current_menu == 2 ?
                <div />
                :
                (this.state as any).current_menu == 3 ?
                  <div />
                  :
                  <div />
          }
        </div>
        {(this.state as any).current_popup != 0 ?
          <div className="popup-panel-QQYSlt" onMouseDown={(e) => {
             if (e.target == document.querySelector(".popup-panel-QQYSlt")) {
               this.setState({ current_popup: 0 }); 
            }
             }}>
            <div className="popup-window-BzbmIx">
              {(this.state as any).current_popup == 1 ?
                <div className="window-content-c8uDUJ">
                  <h1 className="popup-title-PRs93H">Connexion</h1>
                  <div className="content-NnWxgO">
                    {/* <div className="connection-label-NseI5S">Pseudo</div> */}
                    <input type="text" className="username-textbox-AbSK30" autoFocus={true} placeholder="Pseudo" onKeyUp={(e) => { if (e.key === 'Enter' || e.keyCode === 13) { this.Connect(); } }}></input>
                    {/* <div className="connection-label-NseI5S">Mot de passe</div> */}
                    <input type="password" className="username-textbox-AbSK30 password-textbox-K8MPTQ" placeholder="Mot de passe" onKeyUp={(e) => { if (e.key === 'Enter' || e.keyCode === 13) { this.Connect(); } }}></input>
                    <div className="connection-button-eUceul" onClick={() => { this.Connect() }}>Connexion</div>
                    <div className="connection-label-u1i3hB">Pas de compte ?<a>Inscription</a></div>
                  </div>
                </div>
                :
                <div></div>
              }
              {/* <svg className="popup-close-6K4qlC" width="24" viewBox="0 0 4 4" onClick={() => { this.setState({ current_popup: 0 }); }}>
                <path fill="currentColor" d="M 0.35 0 L 2 1.65 L 3.65 0 L 4 0.35 L 2.35 2 L 4 3.65 L 3.65 4 L 2 2.35 L 0.35 4 L 0 3.65 L 1.65 2 L 0 0.35 Z"></path>
              </svg> */}
            </div>
          </div>
          :
          <div></div>
        }
        <div className="context-menu-w22PiE" style={{ top: (this.state as any).mouse.pos_y, left: (this.state as any).mouse.pos_x }}>
          {(this.state as any).current_context_menu == 1 ?
            <ul className="context-menu-ul-YmmkjU">
              <li><a className="context-menu-element-GiP6Ll" onClick={() => { 
            document.cookie = `token=; expires=${new Date().toUTCString()};path=/;SameSite=None; Secure`
            this.setState({ connected: 0 }); 
            }}>Déconnexion</a></li>
            </ul>
            :
            <div></div>
          }
        </div>
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