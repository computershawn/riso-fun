import React from 'react';

const Swatch = ({
  clicky,
  index,
  info,
  selected,
}) => {
  const style = {
    backgroundColor: info.hex,
    borderColor: selected ? '#000000' : info.hex,
  };

  return (
    <div
      className="swatch square"
      style={style}
      onClick={() => clicky(index)}
    />
  );
};

export default Swatch;
