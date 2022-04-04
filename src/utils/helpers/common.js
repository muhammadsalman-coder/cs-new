const getEllips = str => {
  return `${str.slice(0,6)}...${str.slice(-12)}`;
};

export {
  getEllips
};
