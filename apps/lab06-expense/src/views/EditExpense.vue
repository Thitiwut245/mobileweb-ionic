<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>แก้ไขรายการ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input label="ชื่อรายการ" v-model="title"></ion-input>

      <ion-input
        label="จำนวนเงิน"
        type="number"
        v-model="amount"
      ></ion-input>

      <ion-select label="ประเภท" v-model="type">
        <ion-select-option value="income">รายรับ</ion-select-option>
        <ion-select-option value="expense">รายจ่าย</ion-select-option>
      </ion-select>

      <ion-input label="หมวดหมู่" v-model="category"></ion-input>
      <ion-textarea label="หมายเหตุ" v-model="note"></ion-textarea>

      <ion-button expand="block" @click="updateExpense">
        อัปเดตข้อมูล
      </ion-button>

      <ion-button expand="block" color="danger" @click="confirmDelete">
        ลบข้อมูล
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  alertController
} from '@ionic/vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const title = ref("");
const amount = ref<number | string>("");
const type = ref<"income" | "expense">("expense");
const category = ref("");
const note = ref("");

const confirmDelete = async () => {
  const alert = await alertController.create({
    header: 'ยืนยันการลบ',
    message: 'คุณต้องการลบรายการนี้ใช่หรือไม่?',
    buttons: [
      {
        text: 'ยกเลิก',
        role: 'cancel',
      },
      {
        text: 'ลบ',
        role: 'confirm',
        handler: async () => {
            await deleteDoc(doc(db, "expenses", id));
            router.replace("/tabs/list");
        },
      },
    ],
  });

  await alert.present();
};

onMounted(async () => {
  const snap = await getDoc(doc(db, "expenses", id));
  if (!snap.exists()) return;

  const data = snap.data() as any;
  title.value = data.title ?? "";
  amount.value = data.amount ?? "";
  type.value = data.type ?? "expense";
  category.value = data.category ?? "";
  note.value = data.note ?? "";
});

const updateExpense = async () => {
  // validation กันข้อมูลว่าง/amount=0
  if (!title.value || Number(amount.value) <= 0) {
    alert("กรุณากรอกชื่อรายการและจำนวนเงินให้ถูกต้อง");
    return;
  }

  await updateDoc(doc(db, "expenses", id), {
    title: title.value,
    amount: Number(amount.value),
    type: type.value,
    category: category.value,
    note: note.value,
  });

  // กลับหน้ารายการหลังอัปเดตเสร็จ (ตามโจทย์)
  router.push("/tabs/list");
};
</script>
