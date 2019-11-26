export default function affix() {
  const primary = document.querySelector('.primary-holder');
  const left = document.getElementById('affixed-left-container');
  const right = document.getElementById('affixed-right-container');
  const footer = document.querySelector('body > .footerContainer');

  // update the position of the affixed content
  function update() {
    const spacing = 24;
    const viewportHeight = window.innerHeight;
    const top = Math.max(0, primary.getBoundingClientRect().top) + spacing;
    const bottom =
      Math.max(0, viewportHeight - footer.getBoundingClientRect().top) +
      spacing;

    if (left !== null && !left.hasAttribute('disable-affix')) {
      left.style.width = `${getParentColumnWidth(left) - spacing * 2}px`;
      left.style.top = `${top}px`;
      left.style.bottom = `${bottom}px`;
    }
    if (right !== null) {
      right.style.width = `${getParentColumnWidth(right) - spacing * 2}px`;
      right.style.top = `${top}px`;
      right.style.bottom = `${bottom}px`;
    }
  }

  // debounces updates, puts update processing on an animation frame
  let animationFrame = 0;
  function scheduleUpdate() {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(update);
  }

  // listen for scroll or resize
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
}
