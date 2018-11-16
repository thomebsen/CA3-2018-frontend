import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

const URL = "http://localhost:8084/jwtbackend/api/dummy";

class App extends Component {
  state = { names: [], sizePerPage: 10, page: 1, totalSize: 0 };

  handleTableChange = async (type, props) => {
    const { page, sizePerPage, sortField, sortOrder } = props;
    console.log(props); //Monitor this output, when you test this step
    const sortStr =
      sortField && sortOrder ? `&_sort=${sortField}&_order=${sortOrder}` : "";
    const currentIndex = (page - 1) * sizePerPage;
    const end = currentIndex + sizePerPage;
    const URI = `${URL}?_start=${currentIndex}&_end=${end}${sortStr}`;
    let p = await fetch(URI).then(res => {
      const totalSize = Number(res.headers.get("x-total-count"));
      if (totalSize) {
        this.setState({ totalSize });
      }
      return res.json();
    });
    const names = await p;
    this.setState({ page, sizePerPage, names });
  };

  async componentDidMount() {
    const { page, sizePerPage } = this.state;
    this.handleTableChange("didMount", { page, sizePerPage });
  }
  componentDidUpdate() {
    console.timeEnd("rendering");
  }

  render() {
    const { page, sizePerPage, totalSize } = this.state;

    const columns = [
      {
        dataField: "id",
        text: "ID",
        sort: true
      },
      {
        dataField: "firstName",
        text: "Firstname"
      },
      {
        dataField: "lastName",
        text: "Lastname"
      },
      {
        dataField: "email",
        text: "Email"
      }
    ];
    return (
      <div>
        <h3>Build Table Remote</h3>
        <NavLink activeClassName="active" to="/profilepage">
          <button className="btn btn-default">Go Back</button>
        </NavLink>
        <hr/>
        <BootstrapTable
          striped
          remote
          bootstrap4
          keyField="id"
          data={this.state.names}
          columns={columns}
          onTableChange={this.handleTableChange}
          pagination={paginationFactory({ page, sizePerPage, totalSize })}
        />
      </div>
    );
  }
}

export default App;
