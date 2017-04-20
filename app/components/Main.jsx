//require react and components
var React = require('react');
var CamperStats = require('CamperStats');
var UserRecord = require('UserRecord');


class Main extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        let userProps = this.props.users;
        let userData;
        let unavailableMessage;
        if (Array.isArray(userProps)) {
            //map the information to table rows and cells
            //don't use curly brackets to wrap function output in .map, it prevents userData from rendering
            userData = userProps.map((item,index) =>
                <tr key={index+1} className="rank"><td>{index+1}</td><td className="user"><img src={item.img} className="user-img"/> {item.username}</td><td className="recent">{item.recent}</td><td className="alltime">{item.alltime}</td></tr>
            );
        } else if (!userProps || !Array.isArray(userProps)) {
            unavailableMessage = <h3 className="fetching-data">Data is currently unavailable.</h3>;
        } return (
            //if-else statement with conditional operator
            //if data is unavailable, render a div with message, otherwise render data in a table
            unavailableMessage ? <div>{unavailableMessage}</div> : 
            <table id="main" role="grid">
                <thead>
                    <tr>
                        <th scope="column">Rank</th>
                        <th scope="column">User</th>
                        <th scope="column">Recent Score - Past 30 Days</th>
                        <th scope="column">All Time Score</th>
                    </tr>
                </thead>
                <tbody>
                    {userData}
                </tbody>
            </table>
        )
    }
}

module.exports = Main;
