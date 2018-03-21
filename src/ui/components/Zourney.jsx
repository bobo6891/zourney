import React from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ReactResizeDetector from 'react-resize-detector';
// import DocumentTitle from 'react-document-title';
import { loadData } from '../redux/actions/data-actions';
import TextQuestion from './TextQuestion';

const DESTKOP_SMALL = 1020;
const TABLET = 768;

export class Zourney extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.state = {
      data: [],
      screen: 'destkop',
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

  render() {
    if (!this.state.data.length) {
      return null;
    }

    const [item] = this.state.data

    return (
      <div>
        <TextQuestion handleNextClick={this.handleNextClick} key={item.question} {...item} />
      </div>
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
