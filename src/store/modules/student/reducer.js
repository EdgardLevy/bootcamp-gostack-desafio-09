import produce from 'immer';

const INITIAL_STATE = {
  fields: {
    id: 0,
    name: '',
    age: null,
    email: '',
    weight: null,
    height: null,
  },
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/STORE_FIELDS': {
        draft.fields = {...action.payload};

        break;
      }

      case '@student/NEW_STUDENT': {
        draft.fields = {...INITIAL_STATE.fields};

        break;
      }

      case '@student/REQUEST': {
        draft.loading = true;
        break;
      }

      case '@student/REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }

      case '@student/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
        return state;
    }
  });
}
