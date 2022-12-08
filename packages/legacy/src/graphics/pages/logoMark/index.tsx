import React, { Component } from "react";
import logo from "./rh-white-montserrat-v5.svg";

class LogoMark extends Component {
  render() {
    return (
      <nav className="absolute">
        <div
          className="h-32 w-96 bg-hackaway-orange flex flex-col items-center justify-center fixed top-0 left-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 4rem) 100%, 0% 100%)",
          }}
        >
          <img className="fixed pr-14 w-80" src={logo} />
        </div>
      </nav>
    );
  }
}

export { LogoMark };
