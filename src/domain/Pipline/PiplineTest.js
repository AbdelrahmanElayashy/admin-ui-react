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
      buttonTestText: "Test",
    };
    this.intervalID = 0;
  }

  setLoading = (val) => {
    this.setState((prevState) => ({
      ...prevState,
      loading: val,
    }));
  };

  handleClick = () => {
    this.setLoading(true);
    console.time(`Time Taken for (${this.props.piplineName})`);
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
      .catch((e) => this.onError());
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
      buttonTestText: "Success",
    }));
  };

  onError = () => {
    this.setState(() => ({
      loading: false,
      buttonTestColor: "error",
      buttonTestText: "Error",
    }));
  };

  checkRegconitionStatus = (resp) => {
    switch (resp.status) {
      case "FINISHED":
        console.timeEnd(`Time Taken for (${this.props.piplineName})`);
        this.onSuccess();
        clearInterval(this.intervalID);
        break;
      case "RUNNING":
        break;
      default:
        this.onError();
        clearInterval(this.intervalID);
        break;
    }
  };

  render() {
    return (
      <LoadingButton
        variant="contained"
        color={this.state.buttonTestColor}
        onClick={this.handleClick}
        loading={this.state.loading}
      >
        <NetworkCheckIcon />
        {this.state.buttonTestText}
      </LoadingButton>
    );
  }
}
