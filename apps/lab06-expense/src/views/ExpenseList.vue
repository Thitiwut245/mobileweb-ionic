<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>รายการรายรับ–รายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Summary -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>สรุป</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>รวมรายรับ: {{ totalIncome }} บาท</p>
          <p>รวมรายจ่าย: {{ totalExpense }} บาท</p>
        </ion-card-content>
      </ion-card>

      <!-- List -->
      <ion-list>
        <ion-item v-for="e in expenses" :key="e.id" button @click="goEdit(e.id)">
          <ion-label>
            <h2>{{ e.title }} ({{ e.type }})</h2>
            <p>{{ e.category }} • {{ e.amount }} บาท</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonList, 
  IonItem, 
  IonLabel 
} from '@ionic/vue';

type Expense = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  note?: string;
  createdAt?: any;
};

const router = useRouter();
const expenses = ref<Expense[]>([]);
let unsub: (() => void) | null = null;

const goEdit = (id: string) => {
  router.push(`/edit/${id}`);
};

const totalIncome = computed(() =>
  expenses.value
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
);

const totalExpense = computed(() =>
  expenses.value
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
);

onMounted(() => {
  // query with orderBy
  const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
  
  unsub = onSnapshot(q, (snap) => {
    console.log("Docs found:", snap.docs.length);
    expenses.value = snap.docs.map((d) => {
      const data = d.data() as Omit<Expense, "id">;
      return { id: d.id, ...data };
    });
  }, (error) => {
    console.error("Firebase Snapshot Error:", error);
    // Fallback if index missing or other error: try without sort
    if (error.code === 'failed-precondition') {
       console.log("Retrying without sort (potential missing index)");
       const qFallback = collection(db, "expenses");
       unsub = onSnapshot(qFallback, (snap) => {
          expenses.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as Expense));
       });
    }
  });
});


onUnmounted(() => {
  if (unsub) unsub();
});
</script>
