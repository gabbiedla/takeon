import React from 'react';
import { FaLink } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

class CopyURLButton extends React.Component {
  copyURL = () => {
    // Get the current URL
    const currentURL = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log('URL copied to clipboard:', currentURL);
        // Optionally, you can provide feedback to the user that the URL has been copied
        alert('URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Error copying URL to clipboard:', err);
        // Handle any errors that may occur during the copy process
        alert('Failed to copy URL to clipboard!');
      });
  };

  render() {
    return (
      <Button
        className="url-btn"
        onClick={this.copyURL}
        style={{
          background: 'white',
          // border: 'none',
          color: 'black',
          border: 'none',
          // color: '#00b8a9',
          // fontWeight: 'bold',
          fontSize: '1em',
        }}
      >
        <FaLink />
      </Button>
    );
  }
}

export default CopyURLButton;
