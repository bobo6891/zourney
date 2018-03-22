const htmlToDom = (html) => {
  var d = document.createElement('div');
  d.innerHTML = html;
  return d.firstChild;
};

export { htmlToDom };
