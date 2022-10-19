<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-blue-10 text-white">
      <q-toolbar class="bg-purple-10">
        <q-btn
            class="text-white"
            :label="acesso"
            icon="menu"
          >
            
          </q-btn>
      </q-toolbar>
    </q-header>
     
    <q-page-container>
      <router-view  class="q-pa-md"/>
    </q-page-container>

    <q-footer elevated class="bg-purple-10 q-pa-sm text-white text-center">
      <span>Desenvolvido por Kuma Book</span>
    </q-footer>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",


  setup(){
    

    }  

});
</script>
