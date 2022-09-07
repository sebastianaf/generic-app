const errorCodes = {
  OK: {
    code: 10000,
    title: `La autenticación es correcta`,
    description: `El Token coincide es válido para comunicarse con la API REST`,
  },
  BAD_USER_OR_PASSWORD: {
    code: 10010,
    title: `Error de autenticación`,
    description: `El nombre de usuario o la contraseña no son correctos`,
  },
  DB_NOT_FOUND: {
    code: 10020,
    title: `Elemento no encontrado`,
    description: `El elemento no fue encontrado, posiblemente nunca existió o ya ha sido eliminado`,
  },
  DB_DUPLICADE: {
    code: 10030,
    title: `Elemento duplicado`,
    description: `No puede crear un elemento que tenga los mismos atributos de uno existente`,
  },
  SERVER_ERROR: {
    code: 10040,
    title: `Error del servidor`,
    description: `El servidor falló al procesar la solicitud, el motivo es desconocido`,
  },
  BAD_TOKEN: {
    code: 10050,
    title: `Token inválido`,
    description: `Los datos enviados del token no son válidos`,
  },
  UNAUTHORIZED: {
    code: 10060,
    title: `No autenticado`,
    description: `Su solicitud no puede ser respondida porque no está autenticado`,
  },
  FORBIDDEN: {
    code: 10070,
    title: `No autorizado`,
    description: `La solicitud no pudo ser respondida porque no tiene permiso para acceder a este recurso`,
  },
};

export default errorCodes;
