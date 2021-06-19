import React, { CSSProperties } from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

export default class Error extends React.Component {

  constructor(props) {
    super(props);

    this.state = {display_mode: 0}
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
  render() {
    return (
        <div className="" style={{marginTop:'150px', marginLeft: '50px', fontSize:'50px', fontWeight:500}}>
            Error 404
        </div>
    );
  }
}