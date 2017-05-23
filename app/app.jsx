var React = require('react');
var ReactDOM = require('react-dom');

//external functions and components
var CamperStats = require('CamperStats');
var Header = require('Header');
var Footer = require('Footer');
var Main = require('Main');

//load foundation and app styles
$(document).foundation();
require('style!css!sass!applicationStyles');
require('style!css!foundation-sites/dist/foundation.min.css');


class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataAllTime: undefined,
            dataRecent: undefined,
            dataAllTimeSorted: false,
            dataRecentSorted: true,
            sortType: 'Recent'
        };
        this.handleData = this.handleData.bind(this);
        this.handleSortRecent = this.handleSortRecent.bind(this);
        this.handleSortAllTime = this.handleSortAllTime.bind(this);
    }
    
    componentDidMount() {
        this.handleData();
    }
    //download latest JSON data and use it to update App component's state
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
    //JSON data on the server is already sorted in descending order, but we'll sort it here anyway
    handleSortRecent() {
        let loadedData = this.state.dataRecent;
        if (loadedData && Array.isArray(loadedData)) {
            //compare first and last scores in array to determine sort order, then sort in descending order
            let sorted = loadedData.sort((a,b) => b.recent - a.recent);
            //update state with our sorted array
            this.setState({
                dataRecent: sorted,
                dataRecentSorted: true,
                dataAllTimeSorted: false,
                sortType: 'Recent'
            });
        };
    }
    //sort the highest scores of all time
    handleSortAllTime() {
        let loadedData = this.state.dataAllTime;
        if (loadedData && Array.isArray(loadedData)) {
            //compare first and last scores in array to determine sort order, then sort in descending order
            let sorted = loadedData.sort((a,b) => b.alltime - a.alltime);
            //update state with our sorted array
            this.setState({
                dataAllTime: sorted,
                dataRecentSorted: false,
                dataAllTimeSorted: true,
                sortType: 'AllTime'
            });
        };
    }
    
    render() {
        let loadedData = this.state.dataRecent;
        let tableData = null;
        if (!loadedData) {
            tableData = <h3 className="fetching-data">Fetching data...</h3>
        } else {
            tableData = <Main usersRecent={this.state.dataRecent} 
                        usersAllTime={this.state.dataAllTime} 
                        sortedRecent={this.state.dataRecentSorted} 
                        sortedAllTime={this.state.dataAllTimeSorted}
                        sortType={this.state.sortType} 
                        sortRecent={this.handleSortRecent} 
                        sortAllTime={this.handleSortAllTime}/>;
        };
        return (
            <div className="column small-centered medium-8 large-10">
                <Header/>
                {tableData}
                <Footer/>
            </div>
        );
    }
};

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
