import React from 'react'
import Menu from '../../components/menu/menu.jsx'
import { Row, Col } from 'antd';
import './content.css'
import Note from '../note.jsx'
import Friend from '../friends.jsx'
import Animate from '../animate.jsx'
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
                            <Menu onChoose={this.selectItem} />
                        </div>
                    </Col>
                    <Col span={18} offset={1}>
                        <Router>
                            <div className="box">
                                <Route path="/index/note" component={Note}></Route>
                                <Route path="/index/animate" component={Animate}></Route>
                                <Route path="/index/friends" component={Friend}></Route>
                                <Route path="/index/visitor" component={Vistor}></Route>
                                <Route path="/index/move" component={Move}></Route>
                            </div>
                        </Router>
                    </Col>
                </Row>
            </div>
        )
    }
    selectItem(val) {
        this.setState({
            chooseKey: val
        })
    }
}
//export default content
export default connect(state => state, (dispatch, props) => {
    return {
    }
})(content);