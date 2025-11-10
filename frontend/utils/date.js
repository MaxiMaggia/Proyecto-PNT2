// Utils de fecha para reusar en AddPet y otros formularios que usen DateTimePicker.
export const parseISOtoDate = (iso) => {
    // Traduce cadenas ISO provenientes del backend usado por `PetsContext`.
    try { return iso ? new Date(iso) : null; } catch { return null; }
  };
  
  export const formatDateDDMMYYYY = (d) => {
    // Formatea la fecha seleccionada para mostrarse en inputs de la UI.
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  