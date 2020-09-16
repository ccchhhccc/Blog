import React from 'react'
import Menu from '../../components/menu/menu.jsx'
import { Row, Col } from 'antd';
import './content.css'
import Note from '../note.jsx'
import Friend from '../friends.jsx'
import { connect } from "react-redux";
import axios from 'axios'

class content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chooseKey: 'note',
            friends: []
        }
    }

    componentDidMount() {
        this.getlink()
    }

    render() {
        const { friends, chooseKey } = this.state
        const {history} = this.props
        return (
            <div id="content">
                <Row>
                    <Col span={5}>
                        <div className="box">
                            <Menu onChoose={this.selectItem} meumItem={chooseKey} />
                        </div>
                    </Col>
                    <Col span={18} offset={1}>
                        <div className="box">
                            {
                                chooseKey == 'note' ? <Note index={0} url='/mymd/note/all' /> : null
                            }
                            {
                                chooseKey == 'animate' ? <Note index={1} url='/mymd/animate/all' /> : null
                            }
                            {
                                chooseKey == 'move' ? <Note index={2} url='/mymd/move/all' /> : null
                            }
                            {
                                chooseKey == 'visitor' ? <Note index={3} showWrite history={history} url='/mymd/visitor/all' /> : null
                            }

                            {
                                chooseKey == 'friends' ? <Friend friends={friends} /> : null
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    selectItem = (chooseKey) => {
        this.setState({
            chooseKey
        })
    }

    getlink = () => {
        axios.post('/friends/all').then(rel => {
            this.setState({
                friends: rel.data
            })
        })
    }

}
//export default content
export default connect(state => state, () => { return {} })(content);