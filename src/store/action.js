import { Test } from '../api/test'

const actions = {
    Test() {
        return new Promise((resolve, reject) => {
            Test().then(response => {
                console.log(response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default actions