import React from 'react'

const Popcorn = () => {
  const container = document.getElementsByClassName('pop-container')[0];
  function createPopcorn() {
    if (container) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    const rect = container.getBoundingClientRect();
    console.log(rect.top, rect.left);
    const x = (Math.random() * 50) + rect.left + 15;
    const y = (Math.random() * 50) + rect.top - 5;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.animationDuration = `2 * ${Math.random()}s`;
      container.appendChild(dot);
      setTimeout(() => dot.remove(), 2000);
    } else {
      console.log('no container :(');
    }  
  }
  setInterval(createPopcorn, 500);

  return (
    <div></div>
  )
}

export default Popcorn