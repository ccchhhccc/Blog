import React from 'react'
import './foot.css'

class foot extends React.Component{
    render(){
        return (
            <div id="foot">
                <div className="footer">
                    <p>
                        欢迎访问chenhaichao的个人网站
                    </p>
                    <p>桂ICP备 18001177号</p>
                    <p><a href="https://www.beian.gov.cn">京公安网备 45050202000439号</a></p>
                    
                </div>
            </div>
        )
    }
}
export default foot