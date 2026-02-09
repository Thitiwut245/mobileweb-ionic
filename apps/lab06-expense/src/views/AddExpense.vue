<!-- src/views/AddExpense.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>เพิ่มรายการ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input label="ชื่อรายการ" v-model="title" />
      <ion-input label="จำนวนเงิน" type="number" v-model="amount" />

      <ion-select label="ประเภท" v-model="type">
        <ion-select-option value="income">รายรับ</ion-select-option>
        <ion-select-option value="expense">รายจ่าย</ion-select-option>
      </ion-select>

      <ion-input label="หมวดหมู่" v-model="category" />
      <ion-textarea label="หมายเหตุ" v-model="note" />

      <ion-button expand="block" @click="saveExpense">
        บันทึก
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, loadingController, alertController } from '@ionic/vue';

const router = useRouter();

const title = ref("");
const amount = ref<number | null>(null);
const type = ref("expense");
const category = ref("");
const note = ref("");

const saveExpense = async () => {
  if (!title.value || !amount.value || !category.value) {
    const alert = await alertController.create({
      header: 'Incomplete Form',
      message: 'Please fill in all required fields.',
      buttons: ['OK'],
    });
    await alert.present();
    return;
  }

  const loading = await loadingController.create({
    message: 'Saving...',
  });
  await loading.present();

  try {
    await addDoc(collection(db, "expenses"), {
      title: title.value,
      amount: Number(amount.value),
      type: type.value,
      category: category.value,
      note: note.value,
      createdAt: new Date()
    });

    const alert = await alertController.create({
      header: 'Success',
      message: 'Expense saved successfully!',
      buttons: ['OK'],
    });
    await alert.present();

    // Clear form
    title.value = "";
    amount.value = null;
    type.value = "expense";
    category.value = "";
    note.value = "";

    router.replace("/tabs/list");
  } catch (error) {
    console.error("Error saving expense: ", error);
    const alert = await alertController.create({
      header: 'Error',
      message: 'Failed to save expense. Please try again.',
      buttons: ['OK'],
    });
    await alert.present();
  } finally {
    await loading.dismiss();
  }
};
</script>
