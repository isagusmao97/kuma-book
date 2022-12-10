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
            ref="endereco"
            type="text"
            dense
            outlined
            v-model="form.endereco"
            label="Endereço"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-4">
          <q-input
            ref="telefone"
            dense
            outlined
            v-model="form.telefone"
            label="Telefone"
            mask="(##)#####-####"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-2">
          <q-input
            ref="email"
            type="email"
            dense
            outlined
            v-model="form.email"
            label="E-mail"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-2">
          <q-input
            ref="horarioTrabalho"
            type="text"
            dense
            outlined
            v-model="form.horarioTrabalho"
            label="Horário de Trabalho"
            lazy-rules
            hint="Preencha com o seu horário de trabalho"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-2">
          <q-input
            ref="matricula"
            dense
            outlined
            v-model="form.matricula"
            label="Matrícula"
            lazy-rules
            mask="#####-#"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
      </div>

      <div class="q-mt-lg">
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
      endereco: "",
      telefone: "",
      email: "",
      horarioTrabalho: "",
      matricula:""
    });


    onMounted(() => {
      if (props.acao === "editar") {
        carregaDados();
      }
    });

    async function carregaDados() {
      $q.loading.show();
      try {
        const request = await api.get(`funcionarios/${$route.params.id}`);
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
        const dadosFormatados = {...form.value,telefone,matricula:parseInt(form.value.telefone,form.value.matricula)}
        console.log(dadosFormatados)
        const request = await api.post(`funcionarios`, dadosFormatados);
        
        if (request.status == 201) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Funcionário cadastrado com sucesso!",
            icon: "check",
          });
          $router.push("/pagina-funcionario");
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
          `funcionarios/${$route.params.id}`,
          form.value
        );
        if (request.status == 200) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Funcionário atualizado com sucesso!",
            icon: "check",
          });
          $router.push("/pagina-funcionario");
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

