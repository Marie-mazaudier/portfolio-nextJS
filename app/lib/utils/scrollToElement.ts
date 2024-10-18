// utils/scrollToElement.ts

/**
 * Scrolls smoothly to the element with the given ID.
 * @param id The ID of the element to scroll to.
 */
export const scrollToElementById = (id: string): void => {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Element with ID '${id}' not found.`);
  }
};
