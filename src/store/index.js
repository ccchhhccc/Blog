import { createStore } from 'redux'

const store = createStore((state={
	test:'chc',
	meumItem:'note'
},action)=>{
    switch(action.type){
    	case "changeBool":
			return Object.assign({}, state, {
				test: action.test
			})
		case "changeItem":
			return Object.assign({}, state, {
				meumItem: action.meumItem
			})
     	default:
     		return state
    }
});

export default store