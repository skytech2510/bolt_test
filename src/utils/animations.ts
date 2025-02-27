// Framer Motion variants for page transitions
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
    },
  },
};

export const cardTransition = {
  initial: { scale: 0.95, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const chartTransition = {
  initial: { opacity: 0, pathLength: 0 },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

// Animation utility functions
export const getStaggeredDelay = (index: number, baseDelay = 0.1) => ({
  delay: index * baseDelay,
});

export const getSpringTransition = (stiffness = 200, damping = 20) => ({
  type: "spring",
  stiffness,
  damping,
});

export const getEaseTransition = (duration = 0.3) => ({
  type: "tween",
  ease: "easeInOut",
  duration,
});