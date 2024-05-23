import axios from 'axios';

class MedicosCrud {
    #baseUrl = 'http://localhost:8080/api/v1/doctor';

    #endpoints = {
        getAll: '/getAll',
        create: '/create',
        update: '/update',
        getByCrm: '/getByCrm',
        delete: '/delete',
        list: '/list',
        getById: '/getById',
        getByName: '/getByName'
    };

    async #request(method, endpoint, data = null, params = {}) {
        const url = `${this.#baseUrl}${endpoint}`;
        try {
            const response = await axios({
                method,
                url,
                data,
                params
            });
            return response.data;
        } catch (error) {
            console.error(`Erro na requisição ${method.toUpperCase()} para ${url}:`, error);
            throw error;
        }
    }

    create(data) {
        return this.#request('post', this.#endpoints.create, data);
    }

    update(data) {
        return this.#request('put', this.#endpoints.update, data);
    }

    getAll() {
        return this.#request('get', this.#endpoints.getAll);
    }

    getByCrm(crm) {
        return this.#request('get', `${this.#endpoints.getByCrm}/${crm}`);
    }

    getById(id) {
        return this.#request('get', this.#endpoints.getById, null, { id });
    }

    getByName(name) {
        return this.#request('get', this.#endpoints.getByName, null, { nome: name });
    }

    delete(id) {
        return this.#request('delete', this.#endpoints.delete, null, { id });
    }

    list(pageNumber, pageSize) {
        return this.#request('get', this.#endpoints.list, null, { pageNumber, pageSize }).then(data => data.content);
    }
}

export default MedicosCrud;
