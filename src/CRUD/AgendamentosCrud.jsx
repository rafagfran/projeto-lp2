import React from 'react'
import axios from 'axios';

export default class AgendamentosCrud {
    #urlGetAll  = 'http://localhost:8080/api/v1/patient/getAll';
    #urlCreate = 'http://localhost:8080/api/v1/patient/create';
    #urlUpdate = 'http://localhost:8080/api/v1/patient/update';
    #urlGetByCpf = 'http://localhost:8080/api/v1/patient/getByCpf';
    #urlDelete = 'http://localhost:8080/api/v1/patient/delete';
    #urlList = 'http://localhost:8080/api/v1/patient/list';
    #urlGetById = 'http://localhost:8080/api/v1/patient/getById';
    #urlGetByName = 'http://localhost:8080/api/v1/patient/getByName';


    async create(data){
        try {
            const response = await axios.post(this.#urlCreate, data)
            return response.status
        } catch (error) {
            console.error('Erro ao criar o médico:', error);
            throw error;   
        }
    }

    async update(data){
        try {
            const response = await axios.put(`${this.#urlUpdate}`, data)
            return response.status
        } catch (error) {
            throw error;   
        }
    }


    async getAll(){
        try {
            const response = await axios.get(this.#urlGetAll)
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async getByCpf(crm){
        try {
            const response = await axios.get(`${this.#urlGetByCpf}/${crm}`)
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        try {
            const response = await axios.get(`${this.#urlGetById}?id=${id}`) // Passar o ID como query string
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async getByName(name){
        try {
            const response = await axios.get(`${this.#urlGetByName}/${name}`)
            return response
        } catch (error) {
            throw error;
        }
    }

    async delete(id){
        try {
            const response = await axios.delete(`${this.#urlDelete}?id=${id}`)
            return response.data
        } catch (error) {
            throw error;   
        }
    }

    async list(pageNumber, pageSize){
        try {
            const response = await axios.get(`${this.#urlList}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            return response.data.content
        } catch (error) {
            throw error;
        }
    }

}
