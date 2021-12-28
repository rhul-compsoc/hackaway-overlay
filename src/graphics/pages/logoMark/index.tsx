import React, { Component } from "react";
import logo from "./rh-white-montserrat-v5.svg";

class LogoMark extends Component {
  render() {
    return (
      <nav>
        <div
          className="h-24 p-2 bg-hackaway-grey fixed top-0 left-0 right-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 3rem) 100%, 0 100%)",
          }}
        >
          <div
            className="h-24 w-96 float-left"
            style={{
              shapeOutside: "polygon(0 0, 24rem 0, 21rem 100%, 0 100%)",
            }}
          ></div>
          <p className="text-white relative top-1/2 -translate-y-1/2 -translate-x-2.5">
            Lorem ipsum dolor ser amit something loona stan
          </p>
        </div>
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
