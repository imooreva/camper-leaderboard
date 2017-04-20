//require modules
var React = require('react');
var ReactDOM = require('react-dom');

//functions and components
var CamperStats = require('CamperStats');
var Main = require('Main');
var UserRecord = require('UserRecord');

//load foundation and app styles
$(document).foundation();
require('style!css!sass!applicationStyles')
require('style!css!foundation-sites/dist/foundation.min.css');


class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            updated: 'no',
            streamedData: undefined
        };
        this.handleData = this.handleData.bind(this);
    }
    //download latest JSON formatted data and use it to update App component's state
    handleData() {
        CamperStats.top100_recent().then((data) => {
            this.setState({
                updated: 'yes',
                streamedData: data
            });
        });
    }
    //call handleData() after App mounts
    componentDidMount() {
        this.handleData();
    }
    
    render() {
        let loadedData = this.state.streamedData;
        let tableData = null;
        if (!loadedData) {
            tableData = <h3 className="fetching-data">Fetching data...</h3>
        } else {
            tableData = <Main users={this.state.streamedData}/>;
        }
        return (
            <div className="column small-centered medium-8 large-10">
                <div id="header"><h1>freeCodeCamp Leaderboard</h1></div>
                {tableData}
            </div>
        );
    }
};

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
