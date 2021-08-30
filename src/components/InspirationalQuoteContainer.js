import React, { useEffect, useState } from 'react';
import ViewQuote from './ViewQuote';

const InspirationalQuoteContainer = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    import('inspirational-quotes')
      .then((Quotes) => {
        setQuote(Quotes.getQuote());
      })
      .catch(() => console.log('Couldn`t load quotes'));
  }, [quote]);

  const render = () => {
    if (quote) {
      const { author, text } = quote;
      return <ViewQuote author={author} text={text} />;
    } else {
      return '...';
    }
  };

  return render();
};

export default InspirationalQuoteContainer;
