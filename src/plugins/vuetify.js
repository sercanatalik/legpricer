import Vue from 'vue';
import Vuetify,{VTextField,VAutocomplete,VSelect,VCombobox,VOverflowBtn,VBtn} from 'vuetify/lib';



export default new Vuetify({
});

Vue.use(Vuetify,{ components: {
    VTextField,VAutocomplete,VSelect,VCombobox,VOverflowBtn,VBtn
  }});

