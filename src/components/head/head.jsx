import React, { Component } from 'react'
import './head.css'
import { connect } from "react-redux";

class Head extends Component {
    constructor(props) {
        super(props)
        this.state = {
            musicIcon: '',
            timer: 0
        }
        this.initMusicIcon = this.initMusicIcon.bind(this)
    }

    render() {
        return (
            //头部
            <div id="head" ref="head">
                <div className="author">
                    <h1 className="hinge">chenhaichao</h1>
                    <p>欢迎来到陈海超的个人网站</p>
                </div>
                <div className="myIcon" dangerouslySetInnerHTML={{ __html: this.state.musicIcon }} />
                {/* {renderRoutes(this.props.route.routes, { someProp: 'these extra props are optional' })} */}
            </div>
        )
    }
    componentDidMount() {
        this.initMusicIcon()
    }
    //初始化音乐符号
    initMusicIcon() {
        let clientWidth = document.body.clientWidth
        let headHeight = this.refs.head.offsetHeight
        let html = ''
        for (let i = 0; i < 12; i++) {
            let randomTop = parseInt(Math.random() * headHeight, 10)
            let randomLeft = parseInt(Math.random() * clientWidth, 10)
            let fontSize = 24 + parseInt(Math.random() * (40 - 24), 10)
            html += `<span style="font-size:${fontSize}px;position:absolute;top:${randomTop}px;left:${randomLeft}px">♪</span>`
        }
        this.setState({
            'musicIcon': html
        })
    }
}

export default connect(state => state, (dispatch, props) => {
    return {
        changeBool(val) {
            dispatch({
                type: 'changeBool',
                test: val?val:'瓜皮，乱点啥'
            })
        }
    }
})(Head);