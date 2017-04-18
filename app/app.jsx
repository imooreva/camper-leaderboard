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
            //console.log('isArray', Array.isArray(data));
            console.log('handleData: ', data);
        //    return data;
        //}).then((data) => {
            this.setState({
                updated: 'yes',
                streamedData: data
            })
        })
    }
    componentDidMount() {
        this.handleData();
        console.log('componentdidmount: ', this.state)
    }
    render() {
        let isLoaded = this.state.streamedData;
        let elements = null;
        if (!isLoaded) {
            console.log('Render: Not there yet');
            elements = 'Loading...';
        } else {
            console.log('Render: We\'ve got it!')
            elements = <Main users={this.state.streamedData}/>;
            console.log('elements:', elements);
        }
        return (
            <div className="column small-centered medium-8 large-10">
                {elements}
            </div>
        );
    }    
};

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
