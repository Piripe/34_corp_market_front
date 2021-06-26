import React from "react";
import Home from "./home/home";
import Market from "./market/market";
import Error from "./error/error";
import Cart from "./cart/cart";
import Bank from "./bank/bank";
import Delivery from "./delivery/delivery";
import DeliveryPanel from "./delivery/panel";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

const api_address = "http://127.0.0.1";
let token = null;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_menu: 0,
      sub_menu: 0,
      current_popup: 0,
      current_popup_noclose: 0,
      popup: { title: "", text: "", action: () => {}, action2: () => {} },
      current_context_menu: 0,
      display_mode: 0,
      connected: 0,
      sold: 0,
      mouse: { pos_x: 0, pos_y: 0 },
      market_items: null,
      users: null,
      bank_history: null,
      deliveries: null,
      todelivery: null,
      mydelivery: null,
      featured: null,
      user: { username: "" },
    };

    window.onresize = () => {
      if (window.innerWidth < 851) {
        if ((this.state as any).display_mode != 1) {
          this.setState({ display_mode: 1 });
        }
      } else {
        if ((this.state as any).display_mode != 0) {
          this.setState({ display_mode: 0 });
        }
      }
    };
    window.onclick = (e) => {
      if ((this.state as any).current_context_menu < 0) {
        this.setState({
          current_context_menu: (this.state as any).current_context_menu * -1,
        });
      } else {
        if ((this.state as any).current_context_menu != 0) {
          this.setState({ current_context_menu: 0 });
        }
      }
    };

    // Auto-Reconnect
    this.autoReconnect();
  }
  render() {
    let username = (this.state as any).user.username; // getCookie("username")
    return (
      <Router>
        <div className="nav">
          {window.innerWidth >= 851 ? (
            <div className="nav-panel-11ytpT">
              <div className="nav-list-item-f5LS2Q nav-logo-VNfkwf">
                <Link to="/">
                  <img className="nav-logo-img-70mO4Z" src="/static/img/34black.png" />
                </Link>
              </div>
              <ul className="nav-ul-nFC27e">
                <li>
                  <NavButton label="Accueil" to="/" activeOnlyWhenExact />
                </li>
                <li>
                  <NavButton label="Magasin" to="/market" />
                </li>
                <li>
                  <NavButton
                    label="Banque"
                    to="/bank"
                    onClick={() => {
                      if (getCookie("token") != "") {
                        fetch("/api/history", {
                          headers: {
                            Authorization: `token ${getCookie("token")}`,
                          },
                          method: "GET",
                        }).then((result) => {
                          result.json().then((result) => {
                            this.setState({ bank_history: result });
                          });
                        });
                      }
                    }}
                  />
                </li>
                <li>
                  <NavButton
                    label="Livraison"
                    to="/delivery"
                    onClick={() => {
                      fetch("/api/deliveries", {
                        headers: {
                          Authorization: `token ${getCookie("token")}`,
                        },
                        method: "GET",
                      }).then((result) => {
                        result.json().then((result) => {
                          this.setState({ deliveries: result });
                        });
                      });
                    }}
                  />
                </li>
              </ul>
            </div>
          ) : (
            <div className="menuToggle-vLnKOr">
              <input type="checkbox" className="menuCheckbox-OZJKwt" />

              <span></span>
              <span></span>
              <span></span>

              <ul className="nav-ul-slOMJy">
                <li>
                  <NavButton
                    label="Accueil"
                    to="/"
                    buttonclass="nav-list-item-riNYaO "
                    activeOnlyWhenExact
                    onClick={() => {
                      let checkbox = document.querySelector(".menuCheckbox-OZJKwt");
                      if ((checkbox as any).checked) {
                        (checkbox as any).checked = false;
                      }
                    }}
                  />
                </li>
                <li>
                  <NavButton
                    label="Magasin"
                    to="/market"
                    buttonclass="nav-list-item-riNYaO "
                    onClick={() => {
                      let checkbox = document.querySelector(".menuCheckbox-OZJKwt");
                      if ((checkbox as any).checked) {
                        (checkbox as any).checked = false;
                      }
                    }}
                  />
                </li>
                <li>
                  <NavButton
                    label="Banque"
                    to="/bank"
                    buttonclass="nav-list-item-riNYaO "
                    onClick={() => {
                      let checkbox = document.querySelector(".menuCheckbox-OZJKwt");
                      if ((checkbox as any).checked) {
                        (checkbox as any).checked = false;
                      }
                    }}
                  />
                </li>
                <li>
                  <NavButton
                    label="Livraision"
                    to="/delivery"
                    buttonclass="nav-list-item-riNYaO "
                    onClick={() => {
                      let checkbox = document.querySelector(".menuCheckbox-OZJKwt");
                      if ((checkbox as any).checked) {
                        (checkbox as any).checked = false;
                      }
                    }}
                  />
                </li>
                {/* <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 0 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 0, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Accueil</Link></li>
              <li><Link to="/market" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 1 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 1, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Magasin</Link></li>
              <li><Link to="/bank" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 2 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 2, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Banque</Link></li>
              <li><Link to="/delivery" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 3 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 3, sub_menu: 0 }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Livraison</Link></li> */}
              </ul>
            </div>
          )}
          {(this.state as any).connected == "1" ? (
            <Link className="shopping-cart-nav-bar-button-Sti4sV" to="/bank">
              <map>{Math.floor((this.state as any).user.sold * 100) / 100}</map>
              <img className="nav-diamond-q5eqlR" src="/static/img/diamond.png" />
            </Link>
          ) : (
            <div />
          )}
          <Link className="shopping-cart-nav-bar-button-Sti4sV" to="/cart">
            <img
              src="/static/img/shopping_cart.svg"
              onClick={() => {
                this.refreshMarket();
              }}
            />
          </Link>
          {(this.state as any).connected == "1" ? (
            <div
              className="profile-panel-uUfevr"
              onClick={(e) => {
                this.setState({
                  current_context_menu: -1,
                  mouse: {
                    pos_x: window.innerWidth - document.querySelector(".profile-panel-uUfevr").clientWidth - 50,
                    pos_y: 60,
                  },
                });
              }}>
              <img className="profile-picture-OCrkEg" src={`https://mc-heads.net/avatar/${username}`}></img>
              <p className="profile-name-otAgcz">{username}</p>
            </div>
          ) : (
            <div className="connection-panel-RAxQEm">
              <a
                className="connection-button-VQjSiq"
                onClick={() => {
                  this.setState({ current_popup: 1 });
                }}>
                Connexion
              </a>
            </div>
          )}
        </div>

        <Switch>
          <Route exact path="/">
            <Home
              items={(this.state as any).market_items}
              featured={(this.state as any).featured}
              updateMarket={() => {
                this.refreshMarket();
              }}
              setState={(state) => {
                this.setState(state);
              }}
            />
          </Route>
          <Route path="/market">
            <div id="market">
              <Market
                items={(this.state as any).market_items}
                updateMarket={() => {
                  this.refreshMarket();
                }}
                setState={(state) => {
                  this.setState(state);
                }}
              />
            </div>
          </Route>
          <Route path="/cart">
            <Cart
              items={(this.state as any).market_items}
              updateMarket={() => {
                this.refreshMarket();
              }}
              setState={(state) => {
                this.setState(state);
              }}
            />
          </Route>
          <Route path="/bank">
            <Bank
              setState={(state) => {
                this.setState(state);
              }}
              sold={(this.state as any).user.sold}
              users={(this.state as any).users}
              bank_history={(this.state as any).bank_history}
              items={(this.state as any).market_items}
              autoReconnect={() => {
                this.autoReconnect();
              }}
              updateMarket={() => {
                this.refreshMarket();
              }}
            />
          </Route>
          <Route path="/delivery">
            <Delivery
              items={(this.state as any).market_items}
              users={(this.state as any).users}
              deliveries={(this.state as any).deliveries}
              setState={(state) => {
                this.setState(state);
              }}
              updateMarket={() => {
                this.refreshMarket();
              }}
            />
          </Route>
          <Route path="/delivery-panel">
            <DeliveryPanel
              items={(this.state as any).market_items}
              todelivery={(this.state as any).todelivery}
              mydelivery={(this.state as any).mydelivery}
              setState={(state) => {
                this.setState(state);
              }}
              updateMarket={() => {
                this.refreshMarket();
              }}
            />
          </Route>
          <Route path="/stats">
            <div>
              <h1></h1>
            </div>
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>

        <div className="">
          {(this.state as any).current_menu == 0 ? (
            <div />
          ) : (this.state as any).current_menu == 1 ? (
            <Market
              // @ts-ignore
              sub_menu={(this.state as any).sub_menu}
              setState={(state) => {
                this.setState(state);
              }}
            />
          ) : (this.state as any).current_menu == 2 ? (
            <div />
          ) : (this.state as any).current_menu == 3 ? (
            <div />
          ) : (
            <div />
          )}
        </div>
        {(this.state as any).current_popup != 0 ? (
          <div
            className="popup-panel-QQYSlt"
            onMouseDown={(e) => {
              if (e.target == document.querySelector(".popup-panel-QQYSlt")) {
                this.setState({ current_popup: 0 });
              }
            }}>
            <div className="popup-window-BzbmIx">
              {(this.state as any).current_popup == 1 ? (
                <div className="window-content-c8uDUJ">
                  <h1 className="popup-title-PRs93H">Connexion</h1>
                  <div className="content-NnWxgO">
                    {/* <div className="connection-label-NseI5S">Pseudo</div> */}
                    <input
                      type="text"
                      className="textbox-i2jqwp username-textbox-AbSK30"
                      autoFocus={true}
                      placeholder="Pseudo"
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.keyCode === 13) {
                          this.Connect();
                        }
                      }}></input>
                    {/* <div className="connection-label-NseI5S">Mot de passe</div> */}
                    <input
                      type="password"
                      className="textbox-i2jqwp password-textbox-K8MPTQ"
                      placeholder="Mot de passe"
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.keyCode === 13) {
                          this.Connect();
                        }
                      }}></input>
                    <div
                      className="connection-button-eUceul"
                      onClick={() => {
                        this.Connect();
                      }}>
                      Connexion
                    </div>
                    <div className="connection-label-u1i3hB">
                      Pas de compte ?
                      <a
                        onClick={() => {
                          this.setState({ current_popup: 2 });
                        }}>
                        Inscription
                      </a>
                    </div>
                  </div>
                </div>
              ) : (this.state as any).current_popup == 2 ? (
                <div className="window-content-c8uDUJ">
                  <h1 className="popup-title-PRs93H">Inscription</h1>
                  <div className="content-NnWxgO">
                    {/* <div className="connection-label-NseI5S">Pseudo</div> */}
                    <input
                      name="username"
                      type="text"
                      className="textbox-i2jqwp username-textbox-AbSK30"
                      autoFocus={true}
                      placeholder="Pseudo"
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.keyCode === 13) {
                          this.CreateAccount();
                        }
                      }}></input>
                    {/* <div className="connection-label-NseI5S">Mot de passe</div> */}
                    <input
                      name="password"
                      type="password"
                      className="textbox-i2jqwp password-textbox-K8MPTQ"
                      placeholder="Mot de passe"
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.keyCode === 13) {
                          this.CreateAccount();
                        }
                      }}></input>
                    <input
                      type="text"
                      className="textbox-i2jqwp pikachu-textbox-HNYBOc"
                      placeholder="Code secret"
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.keyCode === 13) {
                          this.CreateAccount();
                        }
                      }}></input>
                    <div
                      className="connection-button-eUceul"
                      onClick={() => {
                        this.CreateAccount();
                      }}>
                      Inscription
                    </div>
                    <div className="connection-label-u1i3hB">
                      Déjà un compte ?
                      <a
                        onClick={() => {
                          this.setState({ current_popup: 1 });
                        }}>
                        Connexion
                      </a>
                    </div>
                  </div>
                </div>
              ) : (this.state as any).current_popup == 3 ? (
                <div className="window-content-c8uDUJ">
                  <h1 className="popup-title-PRs93H">{(this.state as any).popup.title}</h1>
                  <div className="content-NnWxgO">
                    <div className="connection-label-u1i3hB">{(this.state as any).popup.text}</div>
                    <div
                      className="connection-button-eUceul"
                      onClick={() => {
                        this.setState({ current_popup: 0 });
                      }}>
                      Fermer
                    </div>
                  </div>
                </div>
              ) : (this.state as any).current_popup == 4 ? (
                <div className="window-content-c8uDUJ">
                  <h1 className="popup-title-PRs93H">Créer une annonce</h1>
                  <div className="content-NnWxgO">
                  <input type="text" className="textbox-i2jqwp" autoFocus={true} placeholder="Nom de l'objet"></input>
                  <input type="text" className="textbox-i2jqwp" autoFocus={true} placeholder="Description (Max 255 caractères)"></input>
                  <textarea className="textbox-i2jqwp" cols={60} rows={5} placeholder="Description complète"></textarea>
                  <input type="text" className="textbox-i2jqwp" autoFocus={true} placeholder="Lien de la miniature"></input>
                  <input type="text" className="textbox-i2jqwp" autoFocus={true} placeholder="Tags"></input>
                  <input type="text" className="textbox-i2jqwp" autoFocus={true} placeholder="Taille du stack (64 par défaut)"></input>
                  <input type="text" className="textbox-i2jqwp" autoFocus={true} placeholder="Prix de l'objet"></input>
                  <input type="text" className="textbox-i2jqwp" autoFocus={true} placeholder="Stock"></input>
                    <div className="connection-label-u1i3hB" style={{ flexDirection: "column", textAlign: "left" }}>
                      <p>Attention : Si l'objet est déjà en vente, la</p>
                      <p>description (Et pas la description complète),</p>
                      <p>les tags et la miniature ne seront pas conservés.</p>
                    </div>

                    <div
                      className="connection-button-eUceul"
                      onClick={() => {
                        this.setState({ current_popup: 0 });
                      }}>
                      Créer l'annonce
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {/* <svg className="popup-close-6K4qlC" width="24" viewBox="0 0 4 4" onClick={() => { this.setState({ current_popup: 0 }); }}>
                <path fill="currentColor" d="M 0.35 0 L 2 1.65 L 3.65 0 L 4 0.35 L 2.35 2 L 4 3.65 L 3.65 4 L 2 2.35 L 0.35 4 L 0 3.65 L 1.65 2 L 0 0.35 Z"></path>
              </svg> */}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {(this.state as any).current_popup_noclose != 0 ? (
          <div className="popup-panel-QQYSlt">
            <div className="popup-window-BzbmIx">
              {(this.state as any).current_popup_noclose == 1 ? (
                <div className="window-content-c8uDUJ">
                  <h1 className="popup-title-PRs93H">{(this.state as any).popup.title}</h1>
                  <div className="content-NnWxgO">
                    <div className="connection-label-u1i3hB">{(this.state as any).popup.text}</div>
                  </div>
                </div>
              ) : (this.state as any).current_popup_noclose == 2 ? (
                <div className="window-content-c8uDUJ">
                  <h1 className="popup-title-PRs93H">{(this.state as any).popup.title}</h1>
                  <div className="content-NnWxgO">
                    <div className="connection-label-u1i3hB">{(this.state as any).popup.text}</div>
                    <div
                      className="connection-button-eUceul"
                      onClick={() => {
                        (this.state as any).popup.action1();
                      }}>
                      Oui
                    </div>
                    <div
                      className="connection-button-eUceul"
                      onClick={() => {
                        (this.state as any).popup.action2();
                      }}>
                      Non
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {/* <svg className="popup-close-6K4qlC" width="24" viewBox="0 0 4 4" onClick={() => { this.setState({ current_popup: 0 }); }}>
                <path fill="currentColor" d="M 0.35 0 L 2 1.65 L 3.65 0 L 4 0.35 L 2.35 2 L 4 3.65 L 3.65 4 L 2 2.35 L 0.35 4 L 0 3.65 L 1.65 2 L 0 0.35 Z"></path>
              </svg> */}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="context-menu-w22PiE"
          style={{
            top: (this.state as any).mouse.pos_y,
            left: (this.state as any).mouse.pos_x,
          }}>
          {(this.state as any).current_context_menu == 1 ? (
            <ul className="context-menu-ul-YmmkjU">
              {(this.state as any).user.isdeliveryman ? (
                <li>
                  <Link
                    to="/delivery-panel"
                    className="context-menu-element-GiP6Ll"
                    onClick={() => {
                      fetch("/api/deliveries/toDelivery", {
                        headers: {
                          Authorization: `token ${getCookie("token")}`,
                        },
                        method: "GET",
                      }).then((result) => {
                        result.json().then((result) => {
                          this.setState({ todelivery: result });
                        });
                      });
                      fetch("/api/deliveries/myDelivery", {
                        headers: {
                          Authorization: `token ${getCookie("token")}`,
                        },
                        method: "GET",
                      }).then((result) => {
                        result.json().then((result) => {
                          this.setState({ mydelivery: result });
                        });
                      });
                    }}>
                    Panel Livreur
                  </Link>
                </li>
              ) : (
                <div />
              )}
              {(this.state as any).user.workin ? (
                <li>
                  <Link
                    to="/seller"
                    className="context-menu-element-GiP6Ll"
                    onClick={() => {
                      fetch("/api/sellers/@me", {
                        headers: {
                          Authorization: `token ${getCookie("token")}`,
                        },
                        method: "GET",
                      }).then((result) => {
                        result.json().then((result) => {
                          this.setState({ todelivery: result });
                        });
                      });
                    }}>
                    Panel Vendeur
                  </Link>
                </li>
              ) : (
                <div />
              )}
              <li>
                <a
                  className="context-menu-element-GiP6Ll"
                  onClick={() => {
                    document.cookie = `token="";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    this.setState({ connected: 0 });
                  }}>
                  Déconnexion
                </a>
              </li>
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </Router>
    );
  }

  refreshMarket() {
    fetch("/api/market/items").then((result) => {
      result.json().then((x) => {
        if (result.status == 200) {
          this.setState({ market_items: x.sort((a, b) => a.name - b.name) });
        } else {
          console.error(x);
        }
      });
    });
  }

  autoReconnect() {
    if (getCookie("token") != "") {
      fetch("/api/users/@me", {
        headers: {
          Authorization: `token ${getCookie("token")}`,
        },
        method: "GET",
      }).then((result) => {
        result.json().then((result) => {
          if (result.username) {
            console.log(result.isdeliveryman);
            this.setState({
              connected: 1,
              user: result,
              current_popup: 0,
            });
          }
        });
      });
    }
  }
  Connect() {
    let username = (document.querySelector(".username-textbox-AbSK30") as any).value;
    let password = (document.querySelector(".password-textbox-K8MPTQ") as any).value;
    fetch("/api/login", {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      method: "POST",
    }).then((result) => {
      if (result.status == 200) {
        result.json().then((result) => {
          if (result.token) {
            var d = new Date();
            d.setTime(d.getTime() + 2592000000);
            document.cookie = `token=${result.token}; expires=${d.toUTCString()};path=/;`;
            this.autoReconnect();
          } else {
            this.setState({
              current_popup_noclose: 0,
              current_popup: 3,
              popup: { title: "Erreur", text: result.error },
            });
          }
        });
      } else {
        this.setState({
          current_popup_noclose: 0,
          current_popup: 3,
          popup: { title: "Erreur", text: result.status },
        });
      }
    });
  }

  CreateAccount() {
    let username = (document.querySelector(".username-textbox-AbSK30") as any).value;
    let password = (document.querySelector(".password-textbox-K8MPTQ") as any).value;
    let pikachu = (document.querySelector(".pikachu-textbox-HNYBOc") as any).value;
    fetch("/api/newAccount", {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        pikachu: pikachu,
      }),
      method: "POST",
    }).then((x) => {
      if (x.status == 200) {
        x.json().then((x) => {
          if (x.success) {
            this.Connect();
          } else {
            this.setState({
              current_popup_noclose: 0,
              current_popup: 3,
              popup: { title: "Erreur", text: x.error },
            });
          }
        });
      } else {
        this.setState({
          current_popup_noclose: 0,
          current_popup: 3,
          popup: { title: "Erreur", text: x.status },
        });
      }
    });
  }
}

function NavButton({ label, to, buttonclass = "nav-list-item-f5LS2Q", activeOnlyWhenExact = false, onClick = () => {} }) {
  let match = useRouteMatch({ path: to, exact: activeOnlyWhenExact });
  return (
    <Link
      to={to}
      className={`${buttonclass} nav-list-button-Cidx8z ${match && "selected"}`}
      onClick={() => {
        onClick();
      }}>
      {label}
    </Link>
  );
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
