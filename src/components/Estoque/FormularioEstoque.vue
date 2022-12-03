<template>
    <div>
    <q-form @submit="submit" greedy>
      <div class="row q-col-gutter-md">
        <div class="col-10 col-sm-6">
          <q-input
            ref="id"
            dense
            outlined
            v-model="form.id_produto"
            label="Id"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div> 
        <div class="col-10 col-sm-6">
          <q-input
            ref="quantidade"
            type="number"
            dense
            outlined
            v-model="form.quantidade"
            label="Quantidade"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div> 
        <div class="col-12 col-sm-6">
          <q-input
            ref="localizacao"
            type="text"
            dense
            outlined
            v-model="form.localizacao"
            label="Localização"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
      </div>
      <div class="q-mt-md">
        <q-btn
          size="md"
          icon="check"
          :label="`${acao === 'editar' ? 'Atualizar' : 'Cadastrar'}`"
          type="submit"
          color="purple-10"
        />
        <q-btn
          icon="close"
          label="Cancelar"
          outline
          class="q-ml-sm"
          text-color="purple-10"
          @click="$router.go(-1)"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default {
  props: {
    acao: {
      default: "adicionar",
    },
  },
  setup(props) {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();

    const form = ref({
      nome: "",
      quantidade: "",
      localizacao:"",
      id_produto:"",
    });


    onMounted(() => {
     
      if (props.acao === "editar") {
        carregaDados();
      }else{
        const route = useRoute();
        const id = route.params.id;
        form.value.id_produto = id;
      } 
    });

    async function carregaDados() {
      $q.loading.show();
      try {
        const request = await api.get(`estoque/${$route.params.id}`);
        if (request.status == 200) {
          form.value = request.data;
          console.log(request)
        }
        $q.loading.hide();
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
        $q.loading.hide();
      }
    }

    function submit() {
      if (props.acao === "editar") {
        atualiza();
      } else {
        cadastra();
      }
    }

    async function cadastra() {
      try {
        const dadosFormatados = {...form.value,quantidade:parseInt(form.value.quantidade)}
        
        const request = await api.post(`estoque`, dadosFormatados);
        if (request.status == 201) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Estoque cadastrado com sucesso!",
            icon: "check",
          });
          $router.push("/pagina-estoque");
        }
        $q.loading.hide();
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
        $q.loading.hide();
      }
    }

    async function atualiza() {
      try {
        const request = await api.put(
          `estoque/${$route.params.id}`,form.value);
        if (request.status == 200) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Estoque atualizado com sucesso!",
            icon: "check",
          });
          $router.push("/pagina-estoque");
        }
        $q.loading.hide();
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
        $q.loading.hide();
      }
    }

    return {
      form,
      submit,

    };
  },
};
</script>
<style scoped>
label {
  color: #777;
}
</style>