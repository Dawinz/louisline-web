export const OPERATOR_ID = '2833340008'

export const LOCATIONS = [
  { value: 'DAR', label: 'Dar es Salaam' },
  { value: 'MOROGORO', label: 'Morogoro' },
  { value: 'IFAKARA', label: 'Ifakara' },
  { value: 'MALINYI', label: 'Malinyi' },
]

export const ROUTES = [
  { id: 'DAR-MOR', from: 'DAR', to: 'MOROGORO' },
  { id: 'DAR-IFAKARA', from: 'DAR', to: 'IFAKARA' },
  { id: 'DAR-MALINYI', from: 'DAR', to: 'MALINYI' },
  { id: 'IFAKARA-DAR', from: 'IFAKARA', to: 'DAR' },
  { id: 'MALINYI-DAR', from: 'MALINYI', to: 'DAR' },
  { id: 'Ifakara-Morogoro', from: 'IFAKARA', to: 'MOROGORO' },
  { id: 'Dar-Morogoro', from: 'DAR', to: 'MOROGORO' },
  { id: 'Morogoro-Ifakara', from: 'MOROGORO', to: 'IFAKARA' },
  { id: 'Morogoro-Dar', from: 'MOROGORO', to: 'DAR' },
]

export const IMAGE_FILES = [
  'WhatsApp Image 2026-04-23 at 11.49.56(1).jpeg',
  'WhatsApp Image 2026-04-23 at 11.49.56.jpeg',
  'WhatsApp Image 2026-04-23 at 11.49.57.jpeg',
  'WhatsApp Image 2026-04-23 at 11.49.58(1).jpeg',
  'WhatsApp Image 2026-04-23 at 11.49.58(2).jpeg',
  'WhatsApp Image 2026-04-23 at 11.49.58.jpeg',
  'WhatsApp Image 2026-04-23 at 11.49.59(1).jpeg',
  'WhatsApp Image 2026-04-23 at 11.49.59.jpeg',
  'WhatsApp Image 2026-04-23 at 11.50.00(1).jpeg',
  'WhatsApp Image 2026-04-23 at 11.50.00(2).jpeg',
  'WhatsApp Image 2026-04-23 at 11.50.00.jpeg',
  'WhatsApp Image 2026-04-23 at 11.50.01(1).jpeg',
  'WhatsApp Image 2026-04-23 at 11.50.01.jpeg',
]

export const IMAGE_URLS = IMAGE_FILES.map(
  (file) => `/images/${encodeURIComponent(file)}`,
)

export const WHATSAPP_LINK = 'https://wa.me/255683300100'

export const locationLabelByValue = LOCATIONS.reduce((acc, location) => {
  acc[location.value] = location.label
  return acc
}, {})
