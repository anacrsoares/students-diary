import "./app.css";
import { useState, useEffect } from "react";
import { RiFileEditLine, RiH4 } from "react-icons/ri";
import { CiTrash } from "react-icons/ci";

export default function App() {
  const [student, setStudent] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    curso: "",
    bimestre: "",
  });

  const [selectedIndex, setSelectedIndex] = useState(null);

  function entryData(event) {
    event.preventDefault();

    setStudent([...student, formData]);
    console.log(formData);

    setFormData({
      nome: "",
      matricula: "",
      curso: "",
      bimestre: "",
    });
  }

  function eraseStudent(indexErase) {
    const arrayFiltered = student.filter(
      (thisStudent, index) => index !== indexErase
    );

    setStudent(arrayFiltered);
  }

  function fillForm(student_, index) {
    // alert(JSON.stringify(student_));
    setSelectedIndex(index);

    setFormData({
      nome: student_.nome,
      matricula: student_.matricula,
      curso: student_.curso,
      bimestre: student_.bimestre,
    });
  }

  function editStudent(event) {
    event.preventDefault();
    const copyStudent = [...student];
    copyStudent[selectedIndex] = formData;
    setStudent(copyStudent);
    setFormData({
      nome: "",
      matricula: "",
      curso: "",
      bimestre: "",
    });
    setSelectedIndex(null);
  }

  return (
    <div>
      <div className="container">
        <h1>Diário Eletrônico</h1>

        <form
          onSubmit={(event) =>
            selectedIndex === null ? entryData(event) : editStudent(event)
          }
        >
          <input
            type="text"
            placeholder="Nome"
            value={formData.nome}
            onChange={(event) =>
              setFormData({ ...formData, nome: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={(event) =>
              setFormData({ ...formData, matricula: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Curso"
            value={formData.curso}
            onChange={(event) =>
              setFormData({ ...formData, curso: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bimestre"
            value={formData.bimestre}
            onChange={(event) =>
              setFormData({ ...formData, bimestre: event.target.value })
            }
          />
          <button type="submit">Salvar</button>
        </form>
      </div>

      {/* <div className="container-table">
        <table className="table">
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
        </table>
      </div> */}
      <h3>Alunos Cadastrados</h3>
      {student.length > 0 ? (
        <div className="container-table">
          <table className="table">
            <thead>
              <tr>
                <th>Ordem</th>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Curso</th>
                <th>Bimestre</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {student.map((student_, index) => (
                <tr key={index}>
                  <td className="center">{index + 1}</td>
                  <td className="center">{student_.nome}</td>
                  <td className="center">{student_.matricula}</td>
                  <td className="center">{student_.curso}</td>
                  <td className="center">{student_.bimestre}</td>
                  <td className="center icons">
                    <RiFileEditLine
                      className="icon"
                      color="#0FBA3F"
                      size="2em"
                      onClick={() => fillForm(student_, index)}
                    />
                    <CiTrash
                      color="#F90000"
                      className="icon"
                      size="2em"
                      onClick={() => eraseStudent(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4>Nenhum aluno cadastrado</h4>
      )}

      {/* <div>{JSON.stringify(student)}</div> */}
    </div>
  );
}
