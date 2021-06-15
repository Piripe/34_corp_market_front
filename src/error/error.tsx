import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

export default class Error extends React.Component {

  constructor(props) {
    super(props);

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
      <Router>
        {window.innerWidth >= 851 ?
          <div className="nav-panel-11ytpT">
            <div className="nav-list-item-f5LS2Q nav-logo-VNfkwf">
              <img className="nav-logo-img-70mO4Z" src="static/img/34black.png">
              </img>
            </div>
            <ul className="nav-ul-nFC27e">
              <li><Link to="/" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 0 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 0, sub_menu: 0 }); }} >Accueil</Link></li>
              <li><Link to="/market" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 1 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 1, sub_menu: 0 }); }} >Magasin</Link></li>
              <li><Link to="/" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 2 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 2, sub_menu: 0 }); }} >Banque</Link></li>
              <li><Link to="/" className={`nav-list-item-f5LS2Q nav-list-button-Cidx8z ${(this.state as any).current_menu == 3 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 3, sub_menu: 0 }); }} >Livraisons</Link></li>
            </ul>
          </div>
          :
          <div className="menuToggle-vLnKOr">
            <input type="checkbox" className="menuCheckbox-OZJKwt" />

            <span></span>
            <span></span>
            <span></span>

            <ul className="nav-ul-slOMJy">
              <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 0 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 0, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Accueil</Link></li>
              <li><Link to="/market" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 1 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 1, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Magasin</Link></li>
              <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 2 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 2, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Banque</Link></li>
              <li><Link to="/" className={`nav-list-item-riNYaO nav-list-button-Cidx8z ${(this.state as any).current_menu == 3 ? "selected" : ""}`} onClick={() => { this.setState({ current_menu: 3, sub_menu: 0  }); let checkbox = document.querySelector(".menuCheckbox-OZJKwt"); if ((checkbox as any).checked) { (checkbox as any).checked = false } }} >Livraison</Link></li>
            </ul>

          </div>
        }

        <div className="">
            Error 404
        </div>
      </Router>
    );
  }
}