import React from "react"
import Item from "./item"

export default class Market extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: null, sub_menu: 0,selected_item_data:null }
        if ((this.state as any).items == null) {
            fetch("/api/market/items").then(result => {
                result.json().then(x => {
                    if (result.status == 200) {
                        this.setState({ items: x.sort((a, b) => { a.name - b.name }) })
                    } else {
                        console.error(x)
                    }
                })
            })
        }
    }

    render() {
        return (
            <div className="market-menu-R1EA0e">
                {(this.props as any).sub_menu == 0 ?
                    <div>
                        <h1>Magasin</h1>
                        {this.renderList()}
                    </div>
                    :
                    <div>

                    </div>}
            </div>
        )
    };

    renderList() {
        if ((this.state as any).items != null) {
            let response = [];
            (this.state as any).items.forEach(item => {
                // @ts-ignore
                response.push(<Item extSetState={() => {this.setState({item_id: item.id });(this.props as any).setState({ sub_menu: 1})}} data={item} key={item.id} />);
            })
            return (<div className="market-grid-JF6gPC">{response}</div>)
        }
    }
}