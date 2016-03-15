import { connect } from 'react-redux'
import Login from '../../components/Login'
import { submitLogin } from '../../actions/login'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin(email, password) {
      dispatch(submitLogin(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
