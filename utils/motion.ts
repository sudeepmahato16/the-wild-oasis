export const slideIn = (
  direction: "left" | "right" | "up" | "down",
  type: "tween" | "inertia" | "spring" | "just" | "keyframes",
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    transition: {
      duration,
      ease: "easeOut",
    },
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      duration,
      ease: "easeOut",
    },
  },
});

export const fadeIn = (duration: number, initialOpacity = 0) => ({
  hidden: {
    opacity: initialOpacity,
  },
  show: {
    opacity: 1,
    transition: {
      duration,
      ease: "easeIn",
      type: "tween",
    },
  },
});
