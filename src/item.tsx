import React from "react";

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        console.log((this.props as any).data)
        return (<div className="market-grid-element-JQZAay" onClick={() => {
            (this.props as any).extSetState()
        }}>
            <img className="market-grid-element-img-NsZHYi" src={(this.props as any).data.thumbnail}></img>
            <h1 className="market-grid-element-title-XILRCn">{(this.props as any).data.name}</h1>
            <p className="market-grid-element-desc-MePadJ">{(this.props as any).data.description}</p>
            <p className="market-grid-element-price-gqXUmN">{(this.props as any).data.sellers.sort((a,b) => {a.price - b.price})[0].price}<img className="market-grid-element-diamond-JjlT8Y" src="static/img/diamond.png"/></p>
        </div>)
    }
};