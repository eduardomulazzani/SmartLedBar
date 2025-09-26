import React, { useState, useRef } from 'react';
import Wheel from '@uiw/react-color-wheel';
import { hsvaToRgba } from '@uiw/color-convert';

function App() {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [tempHsva, setTempHsva] = useState(hsva);
  const containerRef = useRef(null);

  // Atualiza enquanto arrasta
  const handleChange = (color) => {
    setTempHsva({ ...tempHsva, ...color.hsva });
  };

  // Envia quando solta
  const handleRelease = () => {
    setHsva(tempHsva);
    
    const { r, g, b } = hsvaToRgba(tempHsva);
    console.log(`Enviando RGB: ${r}, ${g}, ${b}`);
    
    fetch(`/led`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        color: "rgb",
        position: 2,
        rgb: {
          red: r,
          green: g,
          blue: b
        }
      })
    })
  };

  return (
    <div
      ref={containerRef}
      onMouseUp={handleRelease}s
      onTouchEnd={handleRelease}
    >
      <Wheel
        color={tempHsva}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
