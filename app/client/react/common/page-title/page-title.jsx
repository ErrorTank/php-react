import React from "react";

export class PageTitle extends React.Component {
  constructor(props) {
    super(props);

    let title = props.title;
    if (document.title != title) {
      document.title = title;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title != this.props.title) {
      document.title = nextProps.title;
    }
  }

  render() {
    return this.props.children;
  }
}
