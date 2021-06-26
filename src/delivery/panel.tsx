import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { getCookie } from "../app";

export default function DeliveryPanel({ items, todelivery, mydelivery, setState, updateMarket }) {
  if (todelivery == null && getCookie("token") != "") {
    fetch("/api/deliveries/toDelivery", {
      headers: {
        Authorization: `token ${getCookie("token")}`,
      },
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        setState({ todelivery: result });
      });
    });
  }
  if (mydelivery == null && getCookie("token") != "") {
    fetch("/api/deliveries/myDelivery", {
      headers: {
        Authorization: `token ${getCookie("token")}`,
      },
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        setState({ mydelivery: result });
      });
    });
  }
  if (items == null) {updateMarket()}
  if (items != null && todelivery != null && mydelivery != null) {
    return (<div className="cart-grid-0znbLY">
    <h1 className="market-title-EmdXDB">Panel Livreur</h1>
    <h2 className="market-title-EmdXDB">En cours de livraison</h2>
    {getDeliveries(mydelivery.filter(x => x.status == 1), items, setState)}
    <h2 className="market-title-EmdXDB margin-top-saJjHV">À livrer</h2>
    {getDeliveries(todelivery, items, setState)}
    <h2 className="market-title-EmdXDB margin-top-saJjHV">Livré</h2>
    {getDeliveries(mydelivery.filter(x => x.status == 2), items, setState)}
    </div>);
  }
  return (
      <div className="cart-grid-0znbLY">
        <h2>Chargement...</h2>
      </div>);
}

function getDeliveries(deliveries: [any], items: [any], setState) {
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
            {(x.status == 0) ?
                <div className="market-item-buy-button-t1nBtr green-button-Hf5Vi8"  onClick={() => {
                    fetch(`/api/deliveries/start`, {
                      headers: {
                        Authorization: `token ${getCookie("token")}`,
                        "content-type": "application/json",
                      },
                      body: JSON.stringify({ id: x.id }),
                      method: "POST",
                    }).then((result) => {
                      if (result.status == 200) {
                      result.json().then((result) => {
                        if (result.success) {
                          fetch("/api/deliveries/toDelivery", {
                            headers: {
                              Authorization: `token ${getCookie("token")}`,
                            },
                            method: "GET",
                          }).then((result) => {
                            result.json().then((result) => {
                              setState({ todelivery: result });
                            });
                          });
                          fetch("/api/deliveries/myDelivery", {
                            headers: {
                              Authorization: `token ${getCookie("token")}`,
                            },
                            method: "GET",
                          }).then((result) => {
                            result.json().then((result) => {
                              setState({ mydelivery: result });
                            });
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
                  }}>
                <a>
                  Commencer la livraison
                </a>
              </div>
                :
                (x.status == 1) ? 
                <div className="market-item-buy-button-t1nBtr green-button-Hf5Vi8" onClick={() => {
                  fetch(`/api/deliveries/setDelivered`, {
                    headers: {
                      Authorization: `token ${getCookie("token")}`,
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({ id: x.id }),
                    method: "POST",
                  }).then((result) => {
                    if (result.status == 200) {
                    result.json().then((result) => {
                      if (result.success) {
                        fetch("/api/deliveries/toDelivery", {
                          headers: {
                            Authorization: `token ${getCookie("token")}`,
                          },
                          method: "GET",
                        }).then((result) => {
                          result.json().then((result) => {
                            setState({ todelivery: result });
                          });
                        });
                        fetch("/api/deliveries/myDelivery", {
                          headers: {
                            Authorization: `token ${getCookie("token")}`,
                          },
                          method: "GET",
                        }).then((result) => {
                          result.json().then((result) => {
                            setState({ mydelivery: result });
                          });
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
                }}>
              <a>
              Livraison terminée
              </a>
            </div>
              :
                <div/>
          }
          </div>
          </div>
          <div><div className="bank-history-content-06kocG">{getDeliveryInfos(x, items)}</div></div>
        </div>
      );
      response.push(<hr className="cart-item-separator-2RN59G" />);
    });

    return <div className="cart-grid-veKAVD">{response}</div>;
  }
  return <div />;
}

function getDeliveryInfos(x, items) {
  let response = [];
  //if x.
  x.items.forEach((y) => {
    let item = items.find((z) =>  z.sellers.find((a) => a.seller_item_id == y.id));
    let seller = item ? item.sellers.find((z) => z.seller_item_id == y.id) : undefined
    response.push(
      <p>
      {`${y.quantity}x ${item ? item.name+" vendu par " : `Object supprimé (ID : ${y.id})`}`}{item ? seller ? <Link className="market-item-seller-link-uhdH5l" to={`/seller/${seller.seller_id}`}>{seller.name}</Link>:<Link className="market-item-seller-link-uhdH5l" to={`/seller/${y.id}`}>Vendeur Introuvable (ID : {y.id})</Link>:<a/>}
      </p>
    );
  });

  return <div>{response}</div>;
}
