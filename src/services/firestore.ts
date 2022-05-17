import {CATEGORY_ENDPOINT, SERVER_URL} from '../globals/constants';

const addCategory = async (category: Category) => {
  console.log('addCategory', category);
  return fetch(`${SERVER_URL}${CATEGORY_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
};

export {addCategory};
