import React from 'react'
import Style from '../../styles/pages/medicos/Medicos.module.css'
const Medicos = () => {
  return (
    <div className={Style.medicos}>
      <div className={Style.container}>
        <div className={Style.top}>
          <span>Registro de médicos</span>
        </div>
        <div className={Style.body}>
          <div className={Style.add}>
            <button>+ Add</button>
          </div>
          <div className={Style.filter_container}>
            <div className={Style.first_line}>
              <div className={Style.filter}>
                <label htmlFor="especialidade">Especialidade</label>
                <select name="especialidade" id="especialidade" >
                  <option value="all">All</option>
                </select>
              </div>
              <div className={Style.filter}>
                <label htmlFor="status">Status</label>
                <select name="status" id="status">
                  <option value="all">All</option>
                </select>
              </div>
            </div>
             <div className={Style.second_line}>
             <div className={Style.items_perPage}>
                <label htmlFor="itemsPerPage">Items per page</label>
                <select name="itemsPerPage" id="itemsPerPage">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
              <div className={Style.buscar}>
                <input type="text" placeholder="Buscar" />
              </div>
            </div>
            <div className={Style.table}>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Especialidade</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dr. João</td>
                    <td>Cardiologista</td>
                    <td>Ativo</td>
                    <td>
                      <button>Editar</button>
                      <button>Excluir</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>

          
          
          
        </div>
      </div>
      
    </div>
  )
}

export default Medicos