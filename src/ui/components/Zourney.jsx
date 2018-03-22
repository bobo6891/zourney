import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ReactResizeDetector from 'react-resize-detector';
import DocumentTitle from 'react-document-title';
import { loadData } from '../redux/actions/data-actions';
import TextQuestion from './TextQuestion';
import Welcome from './Welcome';

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
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePlayButton = this.handlePlayButton.bind(this);

    if (!props.history.location.pathName || props.history.location.pathName === '' || props.history.location.pathName === '/') {
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
      data: nextProps.data.data
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

  handleNextClick(e) {
    this.setState({
      data: this.state.data.slice(1)
    });
  }

  handlePlayButton(e) {
    this.props.history.push('/menu');
  }

  render() {
    if (!this.state.data.length) {
      return null;
    }

    const [item] = this.state.data;
    const { pathname } = this.props.history.location;

    return (
      <App>
        {pathname === '/welcome' && (
          <Welcome handlePlayButton={this.handlePlayButton} />
        )}
        {pathname === '/menu' && (
          <TextQuestion handleNextClick={this.handleNextClick} key={item.question} {...item} />
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
