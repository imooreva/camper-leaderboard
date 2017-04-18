var React = require('react');
var CamperStats = require('CamperStats');
var UserRecord = require('UserRecord');

var Main = (props) => {
    console.log('value:', Array.isArray(props.value))
    var CamperData = props.value;
    return (        
        <div className="row">
            <table>
                {CamperData}
            </table>
        </div>
    )
};

module.exports = Main;
