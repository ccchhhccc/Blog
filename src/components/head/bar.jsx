import React from 'react'
import './bar.css'
import { Menu, Icon } from 'antd';
import myhead from '../../assets/img/myhead.jpeg'
import home from '../../assets/img/HOME.png'
class bar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'mail',
            myhead: myhead
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (e) => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div id="bar">
                <div className="bar-top">
                    <div className="userinfo">
                        <img onClick={this.handleClick} className="home" src={home} alt="" />
                        <div className="flex-box">
                            <div>
                                <p className="gitname"><a href="https://github.com/ccchhhccc">github-ccchhhccc</a></p>
                                <p className="location"><Icon type="environment" /><span>guangzhou</span></p>
                            </div>
                            <img src={this.state.myhead} alt="" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default bar