/**
 * Formatea una fecha en formato DD/MM/YYYY.
 * @param {string|Date|number} date
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};
