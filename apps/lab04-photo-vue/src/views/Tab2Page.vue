<!-- src/views/Tab2Page.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Student info (required by lab) -->
      <div class="student-info ion-padding">
        <p><strong>รหัสนักศึกษา:</strong> 663380213-6</p>
        <p><strong>ชื่อ:</strong> ธิติวุฒิ ศรีอมรรัตน์</p>
      </div>

      <!-- Gallery Grid -->
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="(p, i) in photos" :key="i">
            <ion-img :src="p.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Floating Action Button (Camera) -->
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="addNewToGallery()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/vue'

import { camera } from 'ionicons/icons'

import { usePhotoGallery } from '@/composables/usePhotoGallery'

const { addNewToGallery, photos } = usePhotoGallery()
</script>

<style scoped>
.student-info {
  text-align: center;
  font-size: 1rem;
}
</style>
