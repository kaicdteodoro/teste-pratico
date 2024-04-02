<template>
    <v-card class="ma-5" elevation="8">
        <v-card-title v-text="'Sequência'"/>
        <v-card-text>
            <v-form @submit.prevent="run" fast-fail ref="form">
                <v-container fluid>
                    <v-card class="pa-5 mb-5" elevation="10" :loading="loading">
                        <v-card-actions>
                            <v-responsive max-width="200">
                                <v-text-field
                                    type="number"
                                    label="Tamanho"
                                    v-model="length"
                                    hide-details="auto"
                                    variant="solo-filled"
                                    @keyup="changeSize"
                                    :rules="[rules().minLength]"
                                />
                            </v-responsive>
                            <v-spacer/>
                            <template v-if="end">
                                <v-card-title v-text="print"/>
                            </template>
                            <template v-else>
                                <v-card
                                    class="overflow-x-auto mx-5"
                                    max-width="1000"
                                    variant="text"
                                    :loading="loading"
                                    >
                                    <v-breadcrumbs :items="list"/>
                                </v-card>
                            </template>
                            <v-spacer/>
                            <v-responsive max-width="100">
                                <v-text-field
                                    class="mx-5"
                                    :disabled="true"
                                    v-model="count"
                                    hide-details="auto"
                                    variant="plain"
                                    :rules="[rules().lengthList]"
                                />
                            </v-responsive>
                            <v-responsive max-width="200">
                                <v-form @submit.prevent="push" fast-fail>
                                    <v-text-field
                                        v-model="add"
                                        type="number"
                                        variant="solo-filled"
                                        hide-details="auto"
                                        label="Adicionar"
                                        @click:append="onsubmit"
                                        append-icon="mdi-plus"
                                        :rules="[rules().limitList, rules().minList]"
                                    />
                                </v-form>
                            </v-responsive>
                        </v-card-actions>
                    </v-card>
                </v-container>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn :loading="loading" type="submit" size="x-large" variant="plain" :text="btnText"/>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import {VMoney} from 'v-money';
import service from '../services/main.service.js'

export default {
    directives: {money: VMoney},
    data: () => ({
        length: 0,
        end: false,
        loading: false,
        add: undefined,
        list: [],
        timeout: undefined,
        result: {
            bigger: undefined,
            smaller: undefined,
        }
    }),
    methods: {
        async run() {
            let {valid} = await this.$refs.form.validate() || {};
            if (valid) {
                this.loading = true;
                this.result = await service.ex02(this.list);
                this.end = !this.end;
                this.loading = false;
            }
        },
        push() {
            if (this.list.length < this.length && this.add !== undefined) {
                this.list.push(this.add);
                this.add = undefined;
            }
        },
        rules() {
            return {
                minList: v => this.list.length >= 2 || "Mínimo 2 números",
                minLength: v => this.length >= 2 || "Tamanho mínimo de 2 números",
                lengthList: v => parseInt(this.list.length) === parseInt(this.length) || `Necessária a inclusão de todos os itens`,
                limitList: v => this.list.length < this.length || !v || "Limite de números alcançdo",
            };
        },
        changeSize() {
            let self = this;
            clearTimeout(this.timeout);
            this.loading = true;
            this.timeout = setTimeout(function () {
                let size = parseInt(self.length);
                let listLength = parseInt(self.list.length);
                if (size < listLength) {
                    self.list = self.list.filter((x, index) => index < size)
                }
            }, 800);
            this.loading = false;
        }
    },
    computed: {
        btnText() {
            return this.end ? "Recomeçar" : "Finalizar";
        },
        count() {
            return `${this.list.length}/${this.length}`;
        },
        print() {
            return `Maior: ${this.result.bigger} | Menor: ${this.result.smaller}`;
        }
    },
}
</script>
