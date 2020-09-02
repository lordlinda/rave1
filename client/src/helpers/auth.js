import React,{Component} from 'react'
import {connect} from 'react-redux'
export default (OriginalComponent)=>{
	//this function is only present when executing the above function
	//rendering the original component
	class MixedComponent extends Component{
		//this checks if the user is authenticated
		checkAuth(){
			if(!this.props.isAuth && !localStorage.token){
				this.props.history.push('/signin')
			}
		}
		componentDidMount(){
          this.checkAuth()
		}
		componentDidUpdate(){
          this.checkAuth()

		}
		render(){
			return <OriginalComponent {...this.props}/>
		}
	}
	function mapStateToProps(state){
		return{
			isAuth:state.auth.isAuth,
		}

	}
   return connect(mapStateToProps)(MixedComponent)
}