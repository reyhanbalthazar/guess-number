import "./App.css";
import React from "react";
import { Button, Input } from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretNumberVisible: false,
      secretNumber: Math.trunc(Math.random() * 20) + 1,
      status: "Start Guessing...",
      score: 20,
      highScore: 0,
      bgColor: "#1b262c",
    };
  }

  btnCheck = (number) => {
    const num = Number(number);
    console.log(num);
    if (!num) {
      this.setState({ status: "Invalid Guess!" });
    } else {
      if (num === this.state.secretNumber) {
        this.setState({ status: "You win the Game!" });
        this.setState({ bgColor: "#3282B8" });
        this.setState({ secretNumberVisible: true });
        if (this.state.score > this.state.highScore) {
          this.setState({ highScore: this.state.score });
        }
      } else if (num > this.state.secretNumber) {
        this.setState({ status: "Too High!" });
        this.setState({ score: this.state.score - 1 });
      } else if (num < this.state.secretNumber) {
        this.setState({ status: "Too Low!" });
        this.setState({ score: this.state.score - 1 });
      }
    }
  };

  btnAgain = () => {
    this.setState({ secretNumberVisible: false });
    this.setState({ status: "Start Guessing..." });
    this.setState({ score: 20 });
    this.setState({ bgColor: "#1b262c" });
    this.inNumber.value = "";
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: this.state.bgColor }}>
        <div className="top">
          <Button className="button" onClick={this.btnAgain}>
            AGAIN!
          </Button>
          <h3 className="top-right">Guess number between 1 and 20</h3>
        </div>
        <div className="middle">
          <h1 className="guess-number">guess my number</h1>
          <div className="middle-square">
            {this.state.secretNumberVisible === false
              ? "?"
              : this.state.secretNumber}
          </div>
          <div className="line"></div>
        </div>
        <div className="bottom">
          <div className="bottom-left">
            <Input type="number" innerRef={(e) => (this.inNumber = e)} />
            <Button
              className="button"
              onClick={() => this.btnCheck(this.inNumber.value)}
            >
              CHECK!
            </Button>
          </div>
          <div className="bottom-right">
            <h3>{this.state.status}</h3>
            <h6>Score : {this.state.score}</h6>
            <h6>High Score : {this.state.highScore}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
