export class Service {
    async get(route, params) {
        let {data} = await axios.get(`http://localhost:8080/api/${route}`, {params}) || {};
        return data;
    }
}
