import React, { CSSProperties } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Home({items, featured, updateMarket, setState }) {
  if (items == null) {
    updateMarket();
  }
  if (featured == null) {
    fetch("/featured.json", {
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        setState({ featured: result });
      });
    });
  }
  
  return (
    <div>
      <div className="home-valo-x-34-JjED9C">
        <img className="home-valo-x-34-background-NqO6lY" src="/static/img/home_background.jpg"></img>
      <svg className="home-valorious-logo-AtjuhJ" width="315" height="69" viewBox="277 171 405 170">
  <g className="u2 valorious-logo-anim-1">
    <polyline className="valorious-logo-color-white" points="754.88 224.29 739.85 271.54 770.42 269.39 784.82 218.36"/>
    <polyline className="valorious-logo-color-gray-2" points="732.68 272.07 739.85 271.54 754.88 224.29 745 227.93"/>
    <polyline className="valorious-logo-color-gray-1" points="732.68 272.07 740.38 278.33 770.01 269.42"/>
  </g>
  <g className="s2 valorious-logo-anim-6">
    <polyline className="valorious-logo-color-white" points="840.83 237.97 831.76 248.89 849.68 266.67 840.97 308.93 845.14 307.79 852.34 299.07 862 255.12"/>
    <polyline className="valorious-logo-color-gray-1" points="746.55 265.6 739.22 275.2 831.76 248.89 840.83 237.97"/>
    <polyline className="valorious-logo-color-gray-1" points="760.19 316.63 742.76 336.08 840.97 308.93 849.68 266.67 834.46 272.17 826.25 297.31"/>
    <polyline className="valorious-logo-color-gray-2" points="742.76 336.08 760.19 316.63 826.25 297.31 834.46 272.17 849.68 266.67 831.76 248.89 739.22 275.2 753.12 288.34 813.12 271.22 818.67 275.2 760.82 291.5 753.62 300.72 742.76 325.22"/>
  </g>
  <g className="s1 valorious-logo-anim-5">
    <polyline className="valorious-logo-color-white" points="734.29 271.22 754.95 220.44 819.18 204.15 841.16 182.55 741.87 204.53 731.45 213.05 718.76 255.31"/>
    <polyline className="valorious-logo-color-gray-1" points="827.89 217.73 758.93 234.27 755.64 241.47 820.19 226.19"/>
    <polyline className="valorious-logo-color-gray-2" points="733.69 271.22 744.4 266.67 758.93 234.27 827.89 217.73 841.16 182.55 819.18 204.15 754.95 220.44"/>
  </g>
  <g className="u1 valorious-logo-anim-4">
    <polyline className="valorious-logo-color-white" points="681.12 218.36 674.55 224.42 660.02 302.36 727.73 323.58 741.81 307.62 727.79 297.59 723.43 309.68 683.14 297.81 698.8 232.38 705.37 225.68"/>
    <polyline className="valorious-logo-color-gray-2" points="660.02 302.36 668.36 319.06 727.47 336.68 744.34 323.58 749.17 312.05 741.81 307.62 727.73 323.58"/>
    <polyline className="valorious-logo-color-gray-2" points="689.26 299.62 705.37 225.68 698.8 232.38 683.14 297.81"/>
    <polyline className="valorious-logo-color-gray-1" points="691.5 289.35 689.26 299.62 723.43 309.68 727.79 297.59"/>
    <polyline className="valorious-logo-color-gray-1" points="741.81 307.62 749.17 312.05 752.96 303.24 738.65 288.56 727.79 297.59"/>
  </g>
  <g className="o22 valorious-logo-anim-6">
    <polyline className="valorious-logo-color-white" points="614.17 213.24 625.73 202.82 659.83 201.12 679.35 222.53 667.22 229.92 669.3 271.6 658.88 288.27 628.76 289.41 627.62 281.26 629.71 279.37 653.39 276.72 650.55 228.4 628.19 228.4 617.01 238.44"/>
    <polyline className="valorious-logo-color-gray-1" points="640.32 237.87 650.55 228.4 628.19 228.4 617.01 238.44"/>
    <polyline className="valorious-logo-color-gray-1" points="619.66 287.7 619.66 313.28 655.85 313.28 663.62 304 630.94 304.79 627.62 281.26"/>
    <polyline className="valorious-logo-color-gray-2" points="640.32 237.87 643.55 277.82 653.39 276.72 650.55 228.4"/>
    <polyline className="valorious-logo-color-gray-2" points="628.76 289.41 630.94 304.79 663.62 304 682.5 279.75 679.35 222.53 667.22 229.92 669.3 271.6 658.88 288.27"/>
  </g>
  <g className="r2 valorious-logo-anim-2">
    <polyline className="valorious-logo-color-white" points="446.11 234.84 458.81 266.1 523.79 270.11 493.85 254.93 473.39 251.99 465.62 243.94"/>
    <polyline className="valorious-logo-color-gray-1" points="540.46 285.05 537.62 326.55 531.37 328.82 543.12 338.48 547.85 292.63"/>
    <polyline className="valorious-logo-color-gray-1" points="510.15 289.98 504.98 279.94 460.69 278.04 460.69 306.46 439.1 307.79 442.88 313.28 465.43 314.61 470.74 286.95"/>
    <polyline className="valorious-logo-color-gray-2" points="446.11 234.84 434.8 301.95 439.1 307.79 460.69 306.46 460.69 278.04 504.98 279.94 510.15 289.98 510.97 311.2 531.37 328.82 537.62 326.55 540.46 285.05 528.78 272.3 523.79 270.11 458.81 266.1"/>
  </g>
  <g className="o21 valorious-logo-anim-3">
    <polyline className="valorious-logo-color-white" points="583.66 228.4 559.79 261.5 562.13 310.74 576.27 307.6 574.07 261.5 581.01 252.47 610.57 242.42 607.73 228.4"/>
    <polyline className="valorious-logo-color-gray-1" points="595.79 262.5 586.32 263.83 588.59 304.76 606.4 304.76 607.35 326.93 616.25 317.45 616.25 294.72 598 295.28"/>
    <polyline className="valorious-logo-color-gray-2" points="610.57 242.42 581.01 252.47 574.07 261.5 576.27 307.6 562.13 310.74 583.35 328.82 607.35 326.93 606.4 304.76 588.59 304.76 586.32 263.83 602.67 261.5 612 249.56"/>
  </g>
  <g className="r1 valorious-logo-anim-4">
    <polyline className="valorious-logo-color-gray-2" points="509.96 244.13 534.4 256.63 532.5 232.76 528.24 228.4 520.19 236.17 522.08 243.05"/>
    <polyline className="valorious-logo-color-gray-2" points="448.19 206.23 447.05 216.46 472.06 232.88 480.9 227.17 485.89 218.17 534.83 230.51 543.12 224.01 535.92 215.52 476.04 203.77 469.22 218.17"/>
    <polyline className="valorious-logo-color-white" points="448.19 206.23 449.7 194.67 460.32 185.39 549.37 202.06 558.46 220.63 554.86 266.86 534.4 256.63 532.5 232.76 528.24 228.4 534.83 230.51 543.12 224.01 535.92 215.52 476.04 203.77 469.22 218.17"/>
    <polyline className="valorious-logo-color-gray-1" points="528.24 228.4 485.89 218.17 481.73 226.13 520.19 236.17"/>
    <polyline className="valorious-logo-color-gray-1" points="509.96 244.13 554.86 266.86 535.35 273.12 504.98 252.47"/>
  </g>
  <g className="i valorious-logo-anim-3">
    <polyline className="valorious-logo-color-white" points="557.83 215.45 533.2 232.88 542.04 322.19 568.95 318.65"/>
    <polyline className="valorious-logo-color-gray-2" points="568.95 318.65 577.88 327.97 570.59 226.03 557.83 215.45"/>
    <polyline className="valorious-logo-color-gray-1" points="542.04 322.19 552.12 330.43 577.88 327.97 568.95 318.65"/>
  </g>
  <g className="o12 valorious-logo-anim-1">
    <polyline className="valorious-logo-color-white" points="409.79 297.18 426.46 297.18 439.1 284.3 438.34 240.08 454.38 234.78 430.5 211.28 408.27 211.28 400.95 218.99 400.95 226.95 421.28 226.69 429.5 236.29 428.99 282.21 420.78 283.79 411.18 283.66 409.79 285.05"/>
    <polyline className="valorious-logo-color-gray-2" points="409.79 297.18 409.92 309.87 432.84 309.21 455.48 288.59 454.38 234.78 438.34 240.08 439.1 284.3 426.46 297.18"/>
    <polyline className="valorious-logo-color-gray-2" points="400.95 226.95 400.95 236.75 420.9 236.36 420.78 283.79 428.99 282.21 429.5 236.29 421.28 226.69"/>
    <polyline className="valorious-logo-color-gray-1" points="409.79 285.05 400.95 293.96 402.05 316.98 425.26 316.32 432.84 309.21 410.48 309.87"/>
  </g>
  <g className="l1 valorious-logo-anim-6">
    <polyline className="valorious-logo-color-white" points="310.63 206.99 292.82 226.88 302.86 256.25 308.17 259.85 330.72 259.85 315.18 209.45"/>
    <polyline className="valorious-logo-color-gray-1" points="311.77 263.26 332.61 265.16 330.72 259.85 308.17 259.85"/>
    <polyline className="valorious-logo-color-gray-2" points="323.26 214.19 340.82 265.73 332.61 265.16 330.72 259.85 315.18 209.45"/>
  </g>
  <g className="o11 valorious-logo-anim-5">
    <polyline className="valorious-logo-color-white" points="348.4 304.13 391.73 295.16 391.73 288.34 387.43 283.92 370.06 283.16 363.68 285.68 348.4 288.59 343.73 242.1 352.06 230.61 390.08 226.44 389.58 224.29 378.46 214.19 345.37 218.74 330.59 242.1 334.76 293.26"/>
    <polyline className="valorious-logo-color-gray-2" points="390.08 226.44 389.64 247.25 380.93 239.39 357.72 242.8 363.68 285.68 348.4 288.59 343.73 242.1 352.06 230.61"/>
    <polyline className="valorious-logo-color-gray-2" points="348.4 304.13 357.81 312.24 390.87 308.17 391.73 295.16"/>
    <polyline className="valorious-logo-color-gray-1" points="389.64 247.25 380.93 239.39 357.72 242.8 363.68 285.68 370.06 283.16 365.96 251.04"/>
    <polyline className="valorious-logo-color-gray-1" points="391.73 288.34 397.98 293.86 397.98 316.98 362.64 316.5 357.81 312.24 390.87 308.17 391.73 295.16"/>
  </g>
  <g className="l2 valorious-logo-anim-4">
    <polyline className="valorious-logo-color-white" points="310.25 280.88 310.25 312.15 387.75 305.52 387.27 297.84 323.33 300.97 322.66 284.86"/>
    <polyline className="valorious-logo-color-gray-1" points="306 322.95 306 331.85 310.25 334.5 382.63 324.65 388.88 315.56 311.01 325.03"/>
    <polyline className="valorious-logo-color-gray-2" points="306 278.86 306 322.95 311.01 325.03 388.88 315.56 396.27 305.26 387.27 297.84 387.75 305.52 310.25 312.15 310.25 280.88"/>
    <polyline className="valorious-logo-color-gray-2" points="322.66 284.86 323.33 300.97 331.47 300.57 331.47 292"/>
  </g>
  <g className="a valorious-logo-anim-3">
    <polyline className="valorious-logo-color-white" points="209.83 309.68 223.22 299.2 223.22 280.5 288.9 280.5 288.9 321.94 300.02 328.76 300.02 252.08 284.99 235.66 227.9 235.66 209.83 251.07 230.93 245.39 275.52 245.01 275.64 271.79 222.34 272.17 222.46 259.92 230.93 245.39 209.83 251.07"/>
    <polyline className="valorious-logo-color-gray-1" points="235.13 255.02 241.19 259.76 275.56 259.38 275.56 255.02"/>
    <polyline className="valorious-logo-color-gray-1" points="235.41 290.64 235.41 312.62 212.39 312.62 219.5 320.96 241.38 320.96 241.38 299.45 275.56 299.55 275.56 290.74"/>
    <polyline className="valorious-logo-color-gray-2" points="223.22 280.5 223.22 299.2 209.83 309.68 212.39 312.62 235.41 312.62 235.41 290.64 275.56 290.74 275.56 310.44 286.38 320.77 288.9 321.94 288.9 280.5"/>
    <polyline className="valorious-logo-color-gray-2" points="241.66 268.47 241.19 259.76 235.13 255.02 275.56 255.02 275.52 245.01 230.93 245.39 222.46 259.92 222.34 272.17 246.78 272"/>
    <polyline className="valorious-logo-color-gray-2" points="300.02 252.08 309.97 262.41 309.97 334.22 300.02 328.76"/>
  </g>
  <g className="v2 valorious-logo-anim-2">
    <polyline className="valorious-logo-color-white" points="185.58 280.13 199.98 272.36 239.39 204.72 259.1 195.05 260.23 193.16 255.68 189.75 227.64 189.75 219.5 197.52 185.58 261.5"/>
    <polyline className="valorious-logo-color-gray-1" points="185.58 304.28 198.13 304.28 202.87 295.57 193.4 294.72 193.66 275.77 185.58 280.13"/>
    <polyline className="valorious-logo-color-gray-2" points="259.1 195.05 202.87 295.57 193.4 294.72 193.66 275.77 199.98 272.36 239.39 204.72"/>
  </g>
  <g className="v1 valorious-logo-anim-1">
    <polyline className="valorious-logo-color-white" points="130 172.76 95.89 172.76 95.89 179.58 152.74 308.93 170.93 308.93 170.93 252.59 140.61 183.37"/>
    <polyline className="valorious-logo-color-gray-1" points="162.84 319.03 179.01 319.03 179.01 270 170.93 252.59 170.93 308.93 152.74 308.93"/>
  </g>
  </svg>
  <h1>╳</h1>
  <img className="home-34-logo-3NTjNn" src="/static/img/34black.png" />
      </div>

      <div className="home-featured-div-Pij3d4">
      <h1>Tendances</h1>
      {items != null ? <RenderList items={items} featured={featured} /> : <p>Chargement...</p>}
      </div>
    </div>
  );
}

