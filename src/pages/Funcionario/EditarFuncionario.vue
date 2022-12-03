<template>
  <q-page>
      <formulario-funcionario acao="editar"/>
  </q-page>
</template>

<script>
import FormularioFuncionario from "src/components/Funcionario/FormularioFuncionario.vue";

export default {
  components: {
    FormularioFuncionario,
  },
};
</script>