import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUndefined, isEmpty } from 'lodash';
import { UserDetailRequestAction, UserDetailExtraInfoRequestAction } from './actions';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: props.userLogin,
      userData: {},
      userRepositoriesData: {}
    };
    this.userLoginChanged = this.userLoginChanged.bind(this);
    this.userDataChanged = this.userDataChanged.bind(this);
    this.userRepositoriesDataChanged = this.userRepositoriesDataChanged.bind(this);
  }

  componentDidUpdate() {
    this.userLoginChanged();
    this.userDataChanged();
    this.userRepositoriesDataChanged();
  }

  userLoginChanged() {
    const { userLogin } = this.props;
    const { userLogin: prevUserLogin } = this.state;
    if (userLogin !== prevUserLogin) {
      this.setState({ userLogin }, () => this.props.UserDetailRequestAction(userLogin));
    }
  }

  userDataChanged() {
    const { data: currentUserData } = this.props;
    const { userData: prevUserData } = this.state;
    const userData = currentUserData || {};
    if (userData.login !== prevUserData.login) {
      this.setState({ userData }, () =>
        this.props.UserDetailExtraInfoRequestAction({
          userLogin: userData.login,
          url: userData.repos_url
        })
      );
    }
  }

  userRepositoriesDataChanged() {
    const { dataExtraInfo: currentUserRepositoriesData } = this.props;
    const { userRepositoriesData: prevUserRepositoriesData } = this.state;
    const userRepositoriesData = currentUserRepositoriesData || {};
    if (userRepositoriesData.url !== prevUserRepositoriesData.url) {
      this.setState({ userRepositoriesData });
    }
  }

  render() {
    const {
      userLogin,
      userData: { name, bio, blog, company, avatar_url: avatarUrl, html_url: profileUrl },
      userRepositoriesData: { data: listRepositories }
    } = this.state;
    console.log(!isUndefined(userLogin));
    console.log(userLogin);
    console.log(typeof userLogin);
    return (
      !isEmpty(userLogin) && (
        <div className="row user-detail">
          <div className="col s3">
            <div className="card grey lighten-2">
              <div className="card-content">
                <div className="row">
                  {!isEmpty(avatarUrl) && <img src={avatarUrl} alt="Avatar" className="col s12" />}
                  <ul className="collection col s12">
                    <li className="collection-item">
                      <a target="_blank" rel="noopener noreferrer" href={profileUrl}>
                        {userLogin}
                      </a>
                    </li>
                    {!isEmpty(name) && (
                      <li className="collection-item">
                        <label htmlFor="first_name">Nome</label>
                        <br />
                        {name}
                      </li>
                    )}
                    {!isEmpty(bio) && (
                      <li className="collection-item">
                        <label htmlFor="first_name">Biografia</label>
                        <br />
                        {bio}
                      </li>
                    )}
                    {!isEmpty(blog) && (
                      <li className="collection-item">
                        <label htmlFor="first_name">Blog</label>
                        <br />
                        {blog}
                      </li>
                    )}
                    {!isEmpty(company) && (
                      <li className="collection-item">
                        <label htmlFor="first_name">Empresa</label>
                        <br />
                        {company}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col s9">
            {listRepositories && (
              <div>
                <label>Repositórios</label>
                <ul className="collection">
                  {listRepositories.map(repos => (
                    <li className="collection-item">
                      <a target="_blank" rel="noopener noreferrer" href={repos.html_url}>
                        {repos.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )
    );
  }
}

export default connect(
  (state, ownProps) => ({
    data: state.userdetail.data[ownProps.userLogin],
    dataExtraInfo: state.userdetail.dataExtraInfo[ownProps.userLogin],
    loading: state.userdetail.status[ownProps.userLogin] ? state.userdetail.status[ownProps.userLogin].loading : false,
    failure: state.userdetail.status[ownProps.userLogin] ? state.userdetail.status[ownProps.userLogin].failure : false
  }),
  { UserDetailRequestAction, UserDetailExtraInfoRequestAction }
)(Detail);

Detail.propTypes = {
  userLogin: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.shape),
  dataExtraInfo: PropTypes.objectOf(PropTypes.shape),
  UserDetailRequestAction: PropTypes.func,
  UserDetailExtraInfoRequestAction: PropTypes.func
};
Detail.defaultProps = {
  userLogin: '',
  data: {},
  dataExtraInfo: {},
  UserDetailRequestAction: () => {},
  UserDetailExtraInfoRequestAction: () => {}
};
