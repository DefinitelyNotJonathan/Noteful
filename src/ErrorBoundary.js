import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props)
        this.state={
            hasError: false
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
          return (
            <h2>{this.props.errorMessage}</h2>
          );
        }
        return this.props.children;
      }  
}

ErrorBoundary.propTypes= {
  errorMessage: PropTypes.string.isRequired
};

export default ErrorBoundary;