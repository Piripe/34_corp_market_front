import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { getCookie } from "../app";

export default function CreateItem({setState}) {
  let { path } = useRouteMatch();
  return (
    <div className="create-item-form-ozhUzC">
                  <h1 className="popup-title-PRs93H">Créer une annonce</h1>
                  <div className="content-NnWxgO">
                  <input type="text" className="textbox-i2jqwp item-name-textbox-tIGUt8" autoFocus={true} placeholder="Nom de l'objet"></input>
                  <input type="text" className="textbox-i2jqwp item-description-textbox-IpbBd8" autoFocus={true} placeholder="Description (Max 255 caractères)"></input>
                  <textarea className="textbox-i2jqwp item-full-description-textbox-y2PfkW" style={{height:"150px"}} cols={10} rows={5} placeholder="Description complète"></textarea>
                  <input type="text" className="textbox-i2jqwp item-thumbnail-textbox-NFimzR" autoFocus={true} placeholder="Lien de la miniature"></input>
                  <input type="text" className="textbox-i2jqwp item-tags-textbox-gEJL4I" autoFocus={true} placeholder="Tags (Séparés par des espaces)"></input>
                  <input type="number" className="textbox-i2jqwp item-stack-textbox-WmdRtt" min="1" max="64" autoFocus={true} placeholder="Taille du stack (64 par défaut)" onChange={(e) => {
                          if (parseInt(e.target.value) < 1) {
                            e.target.value = "1";
                          }
                          if (e.target.value > "64") {
                            e.target.value = "64";
                          }
                          e.target.value = Math.floor(parseInt(e.target.value.toString().replace(".", ""))).toString();
                        }}></input>
                  <input type="number" className="textbox-i2jqwp item-price-textbox-sYhacJ" autoFocus={true} placeholder="Prix de l'objet" onChange={(e) => {
                          if (parseInt(e.target.value) < 0) {
                            e.target.value = "0";
                          }
                          e.target.value = Math.floor(parseInt(e.target.value.toString().replace(".", ""))).toString();
                        }}></input>
                  <input type="number" className="textbox-i2jqwp item-stock-textbox-aKew1S" autoFocus={true} placeholder="Stock" onChange={(e) => {
                          if (parseInt(e.target.value) < 1) {
                            e.target.value = "1";
                          }
                          e.target.value = Math.floor(parseInt(e.target.value.toString().replace(".", ""))).toString();
                        }}></input>
                    <div className="connection-label-u1i3hB" style={{ flexDirection: "column", textAlign: "left" }}>Attention : Si l'objet est déjà en vente, la description (Et pas la description complète), les tags, la miniature et  ne seront pas conservés.</div>

                    <div
                      className="connection-button-eUceul"
                      onClick={() => {
                        if (getCookie("token") == "") {
                          setState({ current_popup: 1});
                        }else{
                        setState({ current_popup_noclose: 1, popup: { title: "Création en cours...", text: "" } });
                        let stack = (document.querySelector(".item-stack-textbox-WmdRtt") as any).value
                        fetch("/api/market/items/new", {
                          headers: {
                            Authorization: `token ${getCookie("token")}`,
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            name: (document.querySelector(".item-name-textbox-tIGUt8") as any).value,
                            description: (document.querySelector(".item-description-textbox-IpbBd8") as any).value,
                            full_description: (document.querySelector(".item-full-description-textbox-y2PfkW") as any).value,
                            thumbnail: (document.querySelector(".item-thumbnail-textbox-NFimzR") as any).value,
                            category: (document.querySelector(".item-tags-textbox-gEJL4I") as any).value,
                            stack: (stack == "" ? 64 : stack),
                            price: (document.querySelector(".item-price-textbox-sYhacJ") as any).value,
                            stock: (document.querySelector(".item-stock-textbox-aKew1S") as any).value
                        }),
                          method: "POST",
                        }).then((result) => {
                          if (result.status == 200) {

                          } else {
                            setState({ current_popup_noclose: 0, current_popup: 3, popup: { title: "Erreur", text: result.status } });
                          }
                        });}
                      }}>
                      Créer l'annonce
                    </div>
                  </div>
                </div>
  );
}

function RenderList({ items }) {
  if (items != null) {
    let response = [];
    items.forEach((item) => {
      // @ts-ignore
      response.push(<ItemElement data={item} key={item.id} />);
    });
    return <div className="market-grid-JF6gPC">{response}</div>;
  }
  return <div />;
}
function ItemElement({ data }) {
  let { path } = useRouteMatch();
  return (
    <Link to={`${path}/${data.id}`} className="market-grid-element-JQZAay">
      <img className="market-grid-element-img-NsZHYi" src={data.thumbnail}></img>
      <h1 className="market-grid-element-title-XILRCn">{data.name}</h1>
      <p className="market-grid-element-desc-MePadJ">{(data.description as string).length > 35 ? data.description.substr(0, 33) + "..." : data.description}</p>
      <p className="market-grid-element-price-gqXUmN">
        {getMinPrice(data.sellers)}
        <img className="market-grid-element-diamond-JjlT8Y" src="/static/img/diamond.png" />
      </p>
    </Link>
  );
}
function getMinPrice(sellers) {
  let sorted_sellers = sellers.sort((a, b) => (a.stock > 0 ? a.price : b.price + 1) - (b.stock > 0 ? b.price : a.price + 1))
  if (sorted_sellers[0] === undefined) {
    return 0;
  }else{
    return sorted_sellers[0].price;
  }
}