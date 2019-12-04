import React from 'react';
import {MdAdd, MdKeyboardArrowLeft, MdSearch} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {PrimaryButton, SecondaryBytton} from '~/components/Button';
import {saveStudent} from '~/store/modules/student/actions';

export default function Header({
  action,
  onBtnNewStudentClick,
  onBtnBackClick,
  onSearchChange,
}) {
  const dispatch = useDispatch();
  const student = useSelector(state => state.student);

  function title() {
    switch (action) {
      case 'new':
        return 'Cadastro de Aluno';
      case 'edit':
        return 'Edição de Aluno';
      default:
        return 'Gerenciando Alunos';
    }
  }

  function handleBtnSave() {
    console.log('btnSave');
    console.log(student);

    dispatch(saveStudent(student.fields));
  }

  return (
    <header>
      <strong>{title(action)}</strong>
      <div>
        {action === 'list' ? (
          <div>
            <PrimaryButton type="button" onClick={onBtnNewStudentClick}>
              <MdAdd color="#fff" size={20} />
              <span>CADASTRAR</span>
            </PrimaryButton>
            <input
              type="text"
              id="search"
              placeholder="Buscar aluno"
              onChange={onSearchChange}
            />
          </div>
        ) : (
          <div>
            <SecondaryBytton type="button" onClick={onBtnBackClick}>
              <MdKeyboardArrowLeft color="#fff" size={20} />
              <span>VOLTAR</span>
            </SecondaryBytton>

            <PrimaryButton type="button" onClick={handleBtnSave}>
              <MdAdd color="#fff" size={20} />
              <span>SALVAR</span>
            </PrimaryButton>
          </div>
        )}
      </div>
    </header>
  );
}
