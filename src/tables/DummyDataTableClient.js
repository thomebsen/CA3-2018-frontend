import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

class App extends Component {
    state = { names: [], msg: "" };

    async componentDidMount() {
        this.props.facade
            .fetchAllDummy()
            .then(res => {
                this.setState({ names: res });
            })
            .catch(err => console.log(err));
    }

    componentDidUpdate() {
        console.timeEnd("rendering");
    }

    render() {
        const columns = [
            {
                dataField: "id",
                text: "ID",
                sort: true
            },
            {
                dataField: "firstName",
                text: "Firstname",
                filter: textFilter()
            },
            {
                dataField: "lastName",
                text: "Lastname",
                filter: textFilter()
            },
            {
                dataField: "email",
                text: "Email"
            }
        ];
        return (
            <div>
                <h3>Build table client</h3>
                {this.state.msg}
                <BootstrapTable
                    striped
                    hover
                    bootstrap4
                    keyField="id"
                    data={this.state.names}
                    columns={columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()}
                />
            </div>
        );
    }
}

export default App;