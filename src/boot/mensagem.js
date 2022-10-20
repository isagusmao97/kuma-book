import { Dialog } from "quasar";
import Mensagem from "src/components/Mensagem.vue";

export default function exibeMensagem(mensagem) {
  return Dialog.create({
    component: Mensagem,
    componentProps: {
      messagem: mensagem,
    },
  });
}
