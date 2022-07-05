import "./App.css";
import React from "react";
import { Button, Input, Spinner, Alert } from "reactstrap";

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
      alertIsOpen: false,
      alertText: "",
      alertColor: "danger",
      btnCheckDisable: false,
    };
  }

  btnTest = () => {
    this.setState({ alertIsOpen: true });
    setTimeout(() => {
      this.setState({ alertIsOpen: false });
    }, 1000);
  };

  btnCheck = (number) => {
    const num = Number(number);
    console.log(num);
    if (!num) {
      this.setState({ alertText: "INVALID NUMBER" });
      this.setState({ alertIsOpen: true });
      setTimeout(() => {
        this.setState({ alertIsOpen: false });
      }, 1000);
    } else {
      if (num === this.state.secretNumber) {
        this.setState({ secretNumberVisible: true });
        setTimeout(() => {
          this.setState({ alertText: "You win the Game!" });
          this.setState({ alertColor: "success" });
          this.setState({ bgColor: "#3282B8" });
          this.setState({ secretNumberVisible: 1 });
          this.setState({ alertIsOpen: true });
          this.setState({ btnCheckDisable: true });
          setTimeout(() => {
            this.setState({ alertIsOpen: false });
          }, 1000);
          if (this.state.score > this.state.highScore) {
            this.setState({ highScore: this.state.score });
          }
        }, 1000);
      } else if (num > this.state.secretNumber) {
        this.setState({ secretNumberVisible: true });
        setTimeout(() => {
          this.setState({ secretNumberVisible: false });
          this.setState({ alertText: "Too High!" });
          this.setState({ score: this.state.score - 1 });
          this.setState({ alertIsOpen: true });
          setTimeout(() => {
            this.setState({ alertIsOpen: false });
          }, 1000);
        }, 1000);
      } else if (num < this.state.secretNumber) {
        this.setState({ secretNumberVisible: true });
        setTimeout(() => {
          this.setState({ secretNumberVisible: false });
          this.setState({ alertText: "Too Low!" });
          this.setState({ score: this.state.score - 1 });
          this.setState({ alertIsOpen: true });
          setTimeout(() => {
            this.setState({ alertIsOpen: false });
          }, 1000);
        }, 1000);
      }
    }
  };

  btnAgain = () => {
    this.setState({ secretNumberVisible: false });
    this.setState({ status: "Start Guessing..." });
    this.setState({ score: 20 });
    this.setState({ bgColor: "#1b262c" });
    this.setState({ secretNumber: Math.trunc(Math.random() * 20) + 1 });
    this.setState({ btnCheckDisable: false });
    this.setState({ alertColor: "danger " });
    this.inNumber.value = "";
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: this.state.bgColor }}>
        <div className="top">
          <Button className="button" onClick={this.btnAgain}>
            PLAY AGAIN!
          </Button>
          <h3 className="top-right">Guess number between 1 and 20</h3>
        </div>
        <div className="middle">
          <Alert
            className="alert"
            color={this.state.alertColor}
            isOpen={this.state.alertIsOpen}
          >
            {this.state.alertText}
          </Alert>
          <h1 className="guess-number">guess my number</h1>
          <div className="middle-square">
            {this.state.secretNumberVisible === false ? (
              "?"
            ) : this.state.secretNumberVisible === true ? (
              <Spinner></Spinner>
            ) : (
              this.state.secretNumber
            )}
          </div>
          <div className="line"></div>
        </div>
        <div className="bottom">
          <div className="bottom-left">
            <Input
              type="number"
              innerRef={(e) => (this.inNumber = e)}
              placeholder="1-20"
            />
            <Button
              disabled={this.state.btnCheckDisable}
              className="button"
              onClick={() => this.btnCheck(this.inNumber.value)}
            >
              CHECK!
            </Button>
            {/* <Button onClick={() => this.btnTest()}>Test</Button> */}
          </div>
          <div className="bottom-right">
            <h6>Score : {this.state.score}</h6>
            <h6>High Score : {this.state.highScore}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
