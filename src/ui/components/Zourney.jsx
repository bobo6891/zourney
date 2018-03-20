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
    this.state = {
      data: null,
      screen: 'destkop'
    };
  }

  componentDidMount() {
    this.props.actions.loadData();
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
    if (!this.props.data.data) {
      return null;
    }

    return (
      <div>
        {this.props.data.data.map(item => (
          <TextQuestion key={item.question} {...item} />
        ))}
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
