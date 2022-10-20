<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-blue-10 text-white">
      <q-toolbar class="bg-purple-10">
        <q-btn
            class="text-white"
            icon="menu"
             @click="drawer = !drawer"
          >
          </q-btn>
      </q-toolbar>
    </q-header>

     <q-drawer
        class="bg-grey-2"
        v-model="drawer"
        side="left"
        show-if-above
        :width="250"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple to="/pagina-estoque" active-class="my-menu-link" exact>
              <q-item-section avatar>
                <q-icon name="assignment" />
              </q-item-section>

              <q-item-section>
                Gerenciar Estoque
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/pagina-produto" active-class="my-menu-link" exact>
              <q-item-section avatar>
                <q-icon name="list_alt" />
              </q-item-section>

              <q-item-section>
                Gerenciar Produtos
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/pagina-venda" active-class="my-menu-link" exact>
              <q-item-section avatar>
                <q-icon name="store" />
              </q-item-section>

              <q-item-section>
                Gerenciar Vendas
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/pagina-funcionario" active-class="my-menu-link" exact>
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>

              <q-item-section>
                Gerenciar Funcionários
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/pagina-cliente" active-class="my-menu-link" exact>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section>
                Gerenciar Clientes
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
     
    <q-page-container>
      <router-view  class="q-pa-md"/>
    </q-page-container>

    <!-- <q-footer elevated class="bg-purple-10 q-pa-sm text-white text-center">
      <span>Desenvolvido por Kuma Book</span>
    </q-footer> -->

  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",


  setup(){
    return {
      drawer: ref(false),
    }

    }  

});
</script>

<style lang="scss">
.menu-list .q-item{
  border-radius: 0 50px 50px 0
}
.my-menu-link{
  color:white;
  background: #9080BA;
}
  
</style>
