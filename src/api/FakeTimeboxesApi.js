import uuid from 'uuid';

const timeboxes = [
  { id: 'a', title: 'Uczę się o console', totalTimeInMinutes: 25 },
  { id: 'b', title: 'Uczę się debugować', totalTimeInMinutes: 15 },
  { id: 'c', title: 'Uczę się TDD', totalTimeInMinutes: 5 },
];

function wait(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function findIndexByAnId(id) {
  const result = timeboxes.findIndex((timebox) => timebox.id === id);
  if (result < 0) {
    throw new Error('Timebox with specified id doesn`t exist');
  }
  return result;
}

const FakeTimeboxesAPI = {
  getAllTimeboxes: async function () {
    await wait(1000);
    console.log('Get all', timeboxes);
    return [...timeboxes];
  },
  addTimebox: async function (timeboxToAdd) {
    await wait(1000);
    const addedTimebox = { ...timeboxToAdd, id: uuid.v4() };
    timeboxes.push(addedTimebox);
    console.log('POST', timeboxes);
    return addedTimebox;
  },
  replaceTimebox: async function (timeboxToReplace) {
    if (!timeboxToReplace.id) {
      throw new Error('Cannot replace timebox without ad id');
    }
    const index = findIndexByAnId(timeboxToReplace.id);
    const replacedTimebox = { ...timeboxToReplace };
    timeboxes[index] = replacedTimebox;
    console.log('PUT', timeboxes);
    return replacedTimebox;
  },
  removeTimebox: async function (timeboxToRemove) {
    await wait(1000);
    if (!timeboxToRemove.id) {
      throw new Error('Cannot remove timebox without an id');
    }
    const index = findIndexByAnId(timeboxToRemove.id);
    timeboxes.splice(index, 1);
    console.log('DELETE', timeboxes);
  },
};

export default FakeTimeboxesAPI;
