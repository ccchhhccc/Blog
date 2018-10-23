import React from 'react'
import { Timeline } from 'antd';
import { connect } from "react-redux";
import './content/content.css'
class TimeThing extends React.Component {
    // constructor(props){
    //     super(props)
    // }
    render() {
        return (
            <Timeline mode="alternate">
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>2333333333333333333hfhahsdfjakjsd333333333333333hfhahsdfjakjsdhfiuahiudfhafhaugdfuagsdbvagdyfgadsuyfgyuagdfygayugNetwork problems being solved 2015-09-01</Timeline.Item>
            </Timeline>        
        )
    }
}
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(TimeThing);