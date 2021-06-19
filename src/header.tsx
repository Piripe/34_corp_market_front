import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

export default class CHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { display_mode: 0 };

        window.onresize = () => {
            if (window.innerWidth < 851) {
                if ((this.state as any).display_mode != 1) {
                    this.setState({ display_mode: 1 })
                }
            } else {
                if ((this.state as any).display_mode != 0) {
                    this.setState({ display_mode: 0 })
                }
            }
        }
    }
}