import React, { Component } from "react";
import logo from "./rh-small-light.svg";

interface DoovdePageState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  hue: number;
}

class DoovdePage extends Component<{}, DoovdePageState> {
  animationFrame: number = 0;
  image = React.createRef<HTMLEmbedElement>();

  constructor(props: any) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      velocityX: 1.2,
      velocityY: 1.8,
      hue: 0,
    };
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.animationFrame = requestAnimationFrame(this.draw);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame);
  }

  draw() {
    if (this.image.current) {
      let { x, y, velocityX, velocityY, hue } = this.state;
      const { innerWidth, innerHeight } = window;
      const { clientWidth, clientHeight } = this.image.current;

      x += velocityX;
      y += velocityY;

      let bounce = false;
      if (x < 0) {
        x = 0;
        velocityX *= -1;
        bounce = true;
      }
      if (x > innerWidth - clientWidth) {
        x = innerWidth - clientWidth;
        velocityX *= -1;
        bounce = true;
      }
      if (y < 0) {
        y = 0;
        velocityY *= -1;
        bounce = true;
      }
      if (y > innerHeight - clientHeight) {
        y = innerHeight - clientHeight;
        velocityY *= -1;
        bounce = true;
      }
      if (bounce) {
        hue = (hue + 60 + Math.random() * 250) % 360;
      }

      this.setState({
        x,
        y,
        velocityX,
        velocityY,
        hue,
      });
    }

    this.animationFrame = requestAnimationFrame(this.draw);
  }

  render() {
    const { x, y, hue } = this.state;
    return (
      <div>
        <embed
          className="fixed"
          style={{
            transform: `translateX(${x}px) translateY(${y}px)`,
            filter: `sepia(1) saturate(7) hue-rotate(${hue}deg)`,
          }}
          ref={this.image}
          src={logo}
        />
      </div>
    );
  }
}

export { DoovdePage };
