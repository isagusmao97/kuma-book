
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: "/pagina-produtos",
        component: () =>
          import("src/pages/Produto/PaginaProduto.vue"),
      },
      {
        path: "/adicionar-produtos",
        component: () =>
          import("src/pages/Produto/AdicionarProduto.vue"),
      },
      {
        path: "/editar-produtos/:id",
        component: () =>
          import("src/pages/Produto/EditarProduto.vue"),
      },
      {
        path: "/pagina-estoque",
        component: () =>
          import("src/pages/Estoque/PaginaEstoque.vue"),
      },
      {
        path: "/adicionar-estoque",
        component: () =>
          import("src/pages/Estoque/AdicionarEstoque.vue"),
      },
      {
        path: "/editar-estoque/:id",
        component: () =>
          import("src/pages/Estoque/EditarEstoque.vue"),
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
        path: "/adicionar-funcionario",
        component: () =>
          import("src/pages/Funcionario/AdicionarFuncionario.vue"),
      },
      {
        path: "/editar-funcionario/:id",
        component: () =>
          import("src/pages/Funcionario/EditarFuncionario.vue"),
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
