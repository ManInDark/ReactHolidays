import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ListHolidays from './CalendarApi'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ListHolidays />
  </StrictMode>,
)
