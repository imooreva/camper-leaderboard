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
            dataAllTime: undefined,
            dataRecent: undefined,
            dataSorted: false,
            sortType: 'Recent'
        };
        this.handleData = this.handleData.bind(this);
        this.handleSortRecent = this.handleSortRecent.bind(this);
        this.handleSortAllTime = this.handleSortAllTime.bind(this);
    }
    //call handleData() after App mounts
    componentDidMount() {
        this.handleData();
    }
    //download latest JSON formatted data and use it to update App component's state
    handleData() {
        CamperStats.top100_recent().then((data) => {
            this.setState({
                dataRecent: data
            });
        });
        CamperStats.top100_alltime().then((data) => {
            this.setState({
                dataAllTime: data
            });
        });
    }
    //sort the recent (last 30 days) highest scores
    handleSortRecent() {
        let loadedData = this.state.dataRecent;
        if (loadedData && Array.isArray(loadedData)) {
            //compare first and last scores in array to determine sort order
            let sorted = loadedData[0].recent > loadedData[loadedData.length - 1].recent ? loadedData.sort((a,b) => a.recent - b.recent) : loadedData.sort((a,b) => b.recent - a.recent);
            //update state with our sorted array
            this.setState({
                dataRecent: sorted,
                dataSorted: true,
                sortType: 'Recent'
            })
        }
    }
    //sort the highest scores of all time
    handleSortAllTime() {
        let loadedData = this.state.dataAllTime;
        if (loadedData && Array.isArray(loadedData)) {
            //compare first and last scores in array to determine sort order
            let sorted = loadedData[0].alltime > loadedData[loadedData.length - 1].alltime ? loadedData.sort((a,b) => a.alltime - b.alltime) : loadedData.sort((a,b) => b.alltime - a.alltime);
            //update state with our sorted array
            this.setState({
                dataAllTime: sorted,
                dataSorted: true,
                sortType: 'AllTime'
            })
        }
    }
    
    render() {
        let loadedData = this.state.dataRecent;
        let tableData = null;
        if (!loadedData) {
            tableData = <h3 className="fetching-data">Fetching data...</h3>
        } else {
            tableData = <Main usersRecent={this.state.dataRecent} 
                        usersAllTime={this.state.dataAllTime} 
                        sortType={this.state.sortType} 
                        sortRecent={this.handleSortRecent} 
                        sortAllTime={this.handleSortAllTime}/>;
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
