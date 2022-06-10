import React from "react";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import { LoadingButton } from "@mui/lab";
import {
  getPiplineRecognitionStatusWithCallback,
  getTestPiplineRegonitionId,
} from "../../api/Pipline";

export class PiplineTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      buttonTestColor: "warning",
      buttonTestText: "",
    };
    this.intervalID = 0;
    this.startTime = 0;
    this.elapsedTime = 0;
  }

  setLoading = (val) => {
    this.setState((prevState) => ({
      ...prevState,
      loading: val,
    }));
  };

  handleClick = () => {
    this.setLoading(true);
    this.startTime = new Date().getTime();
    getTestPiplineRegonitionId(
      this.props.piplineId,
      this.props.tokenRecognition
    )
      .then((result) => {
        setTimeout(() => {
          this.intervalID = setInterval(
            this.getPiplineRecognitionStatus,
            500,
            result.id
          );
        }, 500);
      })
      .catch((e) => this.onError("error"));
  };

  getPiplineRecognitionStatus = (recognitionId) => {
    getPiplineRecognitionStatusWithCallback(
      {
        piplineId: this.props.piplineId,
        tokenRecognition: this.props.tokenRecognition,
        recognitionId: recognitionId,
      },
      this.checkRegconitionStatus
    );
  };

  onSuccess = () => {
    this.setState(() => ({
      loading: false,
      buttonTestColor: "success",
      buttonTestText: `${this.elapsedTime} ms`,
    }));
  };

  onError = (msg) => {
    this.setState(() => ({
      loading: false,
      buttonTestColor: "error",
      buttonTestText: msg,
    }));
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  };

  checkRegconitionStatus = (resp) => {
    switch (resp.status) {
      case "FINISHED":
        if (this.elapsedTime === 0) {
          this.elapsedTime = new Date().getTime() - this.startTime;
        }
        this.onSuccess();
        clearInterval(this.intervalID);
        break;
      case "RUNNING":
        this.elapsedTime = new Date().getTime() - this.startTime;
        if (this.elapsedTime > 20000) {
          this.onError("Timeout");
          clearInterval(this.intervalID);
        }

        break;
      default:
        this.onError("Timeout");
        clearInterval(this.intervalID);
        break;
    }
  };

  render() {
    return (
      <LoadingButton
        variant="text"
        color={this.state.buttonTestColor}
        onClick={this.handleClick}
        loading={this.state.loading}
      >
        <NetworkCheckIcon style={{ marginRight: "10px" }} />
        <span style={{ fontSize: "11px", textTransform: "Lowercase" }}>
          {this.state.buttonTestText}
        </span>
      </LoadingButton>
    );
  }
}
