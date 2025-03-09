import React from 'react'

const Popcorn = () => {
  const container = document.querySelector('.pop-container');
  function createPopcorn() {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    const x = Math.random() * 180;
    const y = Math.random() * 180;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.animationDuration = `${0.5 + Math.random()}s`;
    if (container) {
      container.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
    } else {
      console.log('no container :(');
    }  
  }
  setInterval(createPopcorn, 200);

  return (
    <div></div>
  )
}

export default Popcorn