import React from 'react'
import { Form, Icon, Input, Button,message } from 'antd';
import axios from 'axios'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.form.getFieldValue('name')===undefined || this.props.form.getFieldValue('name').trim()===''){
            message.error('请输入你的大名');
            return
        }
        if(this.props.form.getFieldValue('link')===undefined || this.props.form.getFieldValue('link').trim()===''){
            message.error('请输入你的链接');
            return
        }
        if(this.props.form.getFieldValue('brief')===undefined || this.props.form.getFieldValue('brief').trim()===''){
            message.error('夸夸你自己啦');
            return
        }
        if(this.props.form.getFieldValue('headurl')===undefined || this.props.form.getFieldValue('headurl').trim()===''){
            message.error('请输入你的头像图片链接');
            return
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/friends/add',values).then(rel=>{
                    if(rel.data==='success'){
                        message.success('we are friends now!');
                    }else{
                        message.error('好像哪里出错了  <゜)))彡');
                    }
                })
                this.closeModal()
            }
        });
    }
    closeModal(){
        this.props.form.resetFields()
        this.props.closeFormModal()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem key="name">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入你的大名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入你的大名" />
                    )}
                </FormItem>
                <FormItem key="link">
                    {getFieldDecorator('link', {
                        rules: [{ required: true, message: '请输入你的博客链接' }],
                    })(
                        <Input prefix={<Icon type="rocket" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入你的博客链接" />
                    )}
                </FormItem>
                <FormItem key="brief">
                    {getFieldDecorator('brief', {
                        rules: [{ required: true, message: '一句话夸自己' }],
                    })(
                        <Input prefix={<Icon type="rocket" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="一句话夸自己" />
                    )}
                </FormItem>
                <FormItem key="headurl">
                    {getFieldDecorator('headurl', {
                        rules: [{ required: true, message: '请输入你的头像图片链接' }],
                    })(
                        <Input prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入你的头像图片链接" />
                    )}
                </FormItem>
                <FormItem style={{ 'textAlign': 'center' }}>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Be Friends</Button>
                </FormItem>
            </Form>
        );
    }
}

export default NormalLoginForm