<template>
  <div>
    <q-form @submit="submit" greedy>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            ref="nomeRef"
            dense
            outlined
            v-model="form.nome"
            label="Nome"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            ref="editora"
            type="text"
            dense
            outlined
            v-model="form.editora"
            label="Editora"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-4">
          <q-input
            ref="autor"
            dense
            outlined
            v-model="form.autor"
            label="Autor"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-2">
          <q-input
            ref="ano"
            type="text"
            dense
            outlined
            v-model="form.ano_lancamento"
            label="Ano"
            lazy-rules
            mask="####"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-2">
          <q-input
            ref="preco"
            type="number"
            dense
            outlined
            v-model="form.preco"
            label="Preço"
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
      editora: "",
      autor: "",
      ano_lancamento: "",
      preco: "",
    });


    onMounted(() => {
      if (props.acao === "editar") {
        carregaDados();
      }
    });

    async function carregaDados() {
      $q.loading.show();
      try {
        const request = await api.get(`produtos/${$route.params.id}`);
        if (request.status == 200) {
          form.value = request.data;
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
        const request = await api.post(`produtos`, form.value);
        if (request.status == 201) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Produto cadastrado com sucesso!",
            icon: "check",
          });
          $router.push("/pagina-produtos");
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
          `produtos/${$route.params.id}`,
          form.value
        );
        if (request.status == 200) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Produto atualizado com sucesso!",
            icon: "check",
          });
          $router.push("/pagina-produtos");
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

