import React from 'react'
import { Icon, Tooltip ,Button,Modal ,Form } from 'antd';
import { connect } from "react-redux";
import './content/content.css'
import axios from 'axios'
import NormalLoginForm from '../components/layout/addLink.jsx'

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            addModal:false
        }
        //this.goToFriendIndex = this.goToFriendIndex.bind(this)
        this.showAddModal = this.showAddModal.bind(this)
        this.closeFormModal = this.closeFormModal.bind(this)
        this.getAllFriends = this.getAllFriends.bind(this)
    }
    componentDidMount() {
        this.getAllFriends()
        console.log(this.props)
    }
    getAllFriends(){
        axios.post('/friends/all').then(rel => {
            console.log(rel)
            this.setState({
                friends: rel.data
            })
        })
    }
    closeFormModal(){
        this.setState({addModal:false})
        this.getAllFriends()
    }
    goToFriendIndex(url) {
        window.location.href = url
    }
    showAddModal(){
        this.setState({addModal:true})
    }
    render() {
        //const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="add">
                    <Button type="primary" onClick={this.showAddModal} className="add-button" ghost>新增友联</Button>
                </div>
                <Modal
                    title="Let's be friends"
                    centered
                    visible={this.state.addModal}
                    footer={null}
                    onCancel={() => this.setState({addModal:false})}
                    >
                    <WrappedNormalLoginForm closeFormModal={this.closeFormModal}/>
                </Modal>
                {
                    this.state.friends.map((item, index) => {
                        return (
                            <div className="friends" key={index} onClick={()=>{this.goToFriendIndex(item.link)}}>
                                <p>
                                    <Icon type="user" theme="outlined" style={{ 'marginRight': '10px' }} />
                                    <span>{item.name}</span>
                                </p>
                                <div>
                                    <Icon type="rocket" theme="outlined" style={{ 'marginRight': '10px', 'float': 'left', 'marginTop': '4px' }} />
                                    <Tooltip placement="topLeft" title={item.brief === null ? '这家伙很懒，什么都没留下' : item.brief}>
                                        <p className="brief">{item.brief === null ? '这家伙很懒，什么都没留下' : item.brief}</p>
                                    </Tooltip>
                                </div>
                                <img src={item.headurl} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(Note);