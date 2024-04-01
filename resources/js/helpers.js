export function toFloat(value) {
    return parseFloat(value.replace("R$ ", "").replace(/\./g,"").replace(",","."))
}
