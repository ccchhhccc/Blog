import './markdown.css'
import { Row, Col } from 'antd';
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Input, Button, Tag, Tooltip, Icon, message } from 'antd';
import 'highlight.js/styles/default.css'
import hljs from 'highlight.js'   // https://highlightjs.org/
import axios from 'axios'
import { Base64 } from 'js-base64';
import ShowMdDialog from '../layout/showMdDialog'
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
const { TextArea } = Input;

class VistorMd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mdDialog: false,
            title: '',
            writeTxt: '',
            showMd: '',
            tags: [],
            inputVisible: false,
            inputValue: '',
            color: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
            markdownId:1
        }
        this.getRandomColor = this.getRandomColor.bind(this)
        this.change = this.change.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.showInput = this.showInput.bind(this)
        this.handleInputConfirm = this.handleInputConfirm.bind(this)
        this.saveInputRef = this.saveInputRef.bind(this)
        this.releaseMess = this.releaseMess.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.toShowMd = this.toShowMd.bind(this)
        this.toHideDialog = this.toHideDialog.bind(this)
        this.getMdDetail = this.getMdDetail.bind(this)
        this.initMd = this.initMd.bind(this)
    }
    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div className="md">
                <ShowMdDialog hideMdDialog={this.toHideDialog} style={{ width: '1200px' }} mdDialog={this.state.mdDialog} mdHtml={this.state.showMd} />
                <div className="md-box">
                    <p className="md-title">update</p>
                    <Button type="danger" className="toSee" onClick={this.toShowMd} ghost>预览</Button>
                    <Button type="danger" className="release" onClick={this.releaseMess} ghost>修改</Button>
                </div>
                <Input size="large" placeholder="请输入主题" value={this.state.title} onChange={this.titleChange} style={{ 'margin': '20px 0' }} />
                <div className="my-tag">
                    <span>相关标签</span>
                    <div className="tags">
                        {tags.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const myColor = this.getRandomColor()
                            const tagElem = (
                                <Tag key={tag} closable={true} color={myColor} afterClose={() => this.handleClose(tag)}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                            );
                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                        })}
                        {inputVisible && (
                            <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="small"
                                style={{ width: 78 }}
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag
                                onClick={this.showInput}
                                style={{ background: '#fff', borderStyle: 'dashed' }}
                            >
                                <Icon type="plus" /> New Tag
                            </Tag>
                        )}
                    </div>
                </div>
                <Row gutter={32}>
                    <Col className="gutter-row" span={12}>
                        <p className="p">write</p>
                        <TextArea ref="writeTxt" autosize={{ minRows: 20 }} value={this.state.writeTxt} onChange={this.change} />
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <p className="p">show</p>
                        <div className="myshow" dangerouslySetInnerHTML={{ __html: this.state.showMd }} />
                    </Col>
                </Row>
            </div>
        )
    }

    releaseMess() {
        if (this.state.writeTxt === '' || this.state.title === '') {
            message.error('请填写文章标题和内容  <゜)))彡');
            return
        }
        console.log({ content: Base64.encode(this.state.writeTxt), title: Base64.encode(this.state.title), tags: this.state.tags })
        axios.post('/mymd/update', { content: Base64.encode(this.state.writeTxt), title: Base64.encode(this.state.title), tags:JSON.stringify(this.state.tags) ,id:this.state.markdownId}).then(rel => {
            if (rel.data === 'success') {
                console.log(this.props)
                this.props.history.push(`/showmarkdown/${this.state.markdownId}`)
            } else {
                message.error('出错啦  <゜)))彡');
            }
        })

    }
    showDemo() {
        let result = md.render(this.state.writeTxt)
        this.setState({
            showMd: result
        })
    }

    initMd(txt) {
        let result = md.render(Base64.decode(txt))
        this.setState({
            showMd: result
        })
    }
    getMdDetail() {
        let markdownId = this.props.match.params.id ? this.props.match.params.id : '0'
        this.setState({
            markdownId:markdownId
        })
        axios.post('/getmd/' + markdownId).then(rel => {
            if (rel.data !== 'err') {
                let title = Base64.decode(rel.data.title)
                let writeTxt = Base64.decode(rel.data.content)
                let tags = JSON.parse(rel.data.tags)
                this.setState({
                    writeTxt: writeTxt,
                    title: title,
                    tags: tags
                })
                console.log(title)
                this.initMd(rel.data.content)
            }
        })
    }

    toHideDialog() {
        this.setState({ mdDialog: false })
    }

    toShowMd() {
        if (this.state.writeTxt === '' || this.state.writeTxt.trim() === '') {
            message.error('你还什么都没写  <゜)))彡');
            return
        }
        this.setState({ mdDialog: true })
    }

    getRandomColor() {
        let num = parseInt(Math.random() * this.state.color.length)
        return this.state.color[num]
    }
    change(event) {
        let result = md.render(event.target.value)
        this.setState({
            showMd: result,
            writeTxt: event.target.value
        })
    }
    titleChange(e) {
        this.setState({ title: e.target.value })
    }
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }
    saveInputRef = input => this.input = input

    componentDidMount() {
        this.getMdDetail()
    }
}
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(VistorMd);