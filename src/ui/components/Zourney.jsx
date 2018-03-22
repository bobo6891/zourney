import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactResizeDetector from 'react-resize-detector';
import { loadData } from '../redux/actions/data-actions';
import Welcome from './Welcome';
import Menu from './Menu';
import Quiz from './Quiz';

const XS_DEVICE = 575.98;
const S_DEVICE = 767.98;
const M_DEVICE = 991.98;
const L_DEVICE = 1199.98;

const App = styled.div`
  min-width: 320px;
  height: 100%;
  overflow: hidden;
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
    font-size: 1em;
  }
`;

export class Zourney extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    if (!props.match.params.page) {
      props.history.replace('./welcome');
    }

    this.state = {
      data: [],
      screen: 'XS_DEVICE',
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
    if (width > L_DEVICE) {
      this.setState({ screen: 'L_DEVICE' });
      return;
    }
    if (width > M_DEVICE) {
      this.setState({ screen: 'M_DEVICE' });
      return;
    }
    if (width > S_DEVICE) {
      this.setState({ screen: 'S_DEVICE' });
      return;
    }
    if (width > XS_DEVICE) {
      this.setState({ screen: 'XS_DEVICE' });
    }
  }

  render() {
    if (!this.state.data.length) {
      return null;
    }

    const { page } = this.props.match.params;
    const { categories } = this.props.data.data

    return (
      <App>
        {page === 'welcome' && (
          <Welcome screen={this.state.screen} history={this.props.history} />
        )}
        {page === 'menu' && (
          <Menu screen={this.state.screen} history={this.props.history} categories={categories} />
        )}
        {page === 'quiz' && (
          <Quiz screen={this.state.screen} match={this.props.match} history={this.props.history} categories={categories} allQuestions={this.state.data} />
        )}
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
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
