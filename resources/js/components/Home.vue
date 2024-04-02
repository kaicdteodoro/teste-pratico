<template>
    <v-container
        class="py-8 px-6"
        fluid
    >
        <v-row>
            <v-col cols="12">
                <salarial/>
            </v-col>
            <v-col cols="12">
                <sequencia/>
            </v-col>
            <v-col cols="12">
                <fibonacci/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {defineAsyncComponent} from "vue";

export default {
    components: {
        Salarial: defineAsyncComponent(() => import("./Salarial.vue")),
        Sequencia: defineAsyncComponent(() => import("./Sequencia.vue")),
        Fibonacci: defineAsyncComponent(() => import("./Fibonacci.vue")),
    }
}
</script>
