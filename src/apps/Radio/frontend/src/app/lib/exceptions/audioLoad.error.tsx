export default class AudioLoadError extends Error {
      constructor(message = 'Error cargando esta radio') {
            super(message)
            this.name = 'Audio Load Error'
      }
}
