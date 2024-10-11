export const getPixelsScrolled = () => {
  const h = document.documentElement;
  const b = document.body;
  return h.scrollTop || b.scrollTop;
};

export const getPageHeight = () => {
  const h = document.documentElement;
  const b = document.body;
  return (h.scrollHeight || b.scrollHeight) - h.clientHeight;
};
