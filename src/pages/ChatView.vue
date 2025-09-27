<script setup>
import { ref } from "vue";
import { PaperClipIcon, PhotoIcon } from "@heroicons/vue/24/solid"; // Corrige la importación
import MainButton from "../components/ui/buttons/MainButton.vue";
import { supabase } from "../lib/supabase";
import ChatCard from "../components/ui/cards/ChatCard.vue";

const messages = ref([]);
const newMessage = ref("");

async function loadMessages() {
  try {
    const { data, error } = await supabase
      .from("global_chat")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    messages.value = data;

    const channel = supabase
      .channel("chat:global_chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "global_chat",
        },
        (payload) => {
          messages.value.push(payload.new);
        }
      )
      .subscribe();

    return channel;
  } catch (error) {
    console.error("Error al cargar mensajes:", error.message);
  }
}

async function sendMessage(event) {
  event.preventDefault();
  if (!newMessage.value.trim()) return;

  try {
    const { error } = await supabase.from("global_chat").insert([
      {
        email: "user@example.com",
        content: newMessage.value,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) throw error;

    newMessage.value = "";
  } catch (error) {
    console.error("Error al enviar mensaje:", error.message);
  }
}

loadMessages();
</script>

<template>
  <main class="container mx-auto max-w-5xl px-4 py-32">
    <h1 class="text-3xl font-bold">Chat Page</h1>
    <form @submit="sendMessage" class="w-full mt-10">
      <label for="message" class="sr-only">Message:</label>
      <textarea
        v-model="newMessage"
        id="message"
        name="message"
        cols="30"
        rows="4"
        placeholder="Your message..."
        required
        class="w-full border border-border p-4 min-h-50 resize-none"
      ></textarea>
      <div class="flex items-center justify-between py-4">
        <div class="flex gap-4 items-center">
          <PaperClipIcon class="w-8 h-8 text-border cursor-not-allowed" />
          <PhotoIcon class="w-8 h-8 text-border cursor-not-allowed" />
        </div>
        <MainButton type="submit">Send</MainButton>
      </div>
    </form>
    <ul class="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-3 lg:mt-20">
      <li v-for="message in messages" :key="message.id">
        <ChatCard
          :to="'chat/' + message.id"
          :avatar="null"
          :name="message.email"
          :message="message.content"
          :date="message.created_at"
        />
      </li>
    </ul>
  </main>
</template>
