import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/medicos/Medicos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';

import MedicosCrud from '../../CRUD/MedicosCrud.jsx';
import TableCommon from '../../components/common/TableCommon.jsx';

const Medicos = () => {
  const navigate = useNavigate()

  const [dados, setDados] = useState([])
  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCrm, setFiltroCrm] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  

  const optionsFilterStatus = [
    {value: 'all', text: 'All'},
    {value: 'ativo', text: 'Ativo'},
    {value: 'inativo', text: 'Inativo'},
  ]

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  const handlePageNumberChange = (newPage) => {
    setPageNumber(newPage);
  }

  const handleClickDelete = async (id) => {
    if (confirm("Você deseja realmente excluir este item?")) {
      const medicosCrud = new MedicosCrud()
      try {
        await medicosCrud.delete(id)
        fetchData()
        alert("Item excluído com sucesso!")
        
      } catch (error) {
        console.error("Error deleting:", error);
      }
    } else {
      // Código para cancelar a exclusão
    } 
  }

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize])
    
  const fetchData = async () => {
    try {
      const medicosCrud = new MedicosCrud()
      const response = await medicosCrud.list(pageNumber, pageSize)
      setDados(response)
      
      const allData = await medicosCrud.getAll()
      const total = Math.ceil(allData.length / pageSize)
      console.log(dados.content)
      setTotalPages(total)
    } catch (error) {
      console.error('Erro ao recuperar os dados:', error);
    }
  }
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
              <InputCommon  className={styles.filter_crm} type="text" id='filter_crm' textLabel="Buscar CRM" onchangeInputSet={setFiltroCrm} placeholder="Buscar"/>
            </div>
            
            <div className={styles.filter_status}>
              <SelectCommon id="filter_status" defaultValue="all" textLabel="Status" onchangeSet={setFiltroStatus} options={optionsFilterStatus} />
            </div>
          </div>
          <TableCommon
            alterPageSize={handlePageSizeChange} 
            alterPageNumber={handlePageNumberChange}
            totalPages={totalPages}
            filterNome={ filtroNome}
            filterCrm={filtroCrm}
            filterStatus={filtroStatus}
            filterCpf={""}
            filterTipoConsulta={""}
            filterData={""}
            filterNomeMedico={""}
            filterNomePaciente={""}
      
            header={[
              {name: 'nome', text: 'Nome'},
              {name: 'crm', text: 'CRM'},
              {name: 'telefone', text: 'Telefone'},
              {name: 'email', text: 'Email'},
              {name: 'status', text: 'Status'},
              {name: 'acoes', text: 'Ações'},
            ]}

            dados={dados.map((medico, index) => {
              return {
                id: medico.id,
                nome: medico.nome,
                crm: medico.crm,
                telefone: medico.pessoa.telefone,
                email: medico.pessoa.email,
                status: medico.status === true ? 'Ativo' : 'Inativo',
                acoes:
                  <div id="td_acoes">
                    <button onClick={() => navigate(`/medicos/editar/${medico.id}`)}><img src={EditIcon} alt="" /></button>
                    <button onClick={() => handleClickDelete(medico.id)}><img src={DeleteIcon} alt="" /></button>
                  </div>
              }
            })}
          />
          </div>
    </section>
  );
};

export default Medicos;
