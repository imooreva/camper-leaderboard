var React = require('react');
var CamperStats = require('CamperStats');

//removed "this" from this.props.children below as it is not needed for arrow function

var Main = (props) => {
    var CamperData;

    CamperStats.top100_recent().then((data) => {
        CamperData = data;
    })
    
    return (
        <div>
            <div>
                <div>
                    <p>Main.jsx Rendered</p>
                    {props.children}
                </div>
            </div>
        </div>
    )
};

module.exports = Main;
