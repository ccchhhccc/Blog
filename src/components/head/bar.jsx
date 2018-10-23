import React from 'react'
import './bar.css'
import { Menu ,Icon } from 'antd';
import myhead  from '../../assets/img/myhead.jpeg'
class bar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'mail',
            myhead:myhead
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div id="bar">
                <div className="bar-top">
                    {/* <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{float:'left'}}
                    >
                        <Menu.Item key="mail">Study</Menu.Item>
                        <Menu.Item key="app">Taste</Menu.Item>
                    </Menu> */}
                    <div className="userinfo">
                        <div>
                            <p className="gitname"><a href="https://github.com/ccchhhccc">github-ccchhhccc</a></p>
                            <p className="location"><Icon type="environment" /><span>guangzhou</span></p>
                        </div>
                        <img src={this.state.myhead} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export default bar