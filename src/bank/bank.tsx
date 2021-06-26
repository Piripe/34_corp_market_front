import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { getCookie } from "../app";

export default function Bank({ setState, sold, users, items, bank_history, autoReconnect, updateMarket }) {
  if (users == null) {
    fetch("/api/users/", {
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        setState({ users: result });
      });
    });
  }
  if (items == null) {
    updateMarket();
  }
  if (bank_history == null && getCookie("token") != "") {
    fetch("/api/history", {
      headers: {
        Authorization: `token ${getCookie("token")}`,
      },
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        setState({ bank_history: result });
      });
    });
  }
  return (
    <div>
      {getCookie("token") != "" ? (
        <div>
          {bank_history != null && items != null && users != null ? (
            <div className="cart-menu-tuI90i">
              <div className="cart-grid-0znbLY">
                <h1>Actions</h1>
                <div className="marged-fB8LGF">
                  <h2>Virement</h2>

                  <div className="marged-fB8LGF">
                    <div className="bank-inputs-4envxt">
                      <input
                        type="text"
                        className="textbox-i2jqwp textbox-MZz6wF"
                        list="all-users"
                        autoFocus={true}
                        placeholder="Compte à créditer"
                        onKeyUp={(e) => {
                          if (e.key === "Enter" || e.keyCode === 13) {
                            this.CreateAccount();
                          }
                        }}></input>
                      {users != null ? <div>{getAllUsersDatalist(users)}</div> : <div />}
                      <input
                        type="number"
                        className="textbox-i2jqwp textbox-znbSJV"
                        placeholder="Montant"
                        min="0"
                        max={sold}
                        onChange={(e) => {
                          console.log(sold)
                          if (parseInt(e.target.value) < 0) {
                            e.target.value = "0";
                          }
                          if (e.target.value > sold) {
                            e.target.value = sold;
                          }
                        }}></input>
                    </div>

                    <div className="market-item-buy-button-t1nBtr" onClick={() => {
                          setState({
                            current_popup_noclose: 1,
                            popup: { title: "Virement en cours...", text: "" },
                          });
                          let user = (document.querySelector(".textbox-MZz6wF") as any).value;
                          let amount = (document.querySelector(".textbox-znbSJV") as any).value;
                          let user_id = users.find((x) => x.name.toLowerCase() == user.toLowerCase());
                          if (user_id != undefined) {
                            fetch("/api/bank/transfer", {
                              headers: {
                                Authorization: `token ${getCookie("token")}`,
                                "content-type": "application/json",
                              },
                              body: JSON.stringify({ toUser: user_id.id, amount: amount }),
                              method: "POST",
                            }).then((result) => {
                              if (result.status == 200) {
                                result.json().then((result) => {
                                  if (result.success) {
                                    setState({
                                      current_popup_noclose: 0,
                                      current_popup: 3,
                                      popup: {
                                        title: "Virement",
                                        text: "Virement accepté",
                                      },
                                    });
                                    autoReconnect();
                                  } else {
                                    setState({
                                      current_popup_noclose: 0,
                                      current_popup: 3,
                                      popup: { title: "Erreur", text: result.error },
                                    });
                                  }
                                });
                              } else {
                                setState({
                                  current_popup_noclose: 0,
                                  current_popup: 3,
                                  popup: { title: "Erreur", text: result.status },
                                });
                              }
                            });
                          } else {
                            setState({
                              current_popup_noclose: 0,
                              current_popup: 3,
                              popup: { title: "Erreur", text: "Utilisateur invalide" },
                            });
                          }
                        }}>
                      <a>
                        Effectuer le virement
                      </a>
                    </div>
                  </div>
                  <h2>Dépot/Retrait</h2>

                  <div className="marged-fB8LGF"></div>
                  <p>Pour tout dépot/retrait, veuillez contacter Piripe.</p>
                </div>
              </div>
              <div className="cart-invoice-FCLlGR">
                <h1>Historique</h1>
                <div>{getHistory(bank_history, items, users)}</div>
              </div>
            </div>
          ) : (
            <div className="cart-menu-tuI90i">
              <div className="cart-grid-0znbLY">
                <h2>Chargement...</h2>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="cart-menu-tuI90i">
          <div className="cart-grid-0znbLY">
            <h2>Vous n'êtes pas connecté</h2>
            <div className="market-item-buy-button-t1nBtr" onClick={() => {
                  setState({
                    current_popup: 1,
                  });
                }}>
              <a>
                Connexion
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function getHistory(history, items, users) {
  let response = [];
  history.forEach((x) => {
    let d = new Date(x.date);
    response.push(
      <div className="bank-history-jk4I4P">
      <input className="bank-history-checkbox-myAjAJ" type="checkbox"/>
      <svg className="bank-history-checkbox-svg-LRJlmC" viewBox="0 0 2 2">
        <path fill="currentColor" d="M 1 0.2 L 2 1.5 L 1.7 1.8 L 1 0.8 L 0.3 1.8 L 0 1.5 z" />
      </svg>
        <div>
        <p className="bank-history-date-TSlsU3">{d.toLocaleString()}</p>
        {x.type == 0 ? (
          <p>
            {`Dépot : ${x.data.amount}`}
            <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
          </p>
        ) : x.type == 1 ? (
          <p>
            {`Retrait : ${x.data.amount}`}
            <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
          </p>
        ) : x.type == 2 ? (
          <p>
            {`Crédit : ${x.data.amount}`}
            <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
          </p>
        ) : x.type == 3 ? (
          <p>
            {`Débit : ${x.data.amount}`}
            <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
          </p>
        ) : x.type == 4 ? (
            <p>
              {`Achat : ${x.data.totalSold}`}
              <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
            </p>
        ) : (
          <div />
        )}
</div>
<div>
        {x.type == 0 ? (
          <div className="bank-history-content-06kocG"></div>
        ) : x.type == 1 ? (
          <div className="bank-history-content-06kocG"></div>
        ) : x.type == 2 ? (
          <div className="bank-history-content-06kocG">
          <p>{users.find((y) => x.data.from == y.id).name} a crédité le compte de {x.data.amount}<img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" /></p>
          </div>
        ) : x.type == 3 ? (
          <div className="bank-history-content-06kocG">
            <p>Débit de {x.data.amount}<img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" /> vers {users.find((y) => x.data.to == y.id).name}</p>
          </div>
        ) : x.type == 4 ? (
          <div className="bank-history-content-06kocG">
          <p>Objets achetés :</p>
            {getPurchaseInfos(x,items)}
            </div>
        ) : (
          <div />
        )}
        </div>
      </div>
    );
    response.push(<hr className="cart-item-separator-2RN59G" />);
  });

  return <div className="cart-grid-veKAVD">{response}</div>;
}
function getAllUsersDatalist(users) {
  let response = [];

  (users as [any]).forEach((x) => {
    response.push(<option>{x.name}</option>);
  });

  return <datalist id="all-users">{response}</datalist>;
}

function getPurchaseInfos(x,items) {
  let response = []

  x.data.items.forEach((y) => {
    let item = items.find((z) => z.id == y.item_id)
    let seller = item ? item.sellers.find((z) => z.seller_id == y.seller_id) : undefined
    response.push(<p>{`${y.quantity}x ${item ? item.name+" vendu par " : `Object supprimé (ID : ${y.item_id})`}`}{item ? <Link className="market-item-seller-link-uhdH5l" to={`/seller/${seller.seller_id}`}>{seller.name}</Link> : <a/> }{` (${y.price * y.quantity}`}<img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />)</p>)
  })

  return (<div>{response}</div>)
}