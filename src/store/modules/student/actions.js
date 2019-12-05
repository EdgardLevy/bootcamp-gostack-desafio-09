export function storeFields(data) {
  console.tron.log('storeFields');
  return {
    type: '@student/STORE_FIELDS',
    payload: data,
  };
}

export function newStudent() {
  console.tron.log('startNewStudent');
  return {
    type: '@student/NEW_STUDENT',
    payload: {},
  };
}

export function saveStudent(data) {
  console.tron.log('saveStudent');
  return {
    type: '@student/SAVE',
    payload: {...data, requestStatus: 'doing'},
  };
}

export function updateStudent(data) {
  console.tron.log('updateStudent');
  return {
    type: '@student/UPDATE',
    payload: {...data, requestStatus: 'doing'},
  };
}

export function saveStudentSuccess(data) {
  return {
    type: '@user/SAVE_STUDENT_SUCCESS',
    payload: {},
  };
}

export function saveStudentFailure() {
  return {
    type: '@user/SAVE_STUDENT_FAILURE',
    payload: {},
  };
}
