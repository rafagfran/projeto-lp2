import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/medicos/Medicos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';
import TableCommon from '../../components/common/TableCommon.jsx';

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';
import PacientesCrud from '../../CRUD/PacientesCrud.jsx';

const Pacientes = () => {
  const navigate = useNavigate()

  const [dados, setDados] = useState([])
  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCpf, setfiltroCpf] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)


  const optionsFilter = [
    {value: 10, text: 10},
    {value: 20, text: 20},
    {value: 50, text: 50},
  ]


  const headerTableNames = [
    {id: 'column_nome', name: 'Nome'},
    {id: 'column_cpf', name: 'CPF'},
    {id: 'column_sexo', name: 'Sexo'},
    {id: 'column_telefone', name: 'Telefone'},
    {id: 'column_acoes', name: 'Ações'},
  ]

  const handleClickEdit = (id) => {
    navigate(`editar/${id}`)
    console.log(id)
  }

  const handleClickDelete = async (id) => {
    if (confirm("Você deseja realmente excluir este item?")) {
      const pacientesCrud = new PacientesCrud()
      try {
        const response = await pacientesCrud.delete(id)
        alert(response.data)
      } catch (error) {
        console.error("Error deleting:", error);
      }
    } else {
      // Código para cancelar a exclusão
    }
       
  }

  const dataTableValues = dados.filter((item) => {
      const filterByName = filtroNome.toLowerCase() === ''? item : item.nome.toLowerCase().includes(filtroNome)
      const filterByCpf = filtroCpf.toLowerCase() === '' ? item : item.cpf.toLowerCase().includes(filtroCpf)
      return filterByName  && filterByCpf
    }).map((paciente) => {
    return {
      column_nome: paciente.nome,
      column_cpf: paciente.cpf,
      column_sexo: paciente.pessoa.sexo,
      column_telefone: paciente.pessoa.telefone,
      column_acoes: (
        <div id={styles.td_acoes}>
          <button onClick={() => handleClickEdit(paciente.id)}><img src={EditIcon} alt="" /></button>
          <button onClick={() => handleClickDelete(paciente.id)}><img src={DeleteIcon} alt="" /></button>
      </div>
      )
    } 
   })

   const handlePageLeft = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1); 
  };

  const handlePageRight = () => {
    if (pageNumber === totalPages - 1 ) return;
    setPageNumber(pageNumber + 1);
  };

  const handleFirstPage = () => {
    setPageNumber(0);
  }

  const handleLastPage = () => {
    setPageNumber(totalPages-1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientesCrud = new PacientesCrud()
        const response = await pacientesCrud.list(pageNumber, pageSize)
        setDados(response)

        const allData = await pacientesCrud.getAll()
        const total = Math.ceil(allData.length / pageSize)
        setTotalPages(total)
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    }
    fetchData();
  }, [pageNumber, pageSize])

  return (
    <section className={styles.medicos}>
        <header className={styles.header}>
          <h2>Registro de médicos</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.add}>
            <ButtonCommon text="+ Add" paddingButton="5px 15px" handleClick={() => navigate("cadastro")}/>
          </div>
          <div className={styles.filters}>
            <div className={styles.filter_nome} >
              <InputCommon  type="text" id='filter_nome' textLabel="Buscar nome" onchangeInputSet={setFiltroNome} placeholder="Buscar"/>
            </div>
            <div className={styles.filter_crm}>
              <InputCommon  className={styles.filter_cpf} type="text" id='filter_crm' textLabel="Buscar CPF" onchangeInputSet={setfiltroCpf} placeholder="Buscar"/>
            </div>
            <div className={styles.pagination}>
              <SelectCommon id="" defaultValue="10" textLabel="Itens por página" onchangeSet={setPageSize} options={optionsFilter} />
            </div>
          </div>
          <div className={styles.table}>
            <TableCommon columns={headerTableNames} data={dataTableValues}onPageLeft={handlePageLeft}
            onPageRight={handlePageRight} totalPages={totalPages} pageNumber={pageNumber} onFirstPage={handleFirstPage} onLastPage={handleLastPage} pageSize={pageSize}/>
          </div>
        </div>
    </section>
  );
};

export default Pacientes;
