const htmlToDom = html => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.firstChild;
};

const getCategories = data => (
  data.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, [])
);

const shuffleArray = arr => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = arr[randomIndex];

    arr[randomIndex] = arr[i];
    arr[i] = itemAtIndex;
  }
  return arr;
};

const groupQuestionsByCategory = arr => (
  arr.reduce((acc, question) => {
    const category = question.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {})
);

export { htmlToDom, getCategories, shuffleArray, groupQuestionsByCategory };
