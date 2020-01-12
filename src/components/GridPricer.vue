<template>
<div>
<v-container class="fill-widht" fluid>

    <v-layout>
        <v-flex>

            <v-toolbar flat dense>

                <v-menu offset-y open-on-hover dense>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small v-on="on">
                            <v-icon small>mdi-plus</v-icon>New Leg
                        </v-btn>
                    </template>

                    <v-list dense>
                        <template v-for="(item,index) in products">
                            <v-subheader v-if="item.header" :key="item.header">
                                {{ item.header }}
                            </v-subheader>

                            <v-list-item v-if="item.title" v-bind:key="index" @click="add(item.id)">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>

                        </template>

                    </v-list>
                </v-menu>

                <v-menu offset-y open-on-hover dense>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small="" v-on="on">
                            <v-icon small>mdi-folder-open</v-icon>Load Trades
                        </v-btn>
                    </template>

                    <v-list dense>
                        <template v-for="(item,index) in trades">
                            <v-subheader v-if="item.header" :key="item.header">
                                {{ item.header }}
                            </v-subheader>

                            <v-list-item v-if="item.title" v-bind:key="index" @click="load(item.id)">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>

                        </template>

                    </v-list>
                </v-menu>
                <v-icon x-small>mdi-blank</v-icon>
                <v-btn x-small v-if="somthingClicked" dark color="#f6643c" @click.native="removeLeg(clickedId)">
                    <v-icon small>mdi-delete</v-icon> Delete Leg
                </v-btn>
                <v-icon x-small>mdi-blank</v-icon>

                <v-btn x-small v-if="somthingClicked" dark color="#f6643c" @click.native="duplicateLeg(clickedId)">
                    <v-icon small>mdi-content-duplicate</v-icon> Duplicate Leg
                </v-btn>

                <v-spacer></v-spacer>
                <v-text-field x-small v-if="search_trade" v-model="search" append-outer-icon="mdi-cloud-search" label="Trade Id" single-line hide-details color="red">

                </v-text-field>

                <v-spacer></v-spacer>

              
                <v-btn x-small v-if="allLegs.length>=5" @click.native="deleteAllLegs()">
                    <v-icon small>mdi-delete-sweep</v-icon> Delete All
                </v-btn>

                <v-btn x-small v-if="allLegs.length>=1">
                    <v-icon small>mdi-share</v-icon> Share Legs
                </v-btn>

            </v-toolbar>

        </v-flex>
    </v-layout>

    <v-layout>
        <v-flex>
            <isotope ref="cpt" id="legpricer" :item-selector="'element-item'" :options="Isotope_option" :list="allLegs" @layout="currentLayout='horiz'">

                <div v-for="(element,index) in allLegs" @click="clickElement(element)" v-bind:class="[clickedId===index ? activeClass : '', element]" :key="index">

                    <p class="symbol">{{element.symbol}}</p>
                    <p class="legid">{{index}}</p>

                    <p class="side">{{element.issuer.substring(0,8) + '  ' +element.side.split(' ')[0]}}</p>

                </div>
            </isotope>

        </v-flex>
    </v-layout>
    <v-layout row wrap justify-start>
        <v-flex lg9 xl9 wrap>
            <br>
            <div v-if="somthingClicked">

                <cds :legId="clickedId" @clicked="saveClicked"> </cds>

            </div>

        </v-flex>
    </v-layout>


</v-container>

<template>

    <v-footer
      fixed
    
    >

     <v-toolbar flat dense>

                <v-btn small class="ma-2" color="warning" v-if="allLegs.length>=1">
                    <v-icon small> mdi-format-paragraph</v-icon> Price
                </v-btn>

                
                <v-btn small class="ma-2" dark v-if="allLegs.length>=1">
                    <v-icon small> mdi-finance</v-icon> Risk 
                </v-btn>

                 <v-btn small class="ma-2"  v-if="allLegs.length>=1">
                    <v-icon small> mdi-refresh</v-icon> Refresh MD 
                </v-btn>


                 <v-spacer></v-spacer>

               
                {{ new Date().getFullYear() }} — <strong>Hybrids</strong>

            </v-toolbar>

     
        
     
    </v-footer>
  
</template>

</div>
</template>

<script>
import isotope from "vueisotope";
import Cds from "@/components/products/Cds";

import {
    mapMutations,
    mapGetters
} from 'vuex'

