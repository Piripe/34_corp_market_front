import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { getCookie } from "../app";

export default function Cart({ items, updateMarket, setState }) {
  if (items == null) {
    updateMarket();
  }

  return (
    <div className="cart-menu-tuI90i">
      <div className="cart-grid-0znbLY">
        <h1>Mon panier</h1>
        {getCartGrid(items, updateMarket, setState)}
        {getCookie("cart") == "" || JSON.parse(getCookie("cart")).length == 0 ? <h3>Panier Vide</h3> : <div />}
      </div>
      {getCookie("cart") == "" || JSON.parse(getCookie("cart")).length == 0 ? (
        <div />
      ) : (
        <div className="cart-invoice-FCLlGR">
          <h1>Ma facture</h1>
          {getInvoice(items)}
          <div className="market-item-buy-button-t1nBtr" onClick={() => {
                if (getCookie("token") == "") {
                  setState({ current_popup: 1});
                }else{
                setState({ current_popup_noclose: 1, popup: { title: "Achat en cours...", text: "" } });
                let final_cart = [];
                let cookie = getCookie("cart");
                let cart: [any] = cookie == "" ? [] : JSON.parse(cookie);
                cart.forEach((x) => {
                  final_cart.push({ id: items.find((y) => x.item_id == y.id).sellers.find((y) => x.seller_id == y.seller_id).seller_item_id, quantity: x.quantity });
                });
                fetch("/api/market/buy", {
                  headers: {
                    Authorization: `token ${getCookie("token")}`,
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(final_cart),
                  method: "POST",
                }).then((result) => {
                  if (result.status == 200) {
                    fetch("/api/users/@me", {
                      headers: {
                        Authorization: `token ${getCookie("token")}`,
                      },
                      method: "GET",
                    }).then((result) => {
                      result.json().then((result) => {
                        if (result.username) {
                          setState({ connected: 1, username: result.username, sold: result.sold });
                        }
                      });
                    });
                    result.json().then((result) => {
                      if (result.success) {
                        document.cookie = `cart="";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                        setState({ current_popup_noclose: 0, current_popup: 3, popup: { title: "Achat", text: "Panier acheté" } });
                      } else {
                        setState({ current_popup_noclose: 0, current_popup: 3, popup: { title: "Erreur", text: result.error } });
                      }
                    });
                  } else {
                    setState({ current_popup_noclose: 0, current_popup: 3, popup: { title: "Erreur", text: result.status } });
                  }
                });}
              }}>
            <a>
              Effectuer la commande
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
function getCartGrid(items, updateMarket, setState) {
  if (items != null) {
    let response = [];
    let cookie = getCookie("cart");
    let cart: [any] = cookie == "" || cookie.length == 0 ? [] : JSON.parse(cookie);
    cart.forEach((x) => {
      let item = items.find((y) => x.item_id == y.id);
      let seller = item.sellers.find((y) => x.seller_id == y.seller_id);
      response.push(
        <div className="cart-item-div-CqZm0r">
          <Link to={`/market/${x.item_id}/${x.seller_id}`} className="cart-item-infos-5UI6R9">
            <img className="cart-infos-thumbnail-JfUJGV" src={item.thumbnail} />
            <div className="cart-item-infos-P33ZEi">
              <p>{item.name}</p>
              <p>{(item.description as string).length > 30 ? item.description.substr(0, 28) + "..." : item.description}</p>
              <p>
                Vendu par{" "}
                <Link className="cart-seller-link-TVi8Dm" to={`/seller/${seller.seller_id}`}>
                  {seller.name}
                </Link>
              </p>
            </div>
            <p className="cart-item-price-WE0yIP">
              {seller.price}
              <img className="cart-item-diamond-F0FlEv" src="/static/img/diamond.png" />
            </p>
            <div></div>
          </Link>
          <div className="cart-item-infos-5UI6R9">
            <input
              type="number"
              className="textbox-i2jqwp"
              style={{width:"100px"}}
              defaultValue={x.quantity}
              min="1"
              max={seller.stock}
              onChange={(e) => {
                var d = new Date();
                d.setTime(d.getTime() + 2592000000);

                if (parseInt(e.target.value) < 1) {
                  e.target.value = "1";
                }
                if (e.target.value > seller.stock) {
                  e.target.value = seller.stock;
                }
                e.target.value = Math.floor(parseInt(e.target.value.toString().replace(".", ""))).toString();

                let cookie = getCookie("cart");
                let cart: [any] = cookie == "" ? [] : JSON.parse(cookie);

                let item_id = cart.indexOf(cart.find((y) => y.item_id == x.item_id && y.seller_id == x.seller_id));
                cart[item_id].quantity = e.target.value;
                if (cart[item_id].quantity > seller.stock) {
                  cart[item_id].quantity = seller.stock;
                }
                document.cookie = `cart=${JSON.stringify(cart)}; expires=${d.toUTCString()};path=/;`;
                setState({});
              }}
            />
            <img
              className="cart-trash-YlsvYz"
              src="/static/img/trash.svg"
              onClick={(e) => {
                var d = new Date();
                d.setTime(d.getTime() + 2592000000);
                let cookie = getCookie("cart");
                let cart: [any] = cookie == "" ? [] : JSON.parse(cookie);
                cart.splice(cart.indexOf(cart.find((y) => y.item_id == x.item_id && y.seller_id == x.seller_id)), 1);
                document.cookie = `cart=${JSON.stringify(cart)}; expires=${d.toUTCString()};path=/;`;
                updateMarket();
              }}
            />
          </div>
        </div>
      );
      response.push(<hr className="cart-item-separator-2RN59G" />);
    });

    return <div className="cart-grid-veKAVD">{response}</div>;
  }
  return <div />;
}
function getInvoice(items) {
  if (items != null) {
    let response = [];
    let second_response = [];
    let cookie = getCookie("cart");
    let cart: [any] = cookie == "" || cookie.length == 0 ? [] : JSON.parse(cookie);
    let total_price = 0;
    let delivery_price = 0;
    cart.forEach((x) => {
      let item = items.find((y) => x.item_id == y.id);
      let seller = item.sellers.find((y) => x.seller_id == y.seller_id);

      response.push(<p>{`${x.quantity}x ${item.name}`}</p>);
      response.push(<p className="invoice-QThk5b">à</p>);
      response.push(
        <p>
          {`${seller.price} `}
          <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
        </p>
      );
      response.push(<p className="invoice-8lsvyX">{x.quantity * seller.price}</p>);

      total_price += x.quantity * seller.price;

      let price = 0;
      second_response.push(<p>Livraison</p>);
      second_response.push(<p className="invoice-QThk5b">à</p>);
      second_response.push(
        <p>
          {`${price} `}
          <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
        </p>
      );
      second_response.push(<p />);
      delivery_price += price;
    });
    return (
      <div className="cart-invoice-oVxRkY">
        {response}
        <h2>Sous-Total</h2>
        <p></p>
        <img className="invoice-total-price-diamond-LVPgQa" src="/static/img/diamond.png" />
        <p className="invoice-total-price-RRGdr4">{total_price}</p>
        {second_response}
        <h2>Total</h2>
        <p></p>
        <img className="invoice-total-price-diamond-LVPgQa" src="/static/img/diamond.png" />
        <p className="invoice-total-price-RRGdr4">{total_price + delivery_price}</p>
      </div>
    );
  }
  return <div />;
}
