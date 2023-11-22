import { makeAutoObservable } from 'mobx';
import { Engine, LocalStorageProvider } from '@montagix/engine';

class EngineStore {
  engine: Engine = new Engine({
    resolution: [1080,1920],
    storageProvider: new LocalStorageProvider(),
    backgroundColor: 'linear-gradient(180deg, #5E5E73 0%, #3C3B53 100%)',
  });

  constructor() {
    makeAutoObservable(this);
  }

  getEngine() {
    return this.engine;
  }
}

export default new EngineStore();
