import {Service} from "./service.js";

class MainService extends Service {
    async ex01(price, hours, children) {
        let params = {
            price: parseFloat(price),
            hours: parseFloat(hours),
            children: parseFloat(children),
        }
        let {bruto, familia} = await this.get('salarial', params) || {};
        return {bruto, familia}
    }

    async ex02(list) {
        let {smaller, bigger, secondBigger} = await this.get('sequencia', {list}) || {};
        return {smaller, bigger, secondBigger}
    }

    async ex03(reference) {
        let {sequence, has} = await this.get('fibonacci', {reference}) || {};

        return {sequence, has};
    }
}

export default new MainService();
