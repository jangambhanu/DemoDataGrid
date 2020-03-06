import React, { Component } from "react";
import ReactDOM from "react-dom";

class ModalDetails extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    	if(!this.props.show){
            return null;
        }
        return (
            <div className="modalBox">
                <h1 className="modalHeader">Transaction {this.props.modalData.account}</h1>
                <p>Account No: {this.props.modalData.account}</p>
                <p>Account Name: {this.props.modalData.accountName}</p>
                <p>Currency Code: {this.props.modalData.currencyCode}</p>
                <p>Amount: {this.props.modalData.amount}</p>
                <p>Transaction Type: {this.props.modalData.transactionType}</p>
                <h6>Click away from datagrid to close!!</h6>
            </div>
        );
    }
}

export default ModalDetails;

