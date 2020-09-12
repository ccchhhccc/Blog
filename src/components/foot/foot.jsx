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
                    <p><a href="http://beian.miit.gov.cn" target='_blank'>桂ICP备 18001177号</a></p>
                    <p><a href="http://beian.miit.gov.cn" target='_blank'>京公安网备 45050202000439号</a></p>
                    
                </div>
            </div>
        )
    }
}
export default foot