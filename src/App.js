import React, {Component} from 'react'
import Table from './Table'

class App extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    // send HTTP request
    // save data to state
    const url = 'https://interview-gateway.knstats.com'
    const id = 'd0d1e765d2daddc17c058a8da811c84249e16ff9367c92857ef36e6254d014c4'
    const sec = '297c28dbfdb97f7d8be45d54cb3547ef6cd7be5553d36e3aea29ad133155feb0'

    // var fs = require('fs')
    // var https = require('https')
    // var httpSignature = require('http-signature')

    // var key = fs.readFileSync('./key.pem', 'ascii')

    // var options = {
    //   host: url,
    //   // port: 8443,
    //   path: '/',
    //   method: 'GET',
    //   headers: {}
    // }

    // var req = https.request(options, function(res) {
    //   console.log(res.statusCode);
    // });


    // httpSignature.sign(req, {
    //   key: key,
    //   keyId: 'd0d1e765d2daddc17c058a8da811c84249e16ff9367c92857ef36e6254d014c4',
    //   keyPassphrase: '297c28dbfdb97f7d8be45d54cb3547ef6cd7be5553d36e3aea29ad133155feb0'
    // });

    // req.end();

    this.interval = setInterval(() =>  {
      let nonce = 0

      fetch(url, {
        "method": "GET",
        "headers": {
          'Digest': 'SHA-256=8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414=',
          'Authorization': `Signature keyId="${id}",algorithm="rsa-sha256",headers="(request-target) date digest",signature="${sec}"`,
          "Nonce": (new Date()).getTime() + ('0000' + nonce++).slice(-5)
        }
      })
        .then((result) => result.json())
        .then((result) => {
          this.setState({
            data: result,
          })
          console.log(result)
        })
      }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {data} = this.state

    // const result = data.map((entry, index) => {
    //   return <li key={index}>{entry}</li>
    // })

    // return <ul>{result}</ul>
    return (
      <div className="container">
        <Table data={data} />
      </div>
    )
  }
}

export default App;
