<template>
    <div>
    <q-toolbar class="q-pa-none flex justify-between items-center">
      <q-btn
        icon="add_circle"
        color="purple-10"
        label="Adicionar"
        size="md"
        to="/adicionar-produtos"
      />
      <q-input
        style="width: 40%"
        outlined
        v-model="pesquisa"
        label="Pesquisa"
        dense
        @keyup.enter="buscaDados()"
      >
        <template v-slot:append>
          <q-icon
            v-show="pesquisa !== ''"
            name="close"
            @click="pesquisa = ''"
            class="cursor-pointer"
          />
          <q-icon class="cursor-pointer" @click="buscaDados()" name="search" />
        </template>
      </q-input>
    </q-toolbar>
    <q-table
      separator="cell"
      bordered
      :rows="produto"
      :columns="campos"
      row-key="nome"
      class="q-mt-sm"
      hide-bottom
      :pagination="pagination"
    >
      <template v-slot:body-cell-acao="scope">
        <td>
          <div class="q-pa-sm text-center q-gutter-sm items-center">
            <q-btn
              title="Editar"
              dense
              size="sm"
              unelevated
              color="warning"
              icon="edit"
              @click="
                $router.push(
                  `/editar-produtos/${scope.row.id}`
                )
              "
            />
            <q-btn
              dense
              size="sm"
              unelevated
              color="negative"
              icon="close"
              @click="exibeMensagemConfirmacao(scope.row.id)"
              title="Excluir"
            />
          </div>
        </td>
      </template>
    </q-table>
    <div v-if="totalPaginas > 1" class="row justify-center q-pt-md">
      <q-pagination
        @update:model-value="buscaDados"
        v-model="paginaAtual"
        :max="totalPaginas"
        :max-pages="5"
        direction-links
        unelevated
        color="grey-10"
        active-color="primary"
        active-text-color="white"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import exibeMensagem from "boot/mensagem";

const campos = [
  {
    name: "nome",
    align: "left",
    label: "Nome",
    field: "nome",
    sortable: true,
    style: "width: 35%",
  },
  {
    name: "editora",
    align: "left",
    label: "Editora",
    field: "editora",
    sortable: true,
    style: "width: 20%",
  },
  {
    name: "autor",
    align: "left",
    label: "Autor",
    field: "autor",
    sortable: true,
    style: "width: 15%",
  },

  {
    name: "ano",
    field: "ano_lancamento",
    align: "center",
    label: "Ano",
    style: "width: 15%",
  },

  {
    name: "preço",
    field: "preco",
    align: "center",
    label: "Preco",
    style: "width: 15%",
  },
  {
    name: "acao",
    field: "acao",
    align: "center",
    label: "Ações",
    style: "width: 50%",
  },
];

export default {
  setup() {
    const $q = useQuasar();
    const produto = ref([]);
    const paginaAtual = ref(1);
    const totalPaginas = ref(0);
    const pesquisa = ref("");
    const pagination = ref({
      rowsPerPage: 5,
    });

    onMounted(() => {
      buscaDados();
    });

    /* em inspecionar no console aparece erro no sq.loading.show(),
    dizendo que está vazio e não pode ler. Veremos depois quando fizermos a integração. */

    async function buscaDados(pagina = 1) {
      $q.loading.show({
        message: 'Buscando dados...'
      })
      try {
        const request = await api.get(
          `produtos`
        );

        console.log(request)

        produto.value = request.data;
        // totalPaginas.value = request.data.meta.totalPages;
        $q.loading.hide();
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
        console.log(error)
        $q.loading.hide();
      }
    }

    function exibeMensagemConfirmacao(id) {
      exibeMensagem("Tem certeza de que deseja excluir esse produto?").onOk(
        () => {
          exclui(id);
        }
      );
    }

    async function exclui(item) {
      try {
        const request = await api.delete(`produtos/${item}`);
        if (request.status == 200) {
          $q.notify({
            type: "positive",
            message: "Produto removido com sucesso!",
            position: "top",
            timeout: 350,
          });
        }
        buscaDados();
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
      }
    }
    return {
      campos,
      produto,
      paginaAtual,
      totalPaginas,
      pagination,
      pesquisa,
      exclui,
      exibeMensagem,
      exibeMensagemConfirmacao,
      buscaDados,
    };
  },
};
</script>
