<script>
export default {
  name: "Countdown",
  props: {
    date: { type: String, required: true },
  },
  data() {
    return {
      interval: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  mounted() {
    this.calculateTime();
    this.interval = setInterval(this.calculateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    calculateTime() {
      const target = new Date(this.date).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        clearInterval(this.interval);
        return;
      }

      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    },
  },
};
</script>

<template>
  <div class="flex items-center gap-3 font-bold text-font-primary text-7xl">
    <span>{{ days.toString().padStart(2, "0") }}</span>
    :
    <span>
      {{ hours.toString().padStart(2, "0") }}
    </span>
    :
    <span>{{ minutes.toString().padStart(2, "0") }}</span>
    :
    <span>
      {{ seconds.toString().padStart(2, "0") }}
    </span>
  </div>
</template>