function RenderList({ items, featured }) {
  if (featured != null) {
    let response = [];
    featured.forEach((x:any) => {
      let data = {thumbnail:"/static/img/34black.png",title:"Chargement...",description:"Chargement...",link:"/",price:-1}

      if (x.type="item" && items && x.infos) {
        let item = items.find(y => y.id == x.infos.item_id);
        if (item) {
          let sellers = []
          if (item.sellers) {sellers = item.sellers}
        data = {thumbnail:item.thumbnail,title:item.name,description:item.description,link:`/market/${x.infos.item_id}/${x.infos.seller_id}`,price:getMinPrice(sellers)}
        }
      }

      data = Object.assign({thumbnail:"/static/img/34black.png",title:"Chargement...",description:"Chargement...",link:"/",price:-1},data)
      
      if (x.override_infos) {
        data = Object.assign(data,x.display_infos)
      }

        response.push(<ItemElement data={data}/>);
    });
    return <div className="market-grid-JF6gPC">{response}</div>;
  }
  return <div />;
}
function ItemElement({ data }) {
  return (
    <Link to={data.link} className="market-grid-element-JQZAay">
      <img className="market-grid-element-img-NsZHYi" src={data.thumbnail}></img>
      <h1 className="market-grid-element-title-XILRCn">{data.title}</h1>
      <p className="market-grid-element-desc-MePadJ">{(data.description as string).length > 35 ? data.description.substr(0, 33) + "..." : data.description}</p>
      {(data.price > 0) ? <p className="market-grid-element-price-gqXUmN">{data.price}
        <img className="market-grid-element-diamond-JjlT8Y" src="/static/img/diamond.png" />
      </p>
      : <p/> }
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