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
import CadastroInternacao from '../pages/internacoes/CadastroInternacao'
import EditarInternacao from '../pages/internacoes/EditarInternacao'  
import CadastroAgendamento from '../pages/agendamentos/CadastrarAgendamento'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaBase />}>
                <Route index element={<Home/>}/>
                <Route path="home/medicos" element={<Medicos/>} />
                <Route path="home/medicos/cadastro" element={<CadastroMedico/>} />
                <Route path="home/medicos/editar/:id" element={<EditarMedico/>} />
                <Route path="home/pacientes" element={<Pacientes/>} />
                <Route path="home/pacientes/cadastro" element={<CadastroPaciente/>} />
                <Route path="home/pacientes/editar/:id" element={<EditarPaciente/>} />
                <Route path="home/agendamentos" element={<Agendamentos/>} />
                <Route path="home/agendamentos/cadastro" element={<CadastroAgendamento/>} />
                <Route path="home/agendamentos/editar/:id" element={<EditarInternacao/>} />
                <Route path="home/internacoes" element={<Internacoes/>} />
                <Route path="home/internacoes/cadastro" element={<CadastroInternacao/>} />
                <Route path="home/internacoes/editar/:id" element={<EditarInternacao/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes