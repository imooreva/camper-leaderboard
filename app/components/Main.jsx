var React = require('react');
var CamperStats = require('CamperStats');
var UserRecord = require('UserRecord');
/*
var userlist = [
    {
        username: "anthonygallina1",
        img: "https://avatars.githubusercontent.com/u/11003055?v=3",
        alltime: 3977,
        recent: 652,
        lastUpdate: "2017-04-16T04:21:45.928Z"
    },
    {
        username: "SkyCoder01",
        img: "https://avatars.githubusercontent.com/u/24684319?v=3",
        alltime: 857,
        recent: 492,
        lastUpdate: "2017-04-13T02:32:53.332Z"
    },
    {
        username: "sjames1958gm",
        img: "https://avatars.githubusercontent.com/u/4639625?v=3",
        alltime: 6299,
        recent: 489,
        lastUpdate: "2017-04-10T21:43:02.911Z"
}]

var Main = (props) => {
    console.log(props);
    return (
        <table>
            <tbody>
                <UserRecord user={props.users[1].username} />
            </tbody>
        </table>
    )
};*/

class Main extends React.Component {
    render() {
        console.log('Main props: ', this.props)
        let userData = null;
        if (!this.props.users) {
            userData = 'Loading data...';            
        } else {
            userData = this.props.users.map((i) => {
                <tr><td>i.username</td><td>i.recent</td></tr>
            });
        }
        return (
            <table>
                <tbody>
                    {userData}
                </tbody>
            </table>
        )
    }
}

module.exports = Main;
