module NgSham {
  export namespace decorators {
    export function Component (partialCDO) {
      return function (target) {

        if (partialCDO.selector)
          target.prototype.selector = partialCDO.selector;

        if (partialCDO.properties)
          target.prototype.properties = partialCDO.properties;

        if (partialCDO.events)
          target.prototype.events = partialCDO.events;

        if (partialCDO.host)
          target.prototype.host = partialCDO.host;

        return target;
      }
    }
  }
}