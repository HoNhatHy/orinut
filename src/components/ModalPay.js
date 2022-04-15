import React from "react";
import ReactDOM from "react-dom";

import ModalPayForm from "./ModalPayForm";
import showScroll from "./sub-components/showScroll";

class ModalPay extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div
        className="modal modal-when-click"
        onClick={() => {
          this.props.setModal(false);
          showScroll();
        }}
      >
        <ModalPayForm
          setModalAnnounce={this.props.setModalAnnounce}
          setModal={this.props.setModal}
          cart={this.props.cart}
        />
      </div>,
      document.querySelector("#modalPay")
    );
  }
}

export default ModalPay;
