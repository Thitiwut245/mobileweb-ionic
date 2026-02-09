<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Expense List</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/tabs/add">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Expense List</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <p>Expenses will be listed here.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
</script>
