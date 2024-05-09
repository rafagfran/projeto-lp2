import React from 'react'
import axios from 'axios';

export default class MedicosCrud{

    
    #urlGetAll  = 'http://localhost:8080/api/v1/doctor/getAll';
    #urlCreate = 'http://localhost:8080/api/v1/doctor/create';
    #urlUpdate = 'http://localhost:8080/api/v1/doctor/update';
    #urlGetByCrm = 'http://localhost:8080/api/v1/doctor/getByCrm';
    #urlDelete = 'http://localhost:8080/api/v1/doctor/delete';
    #urlList = 'http://localhost:8080/api/v1/doctor/list';
    #urlGetById = 'http://localhost:8080/api/v1/doctor/getById';
    #urlGetByName = 'http://localhost:8080/api/v1/doctor/getByName';


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

    async getByCrm(crm){
        try {
            const response = await axios.get(`${this.#urlGetByCrm}/${crm}`)
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
