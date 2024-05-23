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
import CadastroPaciente from '../pages/pacientes/Cadastro2Paciente'
import EditarPaciente from '../pages/pacientes/EditarPaciente'
import CadastroInternacao from '../pages/internacoes/CadastroInternacao'
import EditarInternacao from '../pages/internacoes/EditarInternacao'  
import CadastroAgendamento from '../pages/agendamentos/CadastrarAgendamento'
import EditarAgendamento from '../pages/agendamentos/EditarAgendamento'
import Register from '../pages/register/Register'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PaginaBase />}>
            <Route index element={<Home/>} />
            <Route path="/medicos" element={<Medicos/>} />
            <Route path="/medicos/cadastro" element={<CadastroMedico/>} />
            <Route path="/medicos/editar/:id" element={<EditarMedico/>} />
            <Route path="/pacientes" element={<Pacientes/>} />
            <Route path="/pacientes/cadastro" element={<CadastroPaciente/>} />
            <Route path="/pacientes/editar/:id" element={<EditarPaciente/>} />
            <Route path="/agendamentos" element={<Agendamentos/>} />
            <Route path="/agendamentos/cadastro" element={<CadastroAgendamento/>} />
            <Route path="/agendamentos/editar/:id" element={<EditarAgendamento/>} />
            <Route path="/internacoes" element={<Internacoes/>} />
            <Route path ="/internacoes/cadastro" element={<CadastroInternacao/>} />
            <Route path="/internacoes/editar/:id" element={<EditarInternacao/>} />
            <Route path="/configuracoes" element={<Register/>} />
        </Route>
    </Routes>
  )
}

export default AppRoutes