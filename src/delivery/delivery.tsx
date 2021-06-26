import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { getCookie } from "../app";

export default function Delivery({ items,users, deliveries, setState, updateMarket }) {
  if (deliveries == null && getCookie("token") != "") {
    fetch("/api/deliveries", {
      headers: {
        Authorization: `token ${getCookie("token")}`,
      },
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        setState({ deliveries: result });
      });
    });
  }
  if (users == null) {
    fetch("/api/users/", {
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        setState({ users: result });
      });
    });
  }
  if (items == null) {updateMarket()}
  if (getCookie("token") != "") {
  if (items != null && deliveries != null && users != null) {
    return (<div className="cart-grid-0znbLY">
    <h1 className="market-title-EmdXDB">Livraisons</h1>
    {getDeliveries(deliveries, items, users, setState)}</div>);
  }
  return (
      <div className="cart-grid-0znbLY">
        <h2>Chargement...</h2>
      </div>);
      }else{
        return (<div className="cart-menu-tuI90i">
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
}

function getDeliveries(deliveries: [any], items: [any], users, setState) {
  if (items != null) {
    let response = [];
    deliveries.forEach((x) => {
      let d = new Date(x.command_date);
      response.push(
        <div className="bank-history-jk4I4P">
          <input className="bank-history-checkbox-myAjAJ delivery-checkbox-t4Yjl5" type="checkbox" />
          <svg className="bank-history-checkbox-svg-LRJlmC delivery-checkbox-t4Yjl5" viewBox="0 0 2 2">
            <path fill="currentColor" d="M 1 0.2 L 2 1.5 L 1.7 1.8 L 1 0.8 L 0.3 1.8 L 0 1.5 z" />
          </svg>
          <div>
            <p className="bank-history-date-TSlsU3">{d.toLocaleString()}</p>
            <div className="delivery-end-actions-HNoTFq">
            <p>Status : {x.status == 2 ? "Livré" : x.status == 1 ? "En cours..." : "En attente..."}<svg className="market-stock-indicator-Oe7bTY delivery-status-indicator-bV1umC" viewBox="0 0 4 4">
                  <ellipse fill={x.status == 2 ? "#7BC950" : x.status == 1 ? "#ffcb5a" : "#A30015"} cx="2" cy="2" rx="2" ry="2" />
                </svg></p>
                {x.status == 0 ?
                <div className="market-item-buy-button-t1nBtr red-button-hRYN7J">
                <a
                  onClick={() => {
                    setState({ current_popup_noclose: 2, popup: { title: "Livraison", text: "Annuler la livraison ?", action1:() => {
                      setState({ current_popup_noclose: 1, popup: { title: "Livraison", text: "Annulation en cours..."}});
                      fetch(`/api/deliveries/${x.id}`, {
                        headers: {
                          Authorization: `token ${getCookie("token")}`,
                        },
                        method: "DELETE",
                      }).then((result) => {
                        if (result.status == 200) {
                        result.json().then((result) => {
                          if (result.success) {
                            fetch("/api/deliveries", {
                              headers: {
                                Authorization: `token ${getCookie("token")}`,
                              },
                              method: "GET",
                            }).then((result) => {
                              result.json().then((result) => {
                                setState({ deliveries: result });
                              });
                            });
                            setState({
                              current_popup_noclose: 0,
                              current_popup: 3,
                              popup: { title: "Livraison", text: "Livraison Annulée" },
                            });
                          }else{
                            setState({
                              current_popup_noclose: 0,
                              current_popup: 3,
                              popup: { title: "Erreur", text: result.error },
                            });
                          }
                        });
                      }else{
                        setState({
                          current_popup_noclose: 0,
                          current_popup: 3,
                          popup: { title: "Erreur", text: result.status },
                        });
                      }
                      });
                    } , action2:() => {setState({ current_popup_noclose: 0})} } });
                  }}>
                  Annuler
                </a>
              </div>
            :
            <div/>}
          </div>
          </div>
          <div><div className="bank-history-content-06kocG">{getDeliveryInfos(x, items,users)}</div></div>
        </div>
      );
      response.push(<hr className="cart-item-separator-2RN59G" />);
    });

    return <div className="cart-grid-veKAVD">{response}</div>;
  }
  return <div />;
}

function getDeliveryInfos(x, items,users) {
  let response = [];
  x.items.forEach((y) => {
    let item = items.find((z) =>  z.sellers.find((a) => a.seller_item_id == y.id));
    let seller = item ? item.sellers.find((z) => z.seller_item_id == y.id) : undefined
    response.push(
      <p>
      {`${y.quantity}x ${item ? item.name+" vendu par " : `Object supprimé (ID : ${y.id})`}`}{item ? seller ? <Link className="market-item-seller-link-uhdH5l" to={`/seller/${seller.seller_id}`}>{seller.name}</Link>:<Link className="market-item-seller-link-uhdH5l" to={`/seller/${y.id}`}>Vendeur Introuvable (ID : {y.id})</Link>:<a/>}
      </p>
    );
  });
  if (x.status > 0) {
    response.push(<p/>)
    response.push(<p>Livré par {users.find((y) => y.id == x.deliveryman_id).name}</p>)
  }

  return <div>{response}</div>;
}