export default {
    name: 'GridPricer',

    data: () => ({
        search_trade: false,
        trades: [{
                header: 'Credit',
            },
            {
                id: 'cds',
                title: 'CDS Singlename '
            },
        ],
        products: [{
                header: 'Credit',
            },
            {
                id: 'cds',
                title: 'CDS Singlename '
            },
            {
                id: 'indx',
                title: 'CDS Index'
            },
            {
                id: 'cln',
                title: 'Vanilla CLN'
            },
            {
                header: 'Rates',
            },
            {
                id: 'fix',
                title: 'Fix Leg'
            },
            {
                id: 'flt',
                title: 'Floating Leg'
            },
            {
                id: 'irs',
                title: 'Interest Rate Swap'
            },
            {
                id: 'xccy',
                title: 'XCCY Swap'
            },
            {
                header: 'Fx',
            },
            {
                id: 'fxswp',
                title: 'Fx Swap'
            },
            {
                id: 'fxfwd',
                title: 'FX Fwd'
            },
            {
                header: 'Hybrids',
            },
            {
                id: 'trstm',
                title: 'TRS to Maturity'
            },

        ],

        selectedLegs: [],
        somthingClicked: false,
        clickedId: null,
        clickedLegId: 0,
        activeClass: "selectedElement",
        Isotope_option: {
            itemSelector: ".element-item"
        },

    }),
    components: {
        isotope,
        Cds
    },
    computed: {
        ...mapGetters([
            // Mounts the "safelyStoredNumber" getter to the scope of your component.
            'pricer_legs'
        ]),

        allLegs() {
            return this.pricer_legs;
        }
    },

    methods: {
        saveClicked(value) {
            this.somthingClicked = value
        },
        add: function (product) {

            this.$store.commit('pricer_addLeg', {
                issuer: "Issuer",
                symbol: product,
                id: this.pricer_legs.length,
                side: 'Long Protection'

            });

        },

        load: function (product) {
            this.search_trade = true
            console.log(product)

        },

        removeLeg: function (id) {
            this.somthingClicked = false
            this.$store.commit('pricer_deleteLeg', id)

            //this.clickedId = null
        },
        deleteAllLegs: function () {
            this.$store.commit('pricer_delete_allLegs')
            this.somthingClicked = false
        },
        clickElement: function (leg) {

            if (this.somthingClicked) {
                console.log('hop')
                this.somthingClicked = false;
                this.clickedLegId = null;
                this.clickedId = null;
                return

            }
            this.somthingClicked = true;
            this.clickedLegId = leg;
            this.clickedId = leg.id;
        },
        duplicateLeg: function (id) {
            this.$store.commit('pricer_duplicateLeg', id)
            this.somthingClicked = false

            //   this.clickedId = null
        },
        ...mapMutations([
            // Mounts the "incrementStoredNumber" mutation to `this.incrementStoredNumber()`.
            'pricer_deleteLegs',
            // Mounts the "setStoredNumber" mutation to `this.setStoredNumber(newNumber)`.
            'pricer_addLeg'
        ])
    }

};
</script>

<style>
.grid {
    border: 2px solid #333;
}

.grid:after {
    content: "";
    display: block;
    clear: both;
}

.isoDefault {
    min-height: 210px;
}

/* ---- .element-item ---- */

.element-item {
    position: absolute;
    float: left;
    width: 120px;
    height: 80px;
    margin: 5px;
    padding: 10px;
    background: #7f7e7f;
    color: #262524;
    cursor: pointer;
}

.element-item:hover {
    cursor: pointer;
    background: #b5b5b6;
}

.selectedElement {
    cursor: pointer;
    background: #f6643c;
}

.element-item>* {
    margin: 0;
    padding: 0;
}

.element-item .symbol {
    position: absolute;
    left: 5px;
    top: 5px;
    font-size: 42px;
    font-weight: normal;
    color: white;
}

.element-item .legid {
    position: absolute;
    left: 5px;
    bottom: -15px;
    font-size: 14px;
    color: white;
}

.element-item .cross {
    position: absolute;
    left: 5px;
    bottom: 15px;
    font-size: 14px;

    color: rgb(126, 122, 122);
}

.element-item .side {
    position: absolute;
    right: 5px;
    bottom: -15px;
    font-size: 12px;
    color: white;
}

.element-item.cds {
    background: #f6643c;
}
</style>
