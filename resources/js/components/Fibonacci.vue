<template>
    <v-card class="ma-5" elevation="8">
        <v-card-title v-text="'Fibonacci'"/>
        <v-card-text>
            <v-form @submit.prevent="run" fast-fail ref="form">
                <v-container fluid>
                    <v-card class="pa-5 mb-5" elevation="10" :loading="loading">
                        <v-card-actions>
                            <v-responsive max-width="200">
                                <v-text-field
                                    type="number"
                                    label="Limite da sequencia"
                                    v-model="limit"
                                    hide-details="auto"
                                    variant="solo-filled"
                                />
                            </v-responsive>
                            <v-responsive max-width="250">
                                <v-text-field
                                    variant="plain"
                                    :disabled="true"
                                    class="mx-5 my-auto"
                                    :color="check ? 'success' : 'error'"
                                    :value="check ? 'dentro da sequência' : 'fora da sequência'"
                                />
                            </v-responsive>
                            <v-spacer/>
                            <v-card
                                class="overflow-x-auto mx-5"
                                max-width="1000"
                                variant="text"
                                :loading="loading"
                            >
                                <v-breadcrumbs :items="list" active-color="white">
                                    <template v-slot:title="{ item }">
                                        {{ item }}
                                    </template>
                                </v-breadcrumbs>
                            </v-card>
                        </v-card-actions>
                    </v-card>
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
import service from '../services/main.service.js'

export default {
    directives: {money: VMoney},
    data: () => ({
        list: [],
        limit: 0,
        loading: false,
        timeout: undefined,
    }),
    methods: {
        async run() {
            let {valid} = await this.$refs.form.validate() || {};
            if (valid) {
                this.loading = true;
                this.list = await service.ex03(parseInt(this.limit));
                this.loading = false;
            }
        }
    },
    computed: {
        check() {
            return this.list.includes(parseInt(this.limit), this.list.length - 1);
        }
    },
}
</script>
