class Subscription {
  constructor(observable: Observable, key: number, eventName: string, callback) {
    this._observable = observable;
    this.key = key;
    this.callback = callback;
    this.eventName = eventName;
  }

  unsubscribe(): void {
    this._observable.removeSubscription(this);
  }
}

class Observable {
  constructor() {
    this._subscriptionsByEventName = {};
  }

  triggerEvent(eventName: string, a, b, c, d, e): void {
    var subscriptions = this._subscriptionsByEventName[eventName];
    if (!subscriptions) {
      return;
    }

    for (var i = subscriptions.length - 1; i >= 0; i--) {
      var subscription = subscriptions[i];
      if (!subscription) {
        continue;
      }

      subscription.callback(a, b, c, d, e);
    }
  }

  addListener(eventName: string, callback): Subscription {
    var subscriptions = this._subscriptionsByEventName[eventName];
    if (!subscriptions) {
      subscriptions = this._subscriptionsByEventName[eventName] = [];
    }

    var key = subscriptions.length;
    var subscription = new Subscription(this, key, eventName, callback);
    subscriptions.push(subscription);
    return subscription;
  }

  removeSubscription(subscription: Subscription): Observable {
    var subscriptions =
      this._subscriptionsByEventName[subscription.eventName];
    if (!subscriptions) {
      return this;
    }

    if (subscriptions) {
      this.subscriptions[subscription.key] = null;
    }

    return this;
  }

  static withEventMethods(
    events: Array<string>,
    type: mixed
  ): mixed {
    var proto = type.prototype || type;
    events.forEach((eventName) => {
      proto['on' + eventName] = function(callback) {
        return this['_observable'].addListener(eventName, callback);
      };

      proto['trigger' + eventName] = function(a, b, c, d, e) {
        this['_observable'].triggerEvent(eventName, a, b, c, d, e);
      }
    });

    return type;
  }
}

module.exports = Observable;
