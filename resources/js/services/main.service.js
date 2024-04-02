import {Service} from "./service.js";

class MainService extends Service {
    async ex01(price, hours, children) {
        let params = {
            price: parseFloat(price),
            hours: parseFloat(hours),
            children: parseFloat(children),
        }
        let {bruto, familia} = await this.get('salarial', params) || {};
        return {
            bruto,
            familia
        }
    }

    async ex02(list) {
        let smaller = list[0], bigger = list[0];
        list.map(value => {
            switch (true) {
                case (value < smaller):
                    smaller = value;
                    break;
                case (value > bigger):
                    bigger = value
                    break;
            }
        });
        return {smaller, bigger}
    }

    async ex03(total) {
        let result = [];
        result[0] = result[1] = 1;
        for (let i = 2; i < total; i++) {
            let sum = result[i - 1] + result[i - 2];
            if (sum <= total) {
                result[i] = sum;
            }
        }
        return result;
    }
}

export default new MainService();
