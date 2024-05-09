import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaBase from '../pages/base/PaginaBase'
import Home from '../pages/home/Home'
import Medicos from '../pages/medicos/Medicos'
import CadastroMedico from '../pages/medicos/CadastroMedico'
import EditarMedico from '../pages/medicos/EditarMedico'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaBase />}>
                <Route path="home" element={<Home/>}/>
                <Route path="home/medicos" element={<Medicos/>} />
                <Route path="home/medicos/cadastro" element={<CadastroMedico/>} />
                <Route path="home/medicos/editar/:id" element={<EditarMedico/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes