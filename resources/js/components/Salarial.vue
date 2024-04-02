<template>
    <v-card class="ma-5" :loading="loading" elevation="8">
        <v-card-title v-text="'Cálculo Salarial'"/>
        <v-card-text>
            <v-form @submit.prevent="run" ref="form">
                <v-container fluid>
                    <v-card class="pa-5 mb-10" elevation="10" color="#121212">
                        <v-row>
                            <v-col>
                                <v-card color="#121212" elevation="1" :title="printBruto"/>
                            </v-col>
                            <v-col>
                                <v-card color="#121212" elevation="1" :title="printFamilia"/>
                            </v-col>
                            <v-col>
                                <v-card color="#121212" elevation="1" :title="printLiquido"/>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-money="money"
                                variant="solo-filled"
                                v-model="input.price.value"
                                :rules="[rules.required, rules.minMoney]"
                                :label="input.price.label"
                                counter
                            />
                        </v-col>

                        <v-col>
                            <v-text-field
                                type="number"
                                :rules="[rules.min]"
                                variant="solo-filled"
                                :label="input.hours.label"
                                v-model="input.hours.value"
                                class="input-group--focused"
                            />
                        </v-col>

                        <v-col>
                            <v-text-field
                                type="number"
                                variant="solo-filled"
                                class="input-group--focused"
                                :rules="[rules.decimal]"
                                :label="input.children.label"
                                v-model="input.children.value"
                            />
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn :loading="loading" type="submit" size="x-large" variant="plain" text="Calcular"/>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import {VMoney} from 'v-money';
import {toFloat} from "../helpers.js";
import service from "../services/main.service.js"

export default {
    directives: {money: VMoney},
    data: () => ({
        result: {
            bruto: 0,
            familia: 0
        },
        loading: false,
        input: {
            price: {
                value: 0,
                label: "Salário por hora"
            },
            hours: {
                value: 0,
                label: "Horas Trabalhadas"
            },
            children: {
                value: 0,
                label: "Filhos menores de 14 anos"
            }
        },
        rules: {
            min: v => v >= 1 || 'Mínimo um',
            required: v => !!v || 'Obrigatório.',
            minMoney: v => toFloat(v) >= 1 || 'Mínimo R$1,00',
            decimal: v => parseFloat(v) === parseInt(v, 10) || 'Somente números inteiros',
        },
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            suffix: '',
            precision: 2,
            masked: true
        }
    }),
    computed: {
        liquido() {
            let {bruto, familia} = this.result || {};
            return bruto + familia;
        },
        printBruto() {
            return `Salário Bruto: ${this.result?.bruto.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`;
        },
        printFamilia() {
            return `Salário Família: ${this.result?.familia.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            })}`;
        },
        printLiquido() {
            return `Salário Líquido: ${this.liquido.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`;
        }
    },
    methods: {
        async run() {
            let {valid} = await this.$refs.form.validate();
            if (valid) {
                this.loading = true;
                let price = this.input.price.value;
                let hours = this.input.hours.value;
                let children = this.input.children.value;
                this.result = await service.ex01(toFloat(price), parseFloat(hours), children);
                this.loading = false;
            }
        }
    }
}
</script>
