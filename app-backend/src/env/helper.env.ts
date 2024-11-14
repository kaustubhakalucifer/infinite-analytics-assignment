/**
 * @description Fetch the environment variable from process.env and return that variable.
 * Throw an error if that variable is not set in the current environment
 * @param variableName - Environment variable that needs to be checked
 */
export function getOsEnvironment(variableName: string): string {
  if (process.env[variableName] === undefined) {
    throw new Error(`Environment variable ${variableName} is not set!`);
  }
  return process.env[variableName];
}
