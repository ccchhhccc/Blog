import { createStore } from 'redux'

const store = createStore((state={
	pages:[1,1,1,1]
},action)=>{
    switch(action.type){
    	case "updatePagesSize":
			return Object.assign({}, state, {
				pages: action.pages
			})
     	default:
     		return state
    }
});

export default store