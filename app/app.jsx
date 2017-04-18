var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('Main');
var UserRecord = require('UserRecord');
var CamperStats = require('CamperStats');

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
    handleData() {
        CamperStats.top100_recent().then((data) => {
            return data.map((i) => [i.username, i.recent, i.img]);
        }).then((data) => {
            this.setState({
                updated: 'yes',
                streamedData: data
            })
        })
    }
    componentDidMount() {
        this.handleData();
    }
    render() {
        return (
            <div className="column small-centered medium-8 large-10">
                <UserRecord/>
                <Main value={this.state.streamedData}/>            
            </div>
        );
    }    
};

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
