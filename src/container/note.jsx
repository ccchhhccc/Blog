import React from 'react'
import { Tag, Pagination } from 'antd';
import { connect } from "react-redux";
import './content/content.css'
import axios from 'axios'
import { Base64 } from 'js-base64'
import 'highlight.js/styles/default.css'
import hljs from 'highlight.js'   // https://highlightjs.org/
import { Link } from 'react-router-dom';
const cheerio = require('cheerio')
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
class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mess: [],
            color: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
            page: 1,
            count: 0
        }
        this.getRandomColor = this.getRandomColor.bind(this)
        this.toShowMd = this.toShowMd.bind(this)
        this.pageChange = this.pageChange.bind(this)
    }
    render() {
        return (
            <div style={{ display: this.props.show ? 'block' : 'none' }}>
                <ul>{
                    this.state.mess.map((item, index) => {
                        return (
                            <Link to={'/showmarkdown/'+item.id} key={item + index}>
                                <li className="content-li" >
                                    <div className="box-title">
                                        <h1>{Base64.decode(item.title)}</h1>
                                        {
                                            JSON.parse(item.tags).map((val, i) => {
                                                return (
                                                    <Tag color={this.getRandomColor()} key={val + i}>{val}</Tag>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="message" dangerouslySetInnerHTML={{ __html: this.toShowMd(item.content) }}></div>
                                </li>
                            </Link>
                        )
                    })
                }
                </ul>
                <Pagination className="myPage" current={this.state.page} onChange={this.pageChange} simple defaultCurrent={1} total={this.state.count} />
            </div>
        )
    }
    pageChange(page) {
        axios.post('/mymd/note/all', { page }).then(rel => {
            this.setState({ mess: rel.data.data, count: rel.data.count, page: page })
        })
    }
    toShowMd(txt) {
        let oldHtml = md.render(Base64.decode(txt))
        const $ = cheerio.load(oldHtml)
        let randomLen = parseInt(2 + Math.random() * 3)
        let childrenLen = $('body').children().length
        let len = randomLen > childrenLen ? childrenLen : randomLen
        for (let i = childrenLen; i > len; i--) {
            $('body').children().eq(i).remove()
        }
        return $('body').html()
    }
    getRandomColor() {
        let num = parseInt(Math.random() * this.state.color.length)
        return this.state.color[num]
    }

    componentDidMount() {
        this.pageChange(1)
        console.log(this)
    }
}
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(Note);