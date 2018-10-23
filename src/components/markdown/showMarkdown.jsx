import './markdown.css'
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Tag, Tooltip } from 'antd';
import 'highlight.js/styles/default.css'
import hljs from 'highlight.js'   // https://highlightjs.org/
import axios from 'axios'
import { formatTime } from '../../assets/js/common'
import { Base64 } from 'js-base64';
// Actual default values
const md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

class Showmd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetail: {
                title: '',
                time: '',
                content: ''
            },
            showMd: '',
            tags: [],
            color: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
        }
        this.getMdDetail = this.getMdDetail.bind(this)
        this.getRandomColor = this.getRandomColor.bind(this)

    }
    render() {
        return (
            <div className="md">
                <h1 className="show-md-title">{Base64.decode(this.state.showDetail.title)}</h1>
                <div className="show-tag">
                    {this.state.tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const myColor = this.getRandomColor()
                        const tagElem = (
                            <Tag key={tag} color={myColor} afterClose={() => this.handleClose(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        );
                        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                    })}
                    <span className="md-time">{formatTime(this.state.showDetail.time)}</span>
                    
                </div>

                <div className="detail-md" dangerouslySetInnerHTML={{ __html: this.state.showMd }} />
            </div>
        )
    }
    
    getRandomColor() {
        let num = parseInt(Math.random() * this.state.color.length)
        return this.state.color[num]
    }
    toShowMd(txt) {
        let result = md.render(Base64.decode(txt))
        this.setState({
            showMd: result
        })
    }
    getMdDetail() {
        let markdownId = this.props.match.params.id ? this.props.match.params.id : '0'
        axios.post('/getmd/' + markdownId).then(rel => {
            if (rel.data !== 'err') {
                this.setState({
                    showDetail: rel.data,
                    tags:JSON.parse(rel.data.tags)
                })
                this.toShowMd(rel.data.content)
            }
        })
    }
    componentDidMount() {
        this.getMdDetail()
    }
}
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(Showmd);