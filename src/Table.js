import React, {Component} from 'react'

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th><button type="button" onClick={() => setSortedField('name')}>
              Name</button></th>
            <th>Symbol</th>
            <th>Reserve Balance</th>
            <th>Exchange Balance</th>
            <th><button type="button" onClick={() => setSortedField('totalBalance')}>
              Total Balance</button></th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.data.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.symbol}</td>
                <td>{row.reserveBalance}</td>
                <td>{row.exchangeBalance}</td>
                <td>{row.totalBalance}</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

class Table extends Component {
  render() {
    const {data} = this.props

    const [sortedField, setSortedField] = React.useState(null);
    let sortedData = [...data]
    if (sortedField !== null) {
      sortedData.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
        return 0;
      });

    return (
      <table>
        <TableHeader />
        <TableBody data={data}/>
      </table>
    )
  }
}

export default Table