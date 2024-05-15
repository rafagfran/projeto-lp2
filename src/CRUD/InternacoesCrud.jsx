import React from 'react'
import axios from 'axios' 

export default class InternacoesCrud  {

    #urlGetAll  = 'http://localhost:8080/api/v1/hospitalization/getAll';
    #urlCreate = 'http://localhost:8080/api/v1/hospitalization/create';
    #urlUpdate = 'http://localhost:8080/api/v1/hospitalization/update';
    #urlSetDischarge = 'http://localhost:8080/api/v1/hospitalization/setDischarge ';
    #urlDelete = 'http://localhost:8080/api/v1/hospitalization/delete';
    #urlList = 'http://localhost:8080/api/v1/hospitalization/list';
    #urlGetByDoctor = 'http://localhost:8080/api/v1/hospitalization/byDoctor/{idDoMedico}';

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

    async urlSetDischarge(crm){
        try {
            const response = await axios.post(`${this.#urlSetDischarge}/${crm}`)
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async getByDoctor(id){
        try {
            const response = await axios.get(`${this.#urlGetByDoctor}?id=${id}`) // Passar o ID como query string
            return response.data
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
