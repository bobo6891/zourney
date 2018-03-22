import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ReactResizeDetector from 'react-resize-detector';
import { loadData } from '../redux/actions/data-actions';
import Welcome from './Welcome';
import Menu from './Menu';
import Quiz from './Quiz';

const DESTKOP_SMALL = 1020;
const TABLET = 768;

const App = styled.div`
  min-width: 320px;
  height: 100%;
  position: relative;
  font-family: Open Sans;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7 {
    font-family: Bitter;
  }
`;

export class Zourney extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    if (!props.history.location.pathname || props.history.location.pathname === '/') {
      props.history.replace('/welcome');
    }

    this.state = {
      data: [],
      screen: 'mobile',
      passedQuestions: []
    };
  }

  componentDidMount() {
    this.props.actions.loadData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data.data.items
    });
  }

  handleResize(width) {
    if (width < TABLET) {
      this.setState({ screen: 'tablet' });
      return;
    }
    if (width < DESTKOP_SMALL) {
      this.setState({ screen: 'desktop-small' });
      return;
    }
    this.setState({ screen: 'desktop' });
  }

  render() {
    if (!this.state.data.length) {
      return null;
    }

    const { pathname } = this.props.history.location;
    const { categories } = this.props.data.data;

    return (
      <App>
        {pathname === '/welcome' && (
          <Welcome history={this.props.history} />
        )}
        {pathname === '/menu' && (
          <Menu history={this.props.history} categories={categories} />
        )}
        {pathname.split('/')[1] === 'quiz' && (
          <Quiz history={this.props.history} categories={categories} allQuestions={this.state.data} />
        )}
      </App>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dataReducer
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, { loadData }), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Zourney);
