import React from 'react';

const Swatch = ({
  clicky,
  index,
  info,
  selected,
  isLast,
}) => {
  const inactiveBorder = isLast ? '#999999' : info.hex;

  const style = {
    backgroundColor: info.hex,
    borderColor: selected ? '#000000' : inactiveBorder,
    ...(isLast && !selected && { borderWidth: '1px'}),
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
