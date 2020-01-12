<template>
<v-container fluid grid-list-md>
    <v-layout row>
        <v-flex xs6>
            <v-form>
                <v-form-base :value="leg" :schema="cdsSchema" @blur="change" @input="change" />

            </v-form>
        </v-flex>
        <v-flex xs6>
            {{legId}}

        </v-flex>
        <v-btn class="ma-2" :loading="loading" :disabled="loading" color="gray" @click="saveLeg = 'loading'">
            Save Leg
        </v-btn>
    </v-layout>
</v-container>
</template>

<script>
//import moment from "moment";
import VFormBase from '@/components/utils/vFormBase'

export default {

    components: {
        VFormBase

    },
    props: ["legId"],
    data() {
        return {
            saveLeg: null,

            loading: false,
            leg: {

                issuer: 'Se',
                recovery: 0.25

            },
            cdsSchema: {
                // Info Mask https://vuejs-tips.github.io/vue-the-mask/

                "issuer": {
                    "type": "autocomplete",
                    "label": "Issuer",

                    "items": [
                        "Musk",
                        "Jobs",
                        "Taleb",
                        "Harari"
                    ],
                    "flex": {
                        "xs": 12,
                        "sm": 6,
                        "md": 4
                    }
                },

            }
        }
    },
    methods: {
        change() {
            console.log('changed', this.leg)
            // map ie. schema:{ type:'password', ... } to vuetify control v-text-field'
            return
        }
    },
    watch: {
        saveLeg() {
            const l = this.saveLeg
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 3000)

            this.saveLeg = null
        },
    },

}
</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
