import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUndefined } from 'lodash';
import { UserDetailRequestAction } from './actions';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: props.userLogin,
      userData: {}
    };
    this.userLoginChanged = this.userLoginChanged.bind(this);
    this.userDataChanged = this.userDataChanged.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.userLoginChanged(prevProps);
    this.userDataChanged();
  }

  userLoginChanged() {
    const { userLogin } = this.props;
    const { userLogin: prevUserLogin } = this.state;
    if (userLogin !== prevUserLogin) {
      this.props.UserDetailRequestAction(userLogin);
      this.setState({ userLogin });
    }
  }

  userDataChanged() {
    const { data: currentUserData } = this.props;
    const { userData: prevUserData } = this.state;
    const userData = currentUserData || {};
    if (userData.login !== prevUserData.login) {
      this.setState({ userData });
    }
  }

  render() {
    const {
      userLogin,
      userData: { name, bio, blog, company, avatar_url: avatarUrl, url, repos_url: reposUrl }
    } = this.state;
    return (
      !isUndefined(userLogin) && (
        <div>
          {!isUndefined(avatarUrl) && <img src={avatarUrl} alt="Avatar" />}
          {userLogin}
          {name}
          {url}
          {bio}
          {blog}
          {company}
          {reposUrl}
        </div>
      )
    );
  }
}

export default connect(
  (state, ownProps) => ({
    data: state.userdetail.data[ownProps.userLogin],
    loading: state.userdetail.status[ownProps.userLogin] ? state.userdetail.status[ownProps.userLogin].loading : false,
    failure: state.userdetail.status[ownProps.userLogin] ? state.userdetail.status[ownProps.userLogin].failure : false
  }),
  { UserDetailRequestAction }
)(Detail);

Detail.propTypes = {
  userLogin: PropTypes.string,
  data: PropTypes.string,
  UserDetailRequestAction: PropTypes.func
};
Detail.defaultProps = {
  userLogin: '',
  data: '',
  UserDetailRequestAction: () => {}
};
