var React = require('react');
//functions and components
var CamperStats = require('CamperStats');

class Main extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        //conditional statement sorts the appropriate column, and renders the stored data if necessary
        let userProps = this.props.sortType === 'Recent' ? this.props.usersRecent : this.props.usersAllTime;
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
        }
        
        return (
            //if data is unavailable, render div with message, otherwise render data in table
            unavailableMessage ? <div>{unavailableMessage}</div> : 
            <table id="main" role="grid">
                <thead>
                    <tr>
                        <th scope="column">Rank</th>
                        <th scope="column">User</th>
                        <th scope="column" onClick={this.props.sortRecent}>Recent Score - Past 30 Days{this.props.sorted}</th>
                        <th scope="column" onClick={this.props.sortAllTime}>All Time Score</th>
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
