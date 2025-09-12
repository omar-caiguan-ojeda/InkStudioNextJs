// CAMBIOS NECESARIOS PARA BookingForm.tsx
// Eliminar el recuadro de "AVISOS IMPORTANTES" en el paso 14 (último paso)

// 1. BUSCAR Y ELIMINAR este bloque en el paso 14:
/*
<div className="important-notices">
  <h4>⚠️ AVISOS IMPORTANTES:</h4>
  <ul>
    <li>Se requiere un depósito no reembolsable para asegurar su reserva</li>
    <li>Las citas requieren un aviso mínimo de 48 horas para su reprogramación</li>
    <li>Debes tener 18 años o más para hacerte un tatuaje</li>
  </ul>
</div>
*/

// 2. BUSCAR Y REEMPLAZAR la sección de checkboxes del paso 13:

// ANTES (ubicar este código):
/*
<div className="terms-container">
  <div className="checkbox-group">
    <label className={`checkbox-label ${validationErrors.isAdult ? 'error' : ''}`}>
      <input
        type="checkbox"
        checked={formData.isAdult}
        onChange={(e) => setFormData(prev => ({ ...prev, isAdult: e.target.checked }))}
      />
      <span className="checkmark"></span>
      Tengo 18 años o más
    </label>
    
    <label className={`checkbox-label ${validationErrors.acceptedTerms ? 'error' : ''}`}>
      <input
        type="checkbox"
        checked={formData.acceptedTerms}
        onChange={(e) => setFormData(prev => ({ ...prev, acceptedTerms: e.target.checked }))}
      />
      <span className="checkmark"></span>
      He leído y acepto los <a href="https://inkstudio.protoly.lat/terminos" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
    </label>
    
    <label className={`checkbox-label ${validationErrors.acceptedPrivacy ? 'error' : ''}`}>
      <input
        type="checkbox"
        checked={formData.acceptedPrivacy}
        onChange={(e) => setFormData(prev => ({ ...prev, acceptedPrivacy: e.target.checked }))}
      />
      <span className="checkmark"></span>
      He leído y acepto la <a href="https://inkstudio.protoly.lat/privacidad" target="_blank" rel="noopener noreferrer">política de privacidad</a>
    </label>
  </div>
</div>
*/

// DESPUÉS (reemplazar por este código mejorado):
<div className="terms-container">
  <div className="checkbox-group">
    <label className={`checkbox-label ${validationErrors.isAdult ? 'error' : ''}`}>
      <input
        type="checkbox"
        checked={formData.isAdult}
        onChange={(e) => setFormData(prev => ({ ...prev, isAdult: e.target.checked }))}
      />
      <span className="checkmark"></span>
      <span>Tengo 18 años o más</span>
    </label>
    
    <label className={`checkbox-label ${validationErrors.acceptedTerms ? 'error' : ''}`}>
      <input
        type="checkbox"
        checked={formData.acceptedTerms}
        onChange={(e) => setFormData(prev => ({ ...prev, acceptedTerms: e.target.checked }))}
      />
      <span className="checkmark"></span>
      <span>He leído y acepto los <a href="https://inkstudio.protoly.lat/terminos" target="_blank" rel="noopener noreferrer">términos y condiciones</a></span>
    </label>
    
    <label className={`checkbox-label ${validationErrors.acceptedPrivacy ? 'error' : ''}`}>
      <input
        type="checkbox"
        checked={formData.acceptedPrivacy}
        onChange={(e) => setFormData(prev => ({ ...prev, acceptedPrivacy: e.target.checked }))}
      />
      <span className="checkmark"></span>
      <span>He leído y acepto la <a href="https://inkstudio.protoly.lat/privacidad" target="_blank" rel="noopener noreferrer">política de privacidad</a></span>
    </label>
  </div>
</div>

// 3. ASEGURAR QUE NO HAYA más referencias a la clase .important-notices en el paso 14

// RESUMEN DE CAMBIOS:
// ✅ Eliminado el recuadro de "AVISOS IMPORTANTES" redundante
// ✅ Mejorada la alineación de checkboxes a la izquierda
// ✅ Reducido el espaciado entre checkboxes (de 24px a 12px)
// ✅ Agregado <span> para mejor estructura del texto