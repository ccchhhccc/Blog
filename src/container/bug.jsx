import React from 'react'
import { Tag } from 'antd';
import { connect } from "react-redux";
import './content/content.css'
class MyBug extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <ul style={{display:this.props.chooseKey==='mybug'?'block':'none'}}>
                <li className="content-li">
                    <div className="box-title">
                        <h3>test</h3>
                        <Tag color="magenta">magenta</Tag>
                        <Tag color="red">red</Tag>
                    </div>
                    <p className="message">2333333333333333333hfhahsdfjakjsd333333333333333hfhahsdfjakjsdhfiuahiudfhafhaugdfuagsdbvagdyfgadsuyfgyuagdfygayug</p>
                </li>
                <li className="content-li">
                    <div className="box-title">
                        <h3>test</h3>
                        <Tag color="magenta">magenta</Tag>
                        <Tag color="red">red</Tag>
                    </div>
                    <p className="message">2333333333333333333hfhahsdfjakjsd333333333333333hfhahsdfjakjsdhfiuahiudfhafhaugdfuagsdbvagdyfgadsuyfgyuagdfygayug</p>
                </li>
            </ul>           
        )
    }
}
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(MyBug);