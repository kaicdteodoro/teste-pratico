<template>
    <v-app id="inspire">
        <v-layout>
            <v-navigation-drawer
                expand-on-hover
                rail
            >
                <v-list>
                    <v-list-item
                        :prepend-avatar="avatar"
                        :subtitle="admin.email"
                        :title="admin.name"
                    ></v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list density="compact" nav>
                        <router-link
                            v-for="(item, i) in items" :key="i"
                            :to="{name: item.route}"
                            custom
                            v-bind="$props"
                            v-slot="{ navigate }"
                        >
                            <v-list-item
                                v-bind="$attrs"
                                :prepend-icon="item.icon"
                                :title="item.title"
                                @click="navigate"
                            ></v-list-item>
                        </router-link>
                </v-list>
            </v-navigation-drawer>

            <v-main>
                <router-view/>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script>
import avatar from '../../../storage/app/public/images/avatar.jpeg';

export default {
    data: () => ({
        avatar,
        drawer: null,
        admin: {
            name: "Kaic Diniz Teodoro",
            email: "kaic.dtsolutions@gmail.com"
        },
        items: [
            {
                icon: "mdi-home",
                title: "Home",
                route: "home"
            },
            {
                icon: "mdi-account-cash",
                title: "Cálculo Salarial",
                route: "salarial"
            },
            {
                icon: "mdi-format-list-numbered-rtl",
                title: "Operar Sequência",
                route: "sequencia"
            },
            {
                icon: "mdi-numeric",
                title: "Sequência de Fibonacci",
                route: "fibonacci"
            },
        ]
    }),
}
</script>

<style scoped>

</style>
