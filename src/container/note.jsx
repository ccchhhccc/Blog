import React from 'react'
import { Tag, Pagination ,Spin} from 'antd';
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
    }
    render() {
        return (
            <div>
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
                {
                    this.state.mess.length==0?<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:250}}>
                        <Spin/>
                    </div>:<Pagination className="myPage" current={this.state.page} onChange={this.pageChange}  defaultCurrent={1} total={this.state.count} />
                }
            </div>
        )
    }
    pageChange=(page)=> {
        const { url} = this.props
        document.scrollingElement.scrollTop = 0
        axios.post(url, { page }).then(rel => {
            this.setState({ mess: rel.data.data, count: rel.data.count, page: page })
            this.updatePagesSize(page)
        })
    }
    toShowMd=(txt)=> {
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
    getRandomColor=()=> {
        let num = parseInt(Math.random() * this.state.color.length)
        return this.state.color[num]
    }

    componentDidMount() {
        const {pages,index} = this.props
        this.pageChange(pages[index])
    }

    updatePagesSize = page=>{
        let {changePages, pages , index} = this.props
        pages[index] = page
        changePages&&changePages(pages)
    }
}
export default connect(state => state, (dispatch) => {
    return {
        changePages(pages) {
            dispatch({
                type: 'updatePagesSize',
                pages
            })
        }
    }
})(Note);