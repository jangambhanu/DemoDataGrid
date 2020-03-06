import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import ModalDetails from './ModalDetails';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel } from 'devextreme-react/data-grid';
import { SelectBox } from 'devextreme-react';
import CBox from './Checkbox';
import data1 from '../../data/data.json';
import Checkbox from './Checkbox';

const map = new Map();
var data = [];
var dataGrid;
class GridPanel extends Component {
    constructor() {
        super();
        this.myRef = React.createRef();
        this.transactions = data1.transactions;
        this.state = {
            isOpen: false,
            gridInstance: false,
            checkedItems: new Map(),
            showEmployeeInfo: false,
            selectedRowNotes: '',
            backgroundClass: '',
            checkName: '',
            checkTransaction: '',
            aNames: [
                { id: 1, value: "Savings Account", isChecked: false }, { id: 2, value: "Checking Account", isChecked: false },
                { id: 3, value: "Auto Loan Account", isChecked: false }, { id: 4, value: "Credit Card Account", isChecked: false },
                { id: 5, value: "Investment Account", isChecked: false }, { id: 6, value: "Personal Loan Account", isChecked: false },
                { id: 7, value: "Money Market Account", isChecked: false }, { id: 8, value: "Home Loan Account", isChecked: false },
            ],
            tTypes: [
                { id: 1, value: "Deposit", isChecked: false }, { id: 2, value: "withdrawal", isChecked: false },
                { id: 3, value: "Invoice", isChecked: false }, { id: 4, value: "Payment", isChecked: false }
            ]
        };
        this.dataGrid = null;
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onShowANameChanged = this.onShowANameChanged.bind(this);
        this.onShowTTChanged = this.onShowTTChanged.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }

    componentDidMount() {
    }

    //Modal Functions
    showModal() {
        this.setState({ isOpen: true });
    }
    closeModal() {
        this.setState({ isOpen: false });
        this.setState({ backgroundClass: '' });
    }

    //DataGrid Functions
    onShowANameChanged(event) {
        const dataGrid = this.dataGrid.instance;
        let name = this.state.aNames;
        name.forEach(name => {
            if (name.value === event.target.value && event.target.checked) {
                if (this.state.checkTransaction != '' && this.state.checkTransaction.length > 0) {
                    dataGrid.filter(['transactionType', '=', this.state.checkTransaction],
                        'and', ['accountName', '=', event.target.value]);
                } else {
                    dataGrid.filter(['accountName', '=', event.target.value]);
                }
                this.setState({ checkName: name.value });
                name.isChecked = event.target.checked
            } else {
                if (this.state.checkTransaction != '' && event.target.value == '') {
                    dataGrid.clearFilter();
                    dataGrid.filter(['transactionType', '=', this.state.checkTransaction]);
                }
                    name.isChecked = false;
            }
        })

        if (name.isChecked == false) {
            this.setState({ checkName: '' });
        }

        name.forEach(nm => {
            if (event.target.checked == false) {
                   this.setState({ checkName: '' });
                if (this.state.checkTransaction != '') {
                    dataGrid.clearFilter();
                    dataGrid.filter(['transactionType', '=', this.state.checkTransaction]);
                } else {
                dataGrid.clearFilter();
                }
            }
        })
        this.setState({ aNames: name })
    }
    onShowTTChanged(event) {
        const dataGrid = this.dataGrid.instance;
        let trType = this.state.tTypes;
        trType.forEach(tty => {
            if (tty.value === event.target.value && event.target.checked) {
                console.log('One TT')
                if (this.state.checkName != '') {
                    dataGrid.filter(['accountName', '=', this.state.checkName],
                        'and', ['transactionType', '=', event.target.value]);
                } else {
                    dataGrid.filter(['transactionType', '=', event.target.value]);
                }
                this.setState({ checkTransaction: tty.value });
                tty.isChecked = event.target.checked
            } else {
                if (this.state.checkName != '' && event.target.value == '') {
                    dataGrid.clearFilter();
                    dataGrid.filter(['accountName', '=', this.state.checkName]);
                }
                tty.isChecked = false;
            }
        })


        if (trType.isChecked == false) {
            this.setState({ checkTransaction: '' });
        }

        trType.forEach(nm => {
            if (event.target.checked == false) {
                this.setState({ checkTransaction: '' });
                if (this.state.checkName != '') {
                    dataGrid.clearFilter();
                    dataGrid.filter(['accountName', '=', this.state.checkName]);
                } else {
                    dataGrid.clearFilter();
                }
            }
        })
        this.setState({ tTypes: trType })
    }

    onSelectionChanged({ selectedRowsData }) {
        data = selectedRowsData[0];
        this.setState({
            showEmployeeInfo: true,
            selectedRowPicture: data
        });
        this.setState({ backgroundClass: blur });
        this.showModal();
    }

    render() {

        const { label } = this.props;
        const { isChecked } = this.state;
        let loadGridPanel = <div></div>;
        var cName = this.state.backgroundClass ? this.state.backgroundClass : '';
        loadGridPanel =
            <div className="body">
            <div className={this.state.backgroundClass ? "blur" : ""}>
                    <div className="filterDiv">
                    <label>Filters</label>
                        <h5>Account Name</h5>
                        <div className="filterPanel">
                            {
                                this.state.aNames.map((aa) => {
                                    return (
                                        <label key={aa.id} >
                                            <Checkbox key={aa.id} handleCheckChieldElement={this.onShowANameChanged}
                                                {...aa} />
                                        </label>
                                    );
                                })
                            }
                        </div>
                        <h5>Transaction Type</h5>
                        <div className="filterPanel">
                            {
                                this.state.tTypes.map((tt) => {
                                    return (
                                        <label key={tt.id}>
                                            <Checkbox key={tt.id} handleCheckChieldElement={this.onShowTTChanged}
                                                {...tt} />
                                        </label>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div onClick={this.state.isOpen ? this.closeModal : null}>
                        <DataGrid id="gridContainer"
                            ref={(ref) => this.dataGrid = ref}
                            dataSource={this.transactions}
                            selection={{ mode: 'single' }}
                            showBorders={true}
                            hoverStateEnabled={true}
                            keyExpr="account"
                            onSelectionChanged={this.onSelectionChanged}
                        >
                            <Column dataField="account" width={140} caption="ACCOUNT NO."> </Column>
                            <Column dataField="accountName" width={220} caption="ACCOUNT NAME"> </Column>
                            <Column dataField="currencyCode" width={140} caption="CURRENCY"> </Column>
                            <Column dataField="amount" width={140} caption="AMOUNT"> </Column>
                            <Column dataField="transactionType" width={220} caption="TRANSACTION TYPE"> </Column>
                        </DataGrid>
                    </div>
                </div>
                {
                    this.state.showEmployeeInfo &&
                    <ModalDetails show={this.state.isOpen}
                        onClose={this.closeModal} modalData={this.state.selectedRowPicture}>
                    </ModalDetails>
                }
            </div>
        return (
            <div onClick={this.state.isOpen ? this.closeModal : null}>
                {
                    loadGridPanel
                }
            </div>
        );
    }
}

export default GridPanel;

