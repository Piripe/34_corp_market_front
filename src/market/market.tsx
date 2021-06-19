import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Item from './item'

export default function Market({items,updateMarket}) {
        if (items == null) {
          updateMarket()
        }
    let {path} = useRouteMatch();
    return (
              <div className="market-menu-R1EA0e">
              <Switch>
                <Route exact path={path}>
                      <h1>Magasin</h1>
                      <RenderList items={items}/>
                </Route>
                <Route path={`${path}/:itemId`}>
                  <Item items={items}/>
                </Route>
              </Switch>
            </div>
    );
  }

  function RenderList({items}) {
      if (items != null) {
          let response = [];
          items.forEach(item => {
              // @ts-ignore
              response.push(<ItemElement data={item} key={item.id} />);
          })
          return (<div className="market-grid-JF6gPC">{response}</div>)
      }
      return (<div />)
  
}
function ItemElement({data}) {
  let {url} = useRouteMatch();
  console.log(`${url}/${data.id}`)
  return (<Link to={`${url}/${data.id}`} className="market-grid-element-JQZAay">
      <img className="market-grid-element-img-NsZHYi" src={data.thumbnail}></img>
      <h1 className="market-grid-element-title-XILRCn">{data.name}</h1>
      <p className="market-grid-element-desc-MePadJ">{data.description}</p>
      <p className="market-grid-element-price-gqXUmN">{data.sellers.sort((a, b) => { a.price - b.price })[0].price}<img className="market-grid-element-diamond-JjlT8Y" src="static/img/diamond.png" /></p>
  </Link>)
}