const REQUIRED_ENV_VARS = ['VITE_API_URL'];

export const validateEnv = (): void => {
  const missingVars = REQUIRED_ENV_VARS.filter((envVar) => !import.meta.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `❌ ERROR: Las siguientes variables de entorno están faltando en Vite: ${missingVars.join(
        ', '
      )}`
    );
  }

  console.log('✅ Todas las variables de entorno requeridas en Vite están configuradas correctamente.');
};