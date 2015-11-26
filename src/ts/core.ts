/// <reference path="./component/component.1.3.ts"/>
/// <reference path="./component/component.1.4.ts"/>
/// <reference path="./component/component.1.5.ts"/>
/// <reference path="./component/component.2.alpha.ts"/>
/// <reference path="./component/component.legacy.ts"/>

namespace NgSham {

  class NgShamFactory {

    private static _instance: NgShamFactory = new NgShamFactory();

    private config: ShamConfigObject;
    private componentCreator: ComponentCreators;

    constructor () {
      if (NgShamFactory._instance) throw new Error('Singleton!');
      NgShamFactory._instance = this;
    }

    public static getInstance (): NgShamFactory {
      return NgShamFactory._instance;
    }

    /**
     * [configure description]
     * @param {ShamConfigObject} config [description]
     */
    public configure (config: ShamConfigObject): void {
      this.config = config;
      this.componentCreator = new ComponentCreators[
        typeof this.config.forceUseComponentCreator === 'string'
        ? this.config.forceUseComponentCreator
        : this.version()
      ](this.config.appName, this.config.componentsDir);
    }

    public getComponentCreator (): ComponentCreators {
      if (!this.componentCreator) throw new Error('Run NgSham.configure() first!');
      return this.componentCreator;
    }

    public shim (config: ShamConfigObject) {
      this.configure(config);
      return this.componentCreator.component;
    }

    public getConfig (): ShamConfigObject {
      return this.config;
    }

    public bootstrap (controller) {
      if (!this.hasComponentAnnotations(controller)) return;
      var CDO: ShamCDO = this.annotations2CDO(controller);
      this.componentCreator.component(CDO);
    }

    private hasComponentAnnotations (controller): boolean {
      return !!Reflect.getMetadataKeys(controller);
    }

    private annotations2CDO (controller): ShamCDO {
      var
      keys = Reflect.getMetadataKeys(controller),
      CDO: ShamCDO;
      _.each(keys, function () {
        // Somehow make it work...
      });
      return CDO;
    }

    private version (): string {
           if (!this.config.angularVersion && window.angular) this.config.angularVersion = window.angular.version;
           if (this.config.angularVersion >  1.5) return 'ComponentTwoAlpha'
      else if (this.config.angularVersion == 1.5) return 'ComponentOneFive'
      else if (this.config.angularVersion >= 1.4) return 'ComponentOneFour'
      else if (this.config.angularVersion >= 1.3) return 'ComponentOneThree'
      else
        throw new Error('Angular versions less than 1.3 are not supported.');
    }
  }
}
