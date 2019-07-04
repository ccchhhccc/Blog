import React from 'react'
import Menu from '../../components/menu/menu.jsx'
import { Row, Col } from 'antd';
import './content.css'
import Note from '../note.jsx'
import Friend from '../friends.jsx'
import Animate from '../animate.jsx'
import { connect } from "react-redux";
import Vistor from '../visitor'
import Move from '../move'

class content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chooseKey: 'note'
        }
        this.selectItem = this.selectItem.bind(this)
    }
    render() {
        return (
            <div id="content">
                <Row>
                    <Col span={5}>
                        <div className="box">
                            <Menu onChoose={this.selectItem} meumItem={this.state.chooseKey}/>
                        </div>
                    </Col>
                    <Col span={18} offset={1}>
                        <div className="box">
                            <Note show={this.state.chooseKey==='note'}/>
                            <Animate show={this.state.chooseKey==='animate'} />
                            <Friend show={this.state.chooseKey==='friends'} />
                            <Vistor history={this.props.history} show={this.state.chooseKey==='visitor'} />
                            <Move show={this.state.chooseKey==='move'} />
                        </div>
                    </Col>
                </Row>
                
            </div>
        )
    }
    selectItem(val) {
        this.setState({
            chooseKey: val
        })
        sessionStorage.setItem('key',val)
    }
    componentDidMount(){
        let key = sessionStorage.getItem('key')
        if(key){
            this.selectItem(key)
        }else{
            this.selectItem('note')
        }
        
    }
}
//export default content
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(content);