import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Item from "./item";
import CreateItem from "./create_item"

export default function Market({ items, updateMarket, setState }) {
  if (items == null) {
    updateMarket();
  }
  let { path } = useRouteMatch();
  return (
    <div className="market-menu-R1EA0e">
      <Switch>
        <Route exact path={path}>
          <div className="market-menu-title-D1DHFL">
            <h1>Magasin</h1>
            <div
                    className="market-item-buy-button-t1nBtr"
                    style={{marginRight:"40px"}}>
                    <Link to="/market/create-item">Créer une annonce</Link>
                  </div>
            </div>
          <RenderList items={items} />
        </Route>
        <Route path={`${path}/create-item`}>
          <CreateItem setState={(state) => {setState(state)}} />
        </Route>
        <Route path={`${path}/:itemId`}>
          <Item items={items} defItemId={null} />
        </Route>
      </Switch>
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