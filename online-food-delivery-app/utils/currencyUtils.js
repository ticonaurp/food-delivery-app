export const formatearSoles = (valor) => {
  if (typeof valor !== "number" || isNaN(valor)) return "S/ 0.00"
  return valor.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
