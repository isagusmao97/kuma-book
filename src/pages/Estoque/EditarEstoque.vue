<template>
    <q-page>
        <Formulario-estoque acao="editar"/>
    </q-page>
  </template>
  
  <script>
  import FormularioEstoque from "src/components/Estoque/FormularioEstoque.vue";
  
  export default {
    components: {
      FormularioEstoque,
    },
  };
  </script>