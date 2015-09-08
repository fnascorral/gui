// PRIMARY NAVIGATION
// ==================
// Left sidebar with navigation links for the primary sections of the FreeNAS 10
// user interface.

"use strict";

import React from "react";
import { Nav, MenuItem, DropdownButton } from "react-bootstrap";
import { Link } from "react-router";

import MiddlewareClient from "../../websocket/MiddlewareClient";
import SS from "../../flux/stores/SessionStore";
import MS from "../../flux/stores/MiddlewareStore";

import Icon from "../components/Icon";

// Path definitions
// TODO: Convert to Flux or other external file
const paths =
  [ { path     : "dashboard"
    , icon     : "icon-datareport"
    , label    : "Dashboard"
    , status   : null
    , disabled : false
    }
  , { path     : "storage"
    , icon     : "icon-cloud-alt"
    , label    : "Storage"
    , status   : null
    , disabled : false
    }
  , { path     : "network"
    , icon     : "icon-flowchart"
    , label    : "Network"
    , status   : null
    , disabled : false
    }
  , { path     : "accounts"
    , icon     : "icon-id"
    , label    : "Accounts"
    , status   : null
    , disabled : false
    }
  , { path     : "calendar"
    , icon     : "icon-calendar"
    , label    : "Calendar"
    , status   : null
    , disabled : false
    }
  , { path     : "hardware"
    , icon     : "icon-drive"
    , label    : "Hardware"
    , status   : null
    , disabled : false
    }
  , { path     : ""
    , icon     : "icon-mug"
    , label    : "AppCafe"
    , status   : null
    , disabled : true
    }
  , { path     : "settings"
    , icon     : "icon-adjust-horiz"
    , label    : "Settings"
    , status   : null
    , disabled : false
    }
  ];

const menuTiming = 600;

const PrimaryNavigation = React.createClass(

  { getInitialState () {
      return { expanded    : true
             , docLocation : "#"
      };
    }

  , componentDidMount () {
      // After the component has a real DOM representation, store the auto width
      // value of the navbar
      this.setState(
        { fullNavWidth: this.refs.navRoot.getDOMNode().offsetWidth + "px" }
      );
    }

  , createNavItem ( rawItem, index ) {
      if ( rawItem["disabled"] ) {
        return (
          <li
            role = "presentation"
            className = "nav-item disabled"
            key = { index } >
            <a href = "#">
              <Icon glyph = { rawItem["icon"] } />
              <span className = "nav-item-label" >{ rawItem["label"] }</span>
            </a>
          </li>
        );
      } else {
        return (
          <li
            role = "presentation"
            className = "nav-item"
            key = { index } >
            <Link to = { rawItem["path"] } >
              <Icon glyph = { rawItem["icon"] } />
              <span className = "nav-item-label" >{ rawItem["label"] }</span>
            </Link>
          </li>
        );
      }
    }

  , render () {
      let navClass = [ "primary-nav" ];

      if ( this.state.expanded ) {
        navClass.push( "expanded" )
      } else {
        navClass.push( "collapsed" )
      }

      // TODO: Revert changes made for #7908 once externally resolved.
      return (
        <Nav
          stacked
          ref = "navRoot"
          className = { navClass.join( " " ) } >

          <div className="logo-wrapper">
            <img
              className = "logo-image"
              src   = "/img/freenas-icon.png"
            />
            <img
              className = "logo-wordmark"
              src   = "/img/freenas-logotype.png"
            />
            <img
              className = "logo-x"
              src   = "/img/X.png"
            />
          </div>

          { paths.map( this.createNavItem ) }

        </Nav>
      );
    }

});

export default PrimaryNavigation;
