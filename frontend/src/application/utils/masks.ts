export const cpf = (value: string): string => {
  if (value) {
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{3})(\d)/, '$1.$2')
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    return value
  } else return ''
}
