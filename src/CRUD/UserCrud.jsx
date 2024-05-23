import axios from 'axios';

class UserCrud {
    #baseUrl = 'http://localhost:8080/api/v1/users';

    #endpoints = {
        getAll: '/getAll',
        create: '/create',
        update: '/update',
        delete: '/delete',
        list: '/list',
        getByUsername: '/getByUsername',
        getByLogin: '/login'
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
            return response;
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

    getByUsername(username) {
        return this.#request('get', this.#endpoints.getByUsername, null, { username });
    }

    getByLogin(login) {
        return this.#request('post', this.#endpoints.getByLogin, login);
    }

    delete(id) {
        return this.#request('delete', this.#endpoints.delete, null, { id });
    }

    async list(pageNumber, pageSize) {
        const data = await this.#request('get', this.#endpoints.list, null, { pageNumber, pageSize });
        return data.content;
    }
}

export default UserCrud;
