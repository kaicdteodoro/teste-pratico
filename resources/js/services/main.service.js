class MainService {
    async ex01(price, hours, children) {
        let familia = 0;
        let bruto = price * hours;
        switch (true) {
            default:
                return undefined
            case (bruto <= 788):
                familia = 30.5 * children;
                break;
            case (bruto > 788 && bruto <= 1100):
                familia = 18.5 * children;
                break;
            case (bruto > 1100):
                familia = 11.9 * children;
                break;
        }
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
