import { useEffect } from 'react';

/**
 * Global Scroll Reveal Hook
 * Observes all elements with .fly-in-left, .fly-in-right, .fly-in-up, .fly-in-scale
 * and adds .is-revealed when they enter the viewport as user scrolls.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const observeElements = () => {
      const targets = document.querySelectorAll(
        '.fly-in-left:not(.is-revealed), .fly-in-right:not(.is-revealed), .fly-in-up:not(.is-revealed), .fly-in-scale:not(.is-revealed)'
      );
      targets.forEach((el) => observer.observe(el));
    };

    // Initial run
    observeElements();

    // Re-observe periodically or on DOM mutations (for filtered products/tab switches)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default useScrollReveal;
