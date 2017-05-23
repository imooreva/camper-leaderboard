var React = require('react');

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
            //don't use curly brackets to wrap function output in .map() method
            userData = userProps.map((item,index) =>
                <tr key={index+1} className="rank">
                    <td>{index+1}</td>
                    <td className="user"><img src={item.img} className="user-img"/> {item.username}</td>
                    <td className="recent">{item.recent}</td><td className="alltime">{item.alltime}</td>
                </tr>
            );
        } else if (!userProps || !Array.isArray(userProps)) {
            unavailableMessage = <h3 className="fetching-data">Data is currently unavailable.</h3>;
        };
        //for descending arrow symbol in header cells
        if (this.props.sortType === 'Recent') {
            $('#recent-down-arrow').css("display","inline-block");
            $('#alltime-down-arrow').css("display","none");
        } else {
            $('#recent-down-arrow').css("display","none");
            $('#alltime-down-arrow').css("display","inline-block");
        };
            
        return (
            //if data is unavailable, render div with message, otherwise render data in table
            unavailableMessage ? <div>{unavailableMessage}</div> : 
            <table id="main" role="grid">
                <thead>
                    <tr>
                        <th scope="column">Rank</th>
                        <th scope="column">User</th>
                        <th scope="column" id="recent-th" onClick={this.props.sortRecent}>
                            <a href="#">Recent<span className="score-span"> Score - Past 30 Days</span>
                                <span id="recent-down-arrow">&#x25BC;</span>
                            </a>
                        </th>
                        <th scope="column" onClick={this.props.sortAllTime}>
                            <a href="#">All Time<span className="score-span"> Score</span>
                                <span id="alltime-down-arrow">&#x25BC;</span>
                            </a>
                        </th>
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
