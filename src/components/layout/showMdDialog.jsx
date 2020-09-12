import React from 'react'
import { Modal, Button } from 'antd';
import { connect } from "react-redux";

class ShowMdDialog extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Modal
                width="1072px"
                className="showMdDialog"
                title="预览"
                visible={this.props.mdDialog}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>确定</Button>
                ]}
            >
                <div className="show-md-dialog" dangerouslySetInnerHTML={{ __html: this.props.mdHtml }} />
            </Modal>
        );
    }
    handleCancel=()=>{
        this.props.hideMdDialog()
    }
}

export default connect(state => state, (dispatch, props) => {
    return {
    }
})(ShowMdDialog);