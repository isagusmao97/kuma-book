<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section
        align="center"
        class="colum items-center justify-between text-center"
      >
        <q-avatar icon="live_help" color="warning" text-color="white" />
        <div class="text-h5">{{ messagem }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-center">
        Ao confirmar essa ação, você não poderá desfazê-la.
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          color="primary"
          unelevated
          label="Sim, excluir!"
          @click="onOKClick"
        />
        <q-btn outline label="Cancelar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";

export default {
  props: {
    messagem: {
      type: String,
      required: true,
    },
  },

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK();
      },
      onCancelClick: onDialogCancel,
    };
  },
};
</script>
