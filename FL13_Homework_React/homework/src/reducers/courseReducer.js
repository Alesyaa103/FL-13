import { COURSE_DELETE, COURSE_CREATE, COURSE_EDIT} from '../actions/types';

const initialState = {
  data: [
    {
      id: 1,
      date: '2018-06-15',
      title: 'Exemple of title0',
      description: 'Exemple of description. Here will be list of themes.',
      duration: '01hr34min',
      authors: 'Some authors'
    },
    {
      id: 2,
      date: '2018-06-15',
      title: 'Exemple of title1',
      description: 'Exemple of description. Here will be list of themes.',
      duration: '01hr34min',
      authors: 'Some authors'
    },
    {
      id: 3,
      date: '2018-06-15',
      title: 'Exemple of title2',
      description: 'Exemple of description. Here will be list of themes.',
      duration: '01hr34min',
      authors: 'Some authors'
    },
    {
      id: 4,
      date: '2018-06-15',
      title: 'Exemple of title3',
      description: 'Exemple of description. Here will be list of themes.',
      duration: '01hr34min',
      authors: 'Some authors'
    },
    {
      id: 5,
      date: '2018-06-15',
      title: 'Exemple of title4',
      description: 'Exemple of description. Here will be list of themes.',
      duration: '01hr34min',
      authors: 'Some authors'
    },
    {
      id: 6,
      date: '2018-06-15',
      title: 'Exemple of title5',
      description: 'Exemple of description. Here will be list of themes.',
      duration: '01hr34min',
      authors: 'Some authors'
    },
    {
      id: 7,
      date: '2018-06-15',
      title: 'Exemple of title6',
      description: 'Exemple of description. Here will be list of themes.',
      duration: '01hr34min',
      authors: 'Some authors'
    }
  ]
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  const {data} = state;
  switch (type) {
    case COURSE_EDIT:
      const changedContent = data.map(item => payload.id === item.id ? payload : item);
      return {
        ...state,
        data: changedContent
      };
    case COURSE_DELETE:
      const modifiedState = data.filter(item => item.id !== payload);
      return {
        ...state,
        data: modifiedState
      };
    case COURSE_CREATE:
      const newState = [...data, payload];
      return {
        ...state,
        data: newState
      };
    default:
      return state
  }
}