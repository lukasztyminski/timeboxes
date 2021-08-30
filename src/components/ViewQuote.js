import React from 'react';

const ViewQuote = ({ text, author }) => {
  return (
    <figure>
      <blockquote>{text}</blockquote>
      <figcaption>
        <cite>{author}</cite>
      </figcaption>
    </figure>
  );
};

export default ViewQuote;
