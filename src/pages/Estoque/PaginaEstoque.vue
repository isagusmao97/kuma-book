<template>
    <div>
    <q-toolbar class="q-pa-none flex justify-between items-center">
      <q-input
        style="width: 40%"
        outlined
        v-model="pesquisa"
        label="Pesquisa"
        dense
        @keyup.enter="buscaDadosPorNome()"
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
      :rows="estoque"
      :columns="campos"
      row-key="nome"
      class="q-mt-sm"
      hide-bottom
      :pagination="pagination"
    >
      <template v-slot:body-cell-acao="scope">
        <td>
          <div class="q-pa-sm text-center q-gutter-sm items-center">
            <q-btn v-if="!scope.row.id_estoque"
              title="Adicionar"
              dense
              icon="add"
              color="green-7"
              size="sm"
              :to="`/adicionar-estoque/${scope.row.id_produto}`"
            />
            <q-btn v-if="scope.row.id_estoque"
              title="Editar"
              dense
              size="sm"
              unelevated
              color="purple-10"
              icon="edit"
              @click="
                $router.push(
                  `/editar-estoque/${scope.row.id_estoque}`
                )
              "
            />
            <q-btn v-if="scope.row.id_estoque"
              dense
              size="sm"
              unelevated
              color="negative"
              icon="close"
              @click="exibeMensagemConfirmacao(scope.row.id_estoque)"
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
        :max-pages="20"
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
    name: "quantidade",
    align: "left",
    label: "Quantidade",
    field: "quantidade",
    sortable: true,
    style: "width: 15%",
  },
  {
    name: "nome",
    align: "left",
    label: "Nome",
    field: "nome",
    sortable: true,
    style: "width: 60%",
  },
  {
    name: "localizacao",
    align: "left",
    label: "Localiza????o",
    field: "localizacao",
    sortable: true,
    style: "width: 60%",
  },
  {
    name: "acao",
    field: "acao",
    align: "center",
    label: "A????es",
    style: "width: 20%",
  },
];

export default {
  setup() {
    const $q = useQuasar();
    const estoque = ref([]);
    const paginaAtual = ref(1);
    const totalPaginas = ref(0);
    const pesquisa = ref("");
    const pagination = ref({
      rowsPerPage: 20,
    });

    onMounted(() => {
      buscaDados();
    });

    async function buscaDados() {
      $q.loading.show({
        message: 'Buscando dados...'
      })
      try {
        const request = await api.get(
          `estoque`
        );
        estoque.value = [];
        request.data.forEach(produto => {
          if(produto.estoque) {
            estoque.value.push ({
              nome: produto.nome,
              quantidade: produto.estoque.quantidade,
              localizacao: produto.estoque.localizacao,
              id_produto: produto.id,
              id_estoque: produto.estoque.id,
              })
            }else {
              estoque.value.push({
                nome: produto.nome,
                id_produto: produto.id,
              });
            }
          });



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

    async function buscaDadosPorNome() {
      $q.loading.show({
        message: 'Buscando dados...'
      })
      try {
        const request = await api.get(
          `estoque/pesquisa/${pesquisa.value}`
        );
        estoque.value = [];
        request.data.forEach(produto => {
          if(produto.estoque) {
            estoque.value.push ({
              nome: produto.nome,
              quantidade: produto.estoque.quantidade,
              localizacao: produto.estoque.localizacao,
              id_produto: produto.id,
              id_estoque: produto.estoque.id,
              })
            }else {
              estoque.value.push({
                nome: produto.nome,
                id_produto: produto.id,
              });
            }
          });


        //produto.estoque.value = request.data;
        //estoque.produto.value = request.data;
        //estoque.value = request.data;
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
      exibeMensagem("Tem certeza de que deseja excluir esse estoque?").onOk(
        () => {
          exclui(id);
        }
      );
    }

    async function exclui(item) {
      try {
        const request = await api.delete(`estoque/${item}`);
        if (request.status == 200) {
          $q.notify({
            type: "positive",
            message: "Estoque removido com sucesso!",
            position: "top",
            timeout: 350,
          });
        }
        estoque.value = [];

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
      estoque,
      paginaAtual,
      totalPaginas,
      pagination,
      pesquisa,
      exclui,
      exibeMensagem,
      exibeMensagemConfirmacao,
      buscaDados,
      buscaDadosPorNome,
    };
  },
};

</script>

