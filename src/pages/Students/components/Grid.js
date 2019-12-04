import React from 'react';

export default function Grid(props) {
  const {data} = props;
  console.tron.log(props);
  return (
    <table>
      <thead>
        <tr>
          <th width="390">NOME</th>
          <th width="390">E-MAIL</th>
          <th width="150" className="center">
            IDADE
          </th>
          <th width="80" />
          <th width="80" />
        </tr>
      </thead>
      <tbody>
        {data.map(student => {
          return (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td className="center">20</td>
              <td className="center edit">editar</td>
              <td className="center delete">apagar</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
