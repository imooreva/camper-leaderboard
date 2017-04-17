var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('Main');

require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

//app css
require('style!css!sass!applicationStyles')


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updated: 'no'
        };
        this.handleData = this.handleData.bind(this);
    }    
    handleData(e) {
        this.setState({
            updated: 'yes'
        });
    }
    componentDidMount() {
        this.setState({
            updated: 'yes'
        });
    }    
    render() {
        return (
            <div>
                <Main/>            
            </div>
        );
    }    
};

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
