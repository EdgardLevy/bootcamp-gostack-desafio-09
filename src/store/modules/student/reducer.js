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
  requestStatus: null,
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
        draft.requestStatus = INITIAL_STATE.requestStatus;

        break;
      }

      case '@student/SAVE': {
        draft.loading = true;
        break;
      }

      case '@user/SAVE_STUDENT_SUCCESS': {
        draft.loading = false;
        draft.requestStatus = 'success';
        break;
      }

      case '@user/SAVE_STUDENT_FAILURE': {
        draft.loading = false;
        draft.requestStatus = 'failure';
        break;
      }

      default:
        return state;
    }
  });
}
