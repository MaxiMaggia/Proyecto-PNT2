// Utils de fecha para reusar en AddPet.
export const parseISOtoDate = (iso) => {
    try { return iso ? new Date(iso) : null; } catch { return null; }
  };
  
  export const formatDateDDMMYYYY = (d) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  