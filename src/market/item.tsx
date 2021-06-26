import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { getCookie } from "../app";

let trackbar_clickOffset = 0;
let trackbar_isdragging = false;

export default function Item({ items, defItemId }) {
  if (items != null) {
    let { itemId, vendorId } = useParams();
    let item = items.find((x) => {
      return x.id == itemId;
    });
    let current_vendor;
    item.sellers = item.sellers.sort((a, b) => (a.stock > 0 ? a.price : b.price + 1) - (b.stock > 0 ? b.price : a.price + 1));
    
    if (defItemId == null) {
      current_vendor = item.sellers[0];
    } else {
      current_vendor = item.sellers.find((x) => x.seller_id == vendorId);
      itemId = defItemId;
    }

    let { path, url } = useRouteMatch();

    console.log(item);

    return (
      <Switch>
        <Route exact path={path}>
          <div
            className="market-item-h4WiTT"
            onMouseUp={() => {
              trackbar_isdragging = false;
            }}
            onMouseMove={(event) => {
              if (trackbar_isdragging) {
                const trackbar: any = document.querySelector(".trackbar-yi2i0F");

                const button = trackbar.querySelector(".trackbar-button-jQ2OrE");

                const parentWidth = trackbar.offsetWidth;
                const elementWidth = button.offsetWidth;

                let currentPosition = event.pageX - button.offsetLeft - 8 - elementWidth / 2;
                let elementPosition = parseInt(window.getComputedStyle(button).getPropertyValue("margin-left"));

                let nextPosition: any = elementPosition + currentPosition - trackbar_clickOffset;

                if (nextPosition < -7) nextPosition = -7;
                if (nextPosition >= 200) nextPosition = 200;

                if (elementPosition == nextPosition + 2) return false;

                (document.querySelector(".market-item-buy-quantity-KxZJfA") as any).value = Math.floor(((nextPosition + 7) / 200) * (current_vendor.stock - 1) + 1).toString();

                nextPosition = nextPosition + "px";

                button.setAttribute("style", `margin-left: ${nextPosition}`);
              }
            }}>
            <div className="market-item-infos-awPK3H">
              <h1 className="market-title-EmdXDB">{item.name}</h1>
              <p className="market-description-FcOQLm">{item.description}</p>
              <hr className="market-item-separator-uC0Yck" />
              <img className="market-thumbnail-M9Y0Fb" src={item.thumbnail}></img>
              <hr className="market-item-separator-uC0Yck" />
              <div className="market-item-full-description-y1oXiC" dangerouslySetInnerHTML={{ __html: current_vendor.full_description }}></div>
            </div>
            
            {(current_vendor != null) ?
            <div className="market-item-current-infos-Ys1WxS">
              <h1 className="market-price-tSnVdC">
                {Math.floor(current_vendor.price)}
                <img className="market-item-diamond-rWd6Uo" src="/static/img/diamond.png" />
                <map className="market-item-price-PDfaxC">{(current_vendor.price % 1).toString().replace("0.", "")}</map>
              </h1>
              <hr className="market-item-separator-uC0Yck" />
              <p>
                <svg className="market-stock-indicator-Oe7bTY" viewBox="0 0 4 4">
                  <ellipse fill={current_vendor.stock > 0 ? "#7BC950" : "#A30015"} cx="2" cy="2" rx="2" ry="2" />
                </svg>
                {current_vendor.stock > 0 ? `En stock (${current_vendor.stock})` : "Hors-stock"}
              </p>
              {current_vendor.stock > 0 ? (
                <div>
                  <div className="market-item-buy-quantity-container-xLXLSZ">
                    <div className="trackbar-yi2i0F">
                      <div className="trackbar-button-jQ2OrE"
                        style={{ marginLeft: "-7px" }}
                        onMouseDown={(event) => {
                          const button: any = document.querySelector(".trackbar-button-jQ2OrE");
                          const elementWidth = button.offsetWidth;
                          trackbar_isdragging = true;
                          trackbar_clickOffset = event.pageX - button.offsetLeft - 8 - elementWidth / 2;
                        }}></div>
                      <div className="trackbar-line-LaxDWm"></div>
                      <input
                        className="textbox-i2jqwp market-item-buy-quantity-KxZJfA"
                        type="number"
                        defaultValue="1"
                        min="1"
                        max={current_vendor.stock}
                        onChange={(e) => {
                          if (parseInt(e.target.value) < 1) {
                            e.target.value = "1";
                          }
                          if (e.target.value > current_vendor.stock) {
                            e.target.value = current_vendor.stock;
                          }
                          e.target.value = Math.floor(parseInt(e.target.value.toString().replace(".", ""))).toString();
                          //if (e.target.value == "" ) {e.target.value = "1"}
                          (document.querySelector(".trackbar-button-jQ2OrE") as any).setAttribute("style", `margin-left: ${((parseInt(e.target.value) - 1) / current_vendor.stock) * 200 - 7}px`);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="market-item-buy-button-t1nBtr"
                    onClick={() => {
                      var d = new Date();
                      d.setTime(d.getTime() + 2592000000);
                      let cookie = getCookie("cart");
                      let cart: [any] = cookie == "" ? [] : JSON.parse(cookie);
                      let quantity = parseInt((document.querySelector(".market-item-buy-quantity-KxZJfA") as any).value);

                      if (cart.find((x) => x.item_id == item.id && x.seller_id == current_vendor.seller_id)) {
                        let item_id = cart.indexOf(cart.find((x) => x.item_id == item.id && x.seller_id == current_vendor.seller_id));
                        cart[item_id].quantity += quantity;
                        if (cart[item_id].quantity > current_vendor.stock) {
                          cart[item_id].quantity = current_vendor.stock;
                        }
                      } else {
                        cart.push({ item_id: item.id, seller_id: current_vendor.seller_id, quantity: quantity });
                      }
                      console.log(JSON.stringify(cart));
                      document.cookie = `cart=${JSON.stringify(cart)}; expires=${d.toUTCString()};path=/;`;
                    }}>
                    <a>Ajouter au panier</a>
                  </div>
                </div>
              ) : (
                <div />
              )}
              {current_vendor.seller_id == 1 ? (
                <p>
                  Vendu et expédié par{" "}
                  <Link className="market-item-seller-link-uhdH5l" to={`/seller/${current_vendor.seller_id}`}>
                    {current_vendor.name}
                  </Link>
                </p>
              ) : (
                <p>
                  Vendu par{" "}
                  <Link className="market-item-seller-link-uhdH5l" to={`/seller/${current_vendor.seller_id}`}>
                    {current_vendor.name}
                  </Link>
                  {current_vendor.stock > 0 ? (
                    <map>
                      {" "}
                      et expédié par{" "}
                      <Link className="market-item-seller-link-uhdH5l" to={`/seller/1`}>
                        3/4 Corp.
                      </Link>
                    </map>
                  ) : (
                    <p />
                  )}
                </p>
              )}
              {item.sellers.length > 1 ? (
                <div>
                  <h1 className="market-sellers-title-q093Wr">Vendeurs</h1>
                  {getSellers(item.sellers, itemId)}
                </div>
              ) : (
                <div />
              )}
            </div>
            :

            <div className="market-item-current-infos-Ys1WxS">
              <h1>Aucun Vendeur</h1>
              </div>
              }
          </div>
        </Route>
        <Route path={`${path}/:vendorId`}>
          <Item items={items} defItemId={itemId} />
        </Route>
      </Switch>
    );
  }
  return <div />;
}

function getSellers(sellers: [any], itemId) {
  let response = [];
  sellers.forEach((x) => {
    response.push(
      <Link to={`/market/${itemId}/${x.seller_id}`} className="market-item-seller-link-5Irx28" key={x.seller_id}>
        <p>
          {x.name}
          <svg className="market-stock-indicator-Oe7bTY" style={{ marginLeft: "7px" }} viewBox="0 0 4 4">
            <ellipse fill={x.stock > 0 ? "#7BC950" : "#A30015"} cx="2" cy="2" rx="2" ry="2" />
          </svg>
        </p>
        <p>
          {x.price}
          <img className="market-item-diamond-62CNW0" src="/static/img/diamond.png" />
        </p>
      </Link>
    );
  });
  return <div>{response}</div>;
}
