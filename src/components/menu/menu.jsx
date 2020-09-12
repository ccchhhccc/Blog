import { Menu, Icon } from 'antd';
import React from 'react'
import { connect } from "react-redux";
import './menu.css'
class MenuItem extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const {onChoose,meumItem} = this.props
        return (
            <div id="MenuItem">
                <Menu
                    onClick={e=>onChoose(e.key)}
                    style={{ width: 203 }}
                    defaultSelectedKeys={[meumItem]}
                >
                    <Menu.Item key="note">
                        <Icon type="save" theme="outlined" />
                        记事本
                    </Menu.Item>
                    <Menu.Item key="animate">
                        <Icon type="desktop" theme="outlined" />
                        番评
                    </Menu.Item>
                    <Menu.Item key="move">
                        <Icon type="video-camera" theme="outlined" />
                        影评
                    </Menu.Item>
                    <Menu.Item key="friends">
                        <Icon type="link" theme="outlined" />
                        友链
                    </Menu.Item>
                    <Menu.Item key="visitor">
                        <Icon type="message" theme="outlined" />
                        到此一游
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
export default connect(state => state, () => {return{}})(MenuItem);