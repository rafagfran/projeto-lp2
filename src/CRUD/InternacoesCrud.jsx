import axios from 'axios';

class InternacoesCrud {
    #baseUrl = 'http://localhost:8080/api/v1/hospitalization';

    #endpoints = {
        getAll: '/getAll',
        create: '/create',
        update: '/update',
        setDischarge: '/setDischarge',
        delete: '/delete',
        list: '/list',
        getByDoctor: '/byDoctor'
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

    setDischarge(crm) {
        return this.#request('post', `${this.#endpoints.setDischarge}/${crm}`);
    }

    getByDoctor(id) {
        return this.#request('get', `${this.#endpoints.getByDoctor}/${id}`);
    }

    delete(id) {
        return this.#request('delete', this.#endpoints.delete, null, { id });
    }

    list(pageNumber, pageSize) {
        return this.#request('get', this.#endpoints.list, null, { pageNumber, pageSize }).then(data => data.content);
    }
}

export default InternacoesCrud;
