import React from 'react'
import { Icon, Tooltip ,Button,Modal ,Form } from 'antd';
import { connect } from "react-redux";
import './content/content.css'
import NormalLoginForm from '../components/layout/addLink.jsx'

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            visible:false
        }
    }
    
    goToFriendIndex(url) {
        window.location.href = url
    }
    
    setModal = (visible)=>{
        this.setState({
            visible
        })
    }

    render() {
        const {friends} = this.props
        return (
            <div>
                <div className="add">
                    <Button type="primary" onClick={e=>this.setModal(true)} className="add-button" ghost>新增友联</Button>
                </div>
                <Modal
                    title="Let's be friends"
                    centered
                    visible={this.state.visible}
                    footer={null}
                    onCancel={() => this.setModal(false)}
                    >
                    <WrappedNormalLoginForm closeFormModal={this.closeFormModal}/>
                </Modal>
                {
                    friends.map((item, index) => {
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
export default connect(state => state, () => {return {}})(Note);