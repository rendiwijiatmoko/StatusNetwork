import React from 'react'
import IdentIcon from 'identicon.js'

function Navbar(props) {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a 
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            >
              StatusNetwork
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-secondary">
                  <small id="account">{props.account}</small>
                </small>
                {props.account?
                <img className="ml-2" width='30' height='30' src={`data:image/png;base64,${new IdentIcon(props.account, 30).toString()}`}/>
                :<span></span>}
              </li>
            </ul>
        </nav>
    )
}

export default Navbar
