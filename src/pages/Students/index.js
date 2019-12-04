import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container} from './styles';
import Grid from './components/Grid';
import Header from './components/Header';
import Form from './components/Form';
import api from '~/services/api';
import {newStudent} from '~/store/modules/student/actions';

export default function Students(props) {
  const dispatch = useDispatch();

  // console.tron.log(props);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [action, setAction] = useState('list');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {params: {q: searchText}});
      const {data} = response;
      setStudents(data);
    }
    loadStudents();
  }, [searchText]);

  function handleBtnNewStudentClick() {
    setAction('new');
    dispatch(newStudent());
  }

  function handleBtnBackClick() {
    setAction('list');
  }

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  return (
    <Container>
      <Header
        action={action}
        onBtnNewStudentClick={handleBtnNewStudentClick}
        onBtnBackClick={handleBtnBackClick}
        onSearchChange={handleSearchChange}
      />
      {action === 'list' ? (
        <Grid
          data={students}
          onBtnNewStudentClick={handleBtnNewStudentClick}
          onBtnBackClick={handleBtnBackClick}
          onSearchChange={handleSearchChange}
        />
      ) : (
        <Form action={action} />
      )}
    </Container>
  );
}
