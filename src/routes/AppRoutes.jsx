import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaBase from '../pages/base/PaginaBase'
import Home from '../pages/home/Home'
import Medicos from '../pages/medicos/Medicos'
import CadastroMedico from '../pages/medicos/CadastroMedico'
import EditarMedico from '../pages/medicos/EditarMedico'
import Pacientes from '../pages/pacientes/Pacientes'
import Agendamentos from '../pages/agendamentos/Agendamentos'
import Internacoes from '../pages/internacoes/Internacoes'
import CadastroPaciente from '../pages/pacientes/CadastroPaciente'
import EditarPaciente from '../pages/pacientes/EditarPaciente'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaBase />}>
                <Route path="home" element={<Home/>}/>
                <Route path="home/medicos" element={<Medicos/>} />
                <Route path="home/medicos/cadastro" element={<CadastroMedico/>} />
                <Route path="home/medicos/editar/:id" element={<EditarMedico/>} />
                <Route path="home/pacientes" element={<Pacientes/>} />
                <Route path="home/pacientes/cadastro" element={<CadastroPaciente/>} />
                <Route path="home/pacientes/editar/:id" element={<EditarPaciente/>} />
                <Route path="home/agendamentos" element={<Agendamentos/>} />
                <Route path="home/internacoes" element={<Internacoes/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes