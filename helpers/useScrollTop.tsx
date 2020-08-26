import { useState } from 'react';

export default (win) => {
  const [showScroll, setShowScroll] = useState(false);

  return {
    showScroll,
    checkScrollTop: () => {
      if (!showScroll && win.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && win.pageYOffset <= 400) {
        setShowScroll(false);
      }
    },
  };
};
