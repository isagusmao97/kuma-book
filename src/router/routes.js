
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: "/pagina-produto",
        component: () =>
          import("src/pages/Produto/PaginaProduto.vue"),
      },
      {
        path: "/pagina-estoque",
        component: () =>
          import("src/pages/Estoque/PaginaEstoque.vue"),
      },
      {
        path: "/pagina-venda",
        component: () =>
          import("src/pages/Venda/PaginaVenda.vue"),
      },
      {
        path: "/pagina-funcionario",
        component: () =>
          import("src/pages/Funcionario/PaginaFuncionario.vue"),
      },
      {
        path: "/pagina-cliente",
        component: () =>
          import("src/pages/Cliente/PaginaCliente.vue"),
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
