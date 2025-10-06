import { onMounted, onUnmounted } from "vue";

export default function useClickOutside(targetRef, callback) {
  const handleClick = (event) => {
    if (targetRef.value && !targetRef.value.contains(event.target)) {
      callback(event);
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });
}
