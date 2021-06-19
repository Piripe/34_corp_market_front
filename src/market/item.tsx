import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

export default function Item({items}) {
    if (items != null) {
        let { itemId } = useParams();
        let item = items.find((x) => {return x.id == itemId});
    
        console.log(item)
        return (<div>
                <h3>{`${itemId} : ${item.name}`}</h3>
            </div>);
     }
}