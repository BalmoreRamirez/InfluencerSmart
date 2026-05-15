import { onMounted, onBeforeUnmount, ref, Ref } from "vue";

export function useReveal<T extends HTMLElement>() {
  const el: Ref<T | null> = ref(null);
  const visible = ref(false);

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!el.value) return;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.value = true;
            if (observer && el.value) observer.unobserve(el.value);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el.value);
  });

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
    observer = null;
  });

  return { el, visible };
}
