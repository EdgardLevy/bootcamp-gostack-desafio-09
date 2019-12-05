import {takeLatest, call, put, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import api from '~/services/api';
import {
  saveStudentFailure,
  saveStudentSuccess,
} from '~/store/modules/student/actions';

export function* saveStudent({payload}) {
  console.tron.log('saveStudent');
  try {
    const {name, email, age, height, weight} = payload;
    yield call(api.post, 'students', {name, email, age, height, weight});
    toast.success('Cadastro realizado com sucesso!');
    yield put(saveStudentSuccess());
  } catch (error) {
    toast.error('Falha no cadastro, verifique os dados');
    yield put(saveStudentFailure());
  }
}

export default all([takeLatest('@student/SAVE', saveStudent)]);
