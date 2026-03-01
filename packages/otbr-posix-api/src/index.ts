export interface paths {
  readonly "/api/node": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Read border router device item of this node.
     * @description Shortcut into the *Devices* collection returning the `threadBorderRouter` item representing this Thread Border Router.
     *
     *     Failing to parse the query parameter(s) leads to a 400 Bad Request Error.
     *
     *     Failing to populate any of the dynamic attributes may lead to a 500 Internal Server Error.
     */
    readonly get: operations["getNodeInformation"];
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/api/actions": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Read Actions collection.
     * @description *Actions* collection with items of the following *Task* types:
     *     - `discoverThreadNetworksTask` **TODO**
     *     - `addThreadDeviceTask`
     *     - `getNetworkDiagnosticTask`
     *     - `resetNetworkDiagCounterTask`
     *     - `getEnergyScanTask`
     *     - `updateDeviceCollectionTask`
     *
     *     The items contain all the attributes as given by a client in a POST request (values are not changed, except for timeout which counts down).
     *     The items contain at least two additional server-added attributes (`id` and `status`); while the `id` must not change once assigned, the other server-added attributes may change according to the *Task* state.
     *
     *     Failing to parse the query parameter(s) leads to a 400 Bad Request Error.
     */
    readonly get: operations["listActions"];
    readonly put?: never;
    /**
     * Add task(s) to the Actions collection.
     * @description Input to add one or more *Task* items to the *Actions* collection (in other words, enqueue).
     *
     *     ## Condition
     *     - requires all items in the list to be valid *Task* items with all required attributes;
     *       otherwise rejects whole list and returns 422 Conflict.
     *     - requires the *Actions* collection to have free memory slots to enqueue the new items;
     *       completed, stopped, or failed items in the collection may be removed (oldest first);
     *       otherwise,
     *         - if number of items send by client exceeds maximum number of items in collection, rejects whole list and returns 409 Conflict
     *         - else if not enough items can be freed, rejects whole list and returns 503 Service Unavailable
     *
     *     ## On Success
     *     - enqueues the tasks given in the `data` array
     *     - each *Task* item is given a unique `id`
     *     - each *Task* item is given a `status` attribute that is initialized with `pending`
     *     - returns 200 OK listing all items enqueued with ID and status
     *
     *     ## On Failure
     *     Returns one of the following:
     *     - 409 Conflict, when the request contains more items than the maximum total number of items for the collection
     *     - 415 Unsupported Media Type, when the request content type is not `application/vnd.api+json`, TODO: allow `application/json` or empty (tolerant server)
     *     - 422 Unprocessable Content, when invalid items are included or required task-specific attributes are missing
     *     - 503 Service Unavailable, when no more items can be enqueued (but the number of items in the request does not exceed the maximum)
     *
     *     ## General Background Logic (amended by task-specific background logic)
     *     - when a *Task* item is executed, its `status` attribute changes to `active`
     *     - when a *Task* item completes successfully, its `status` attribute changes to `completed`
     *     - when a *Task* item completes unsuccessfully, its `status` attribute changes to `stopped`
     *     - when a *Task* item fails, its `status` attribute changes to `failed`
     */
    readonly post: operations["invokeAction"];
    /**
     * Stop and remove all tasks from the queue of actions.
     * @description Removes all Tasks.
     */
    readonly delete: operations["deleteActions"];
    /**
     * List of allowed operations.
     * @description Lists allowed operations.
     */
    readonly options: operations["optionsActions"];
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/api/actions/{actionId}": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Read Actions item
     * @description *Task* item in the *Actions* collection selected by its `id`.
     *
     *     ## Condition
     *     Requires a *Task* item with the given `id` to exist;
     *     otherwise returns 404 Not Found.
     */
    readonly get: operations["getAction"];
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/api/devices": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Read Devices collection
     * @description *Devices* collection with at least the `threadBorderRouter` item representing the Thread Border Router.
     *
     *     ## Background Logic
     *     A `updateDeviceCollectionTask` posted on api/actions triggers an update of this resource.
     *     For updateing the resource, it performs a procedure similar to the `ot-ctl meshdiag topology` CLI command:
     *     - for each router, query the following Diagnostic TLVs using multicast and unicast retries:
     *         - TLV 0: MAC Extended Address (64-bit)
     *         - TLV 1: MAC Address (16-bit)
     *         - TLV 8: IPv6 Address List
     *         - TLV 24: Version
     *         - TLV 29: Child
     *         - TLV 30: Child IPv6 Address List
     *     - look up hostname and services instance name for each SRP-registered IPv6 address
     *     - augment local data for the local `threadBorderRouter` item
     *     - generate `threadDevice` or `threadBorderRouter` items based on the TLV and networkData
     *
     *     On GET request, the collection is returned, with following attributes for each device:
     *     - extAddress
     *     - mlEidIid
     *     - mode
     *     - omrIpv6Address
     *     - eui64 (optional)
     *     - hostname
     *     - role
     *     - created
     *     - updated (optional)
     *
     *     And additional attributes for this *threadBorderRouter* item:
     *     - rloc16
     *     - extPanId
     *     - networkName
     *     - routerId (optional)
     *     - leaderData
     *     - routerCount
     *     - rlocAddress
     *     - baId
     */
    readonly get: operations["listDevices"];
    readonly put?: never;
    readonly post?: never;
    /**
     * Delete Devices collection
     * @description Removes all *threadDevice* items from the *Devices* collection.
     */
    readonly delete: operations["deleteDevices"];
    /**
     * List of allowed operations.
     * @description Lists allowed operations.
     */
    readonly options: operations["optionsDevices"];
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/api/devices/{deviceId}": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Read Devices item
     * @description *threadDevice* item in the *Devices* collection selected by its `id`.
     *
     *     ## Condition
     *     Requires a *threadDevice* item with the given `id` to exist;
     *     otherwise returns 404 Not Found.
     */
    readonly get: operations["getDevice"];
    readonly put?: never;
    readonly post?: never;
    /**
     * Delete Devices item
     * @description Removes a *threadDevice* item from the *Devices* collection.
     *     Requires a *threadDevice* item with the given `id` to exist;
     *     otherwise returns 404 Not Found.
     */
    readonly delete: operations["deleteDevice"];
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/api/diagnostics": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * List Diagnostics collection.
     * @description *Diagnostics* collection with up to **TODO** items of the following *Diagnostic* types:
     *     - `threadNetworkDiscovery` **TODO**
     *     - `threadNetworkDiagnostic`
     *     - `threadEnergyScanReport`
     *
     *     ## Background Logic
     *     - when a new item is added, old items may be removed (oldest first) to free enough memory
     *     - all *Diagnostic* items are created through their corresponding *Task*
     */
    readonly get: operations["listDiagnostics"];
    readonly put?: never;
    readonly post?: never;
    /**
     * Delete Diagnostics collection
     * @description Removes all *diagnostics* items from the *Diagnostics* collection.
     */
    readonly delete: operations["deleteDiagnostics"];
    /**
     * List of allowed operations.
     * @description Lists allowed operations.
     */
    readonly options: operations["optionsDiagnostics"];
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/api/diagnostics/{diagnosticsId}": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Diagnostic item.
     * @description *Diagnostic* item in the *Diagnostics* collection selected by its `id`.
     *
     *     ## Condition
     *     Requires a *Diagnostic* item with the given `id` to exist;
     *     otherwise returns 404 Not Found.
     */
    readonly get: operations["getDiagnostic"];
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Get current active node parameters
     * @description Redirects to the current active node parameters, same as api/node.
     */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            /** @description Response Content-Type */
            readonly "Content-Type"?:
              | "application/json"
              | "application/vnd.api+json";
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json":
              | readonly Record<string, never>[]
              | Record<string, never>;
            readonly "application/vnd.api+json": Record<string, never>;
          };
        };
        readonly 415: components["responses"]["UnsupportedMediaTypeError"];
      };
    };
    readonly put?: never;
    readonly post?: never;
    /** Erase all persistent information, essentially factory reset the Border Router. */
    readonly delete: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Success without content in response. */
        readonly 204: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Thread interface is in wrong state. */
        readonly 409: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/ba-id": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Get the border agent ID */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/rloc": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Routing Locator IPv6 address of this Thread node. */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/rloc16": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Routing Locator Router and Child ID (RLOC16).
     * @description Last 16-bit of the Routing Locator IPv6 consisting of the Router ID and a Child ID.
     */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": number;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/ext-address": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** IEEE 802.15.4 Extended Address (EUI-64). */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/state": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Get current Thread state.
     * @description State describing the current Thread role of this Thread node.
     *     - disabled: The Thread stack is disabled.
     *     - detached: Not currently participating in a Thread network/partition.
     *     - child: The Thread Child role.
     *     - router: The Thread Router role.
     *     - leader: The Thread Leader role.
     */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    /**
     * Set current Thread state.
     * @description Enable and disable the Thread protocol operation. If network interface
     *     hasn't been started yet, it will get started automatically.
     */
    readonly put: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      /** @description New Thread state */
      readonly requestBody?: {
        readonly content: {
          readonly "application/json": string;
        };
      };
      readonly responses: {
        /** @description Successful operation. */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        readonly 400: components["responses"]["BadRequestError"];
        readonly 409: components["responses"]["ConflictError"];
        readonly 500: components["responses"]["InternalServerError"];
      };
    };
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/network-name": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Thread network name this node is part of. */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/leader-data": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Gets the network's leader data. */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": components["schemas"]["LeaderData"];
          };
        };
        readonly 500: components["responses"]["InternalServerError"];
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/ext-panid": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Extended PAN ID. */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/num-of-router": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Get number of router devices */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": number;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/dataset/active": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Get current active operational dataset */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Returns currently active operational dataset */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": components["schemas"]["ActiveDataset"];
            readonly "text/plain": components["schemas"]["DatasetTlv"];
          };
        };
        /** @description No active operational dataset */
        readonly 204: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    /**
     * Creates or updates the active operational dataset
     * @description Creates or updates the the active operational dataset on the current node. Only allowed if the Thread node
     *     is inactive. If the Thread node is active, a pending dataset should be used to update the current active
     *     operational dataset.
     */
    readonly put: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      /**
       * @description Operational dataset that will be stored as active operational dataset. Supports request body Content-Type
       *     `text/plain` (dataset in TLV format as hex string) or `application/json` (dataset in JSON format). In both
       *     cases keys which are not set will be initialized with defaults.
       */
      readonly requestBody?: {
        readonly content: {
          readonly "application/json": components["schemas"]["ActiveDataset"];
          readonly "plain/text": components["schemas"]["DatasetTlv"];
        };
      };
      readonly responses: {
        /** @description Successfully updated the active operational dataset. */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Successfully created the active operational dataset. */
        readonly 201: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Invalid request body. */
        readonly 400: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Writing active operational dataset rejected because Thread network is active. */
        readonly 409: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        readonly 500: components["responses"]["InternalServerError"];
      };
    };
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/dataset/pending": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Get current pending operational dataset */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Returns currently pending operational dataset */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": components["schemas"]["PendingDataset"];
            readonly "text/plain": components["schemas"]["DatasetTlv"];
          };
        };
        /** @description No pending operational dataset */
        readonly 204: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    /**
     * Creates or updates the pending operational dataset
     * @description Creates or updates the the pending operational dataset on the current node. Delay needs to be set to let
     *     the pending dataset apply as active dataset in the near future.
     */
    readonly put: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      /**
       * @description Operational dataset that will be stored as pending operational dataset. Supports request body Content-Type
       *     `text/plain` (dataset in TLV format as hex string) or `application/json` (dataset in JSON format). In both
       *     cases keys which are not set will be initialized with defaults.
       */
      readonly requestBody?: {
        readonly content: {
          readonly "application/json": components["schemas"]["PendingDataset"];
          readonly "text/plain": components["schemas"]["DatasetTlv"];
        };
      };
      readonly responses: {
        /** @description Successfully updated the pending operational dataset. */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Successfully created the pending operational dataset. */
        readonly 201: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Invalid request body. */
        readonly 400: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        readonly 500: components["responses"]["InternalServerError"];
      };
    };
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/commissioner/state": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Get current Commissioner state.
     * @description State describing the current Commissioner role of this Thread node.
     *     - disabled
     *     - petitioning
     *     - active
     */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    /**
     * Set current Commissioner state.
     * @description Enable or disable the Commissioner.
     */
    readonly put: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      /** @description New Commissioner state */
      readonly requestBody?: {
        readonly content: {
          readonly "application/json": string;
        };
      };
      readonly responses: {
        /** @description Successful operation. */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        readonly 400: components["responses"]["BadRequestError"];
        /** @description Cannot set commissioner state because border router state is not active */
        readonly 409: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        readonly 500: components["responses"]["InternalServerError"];
      };
    };
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/commissioner/joiner": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /** Get current joiner data */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Returns an array of currently active joiners */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": readonly components["schemas"]["JoinerData"][];
          };
        };
      };
    };
    readonly put?: never;
    /** Adds a new joiner */
    readonly post: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: {
        readonly content: {
          readonly "application/json": components["schemas"]["JoinerData"];
        };
      };
      readonly responses: {
        /** @description Successfully added joiner. */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Invalid request body. */
        readonly 400: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Adding joiner rejected because commissioner is not active. */
        readonly 409: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Number of joiners the commissioner supports is full and the new one cannot be added. */
        readonly 507: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    /** Removes a joiner from the node */
    readonly delete: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: {
        readonly content: {
          readonly "application/json": string;
        };
      };
      readonly responses: {
        /** @description Successfully removed joiner. */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Joiner not found. */
        readonly 204: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Invalid request body. */
        readonly 400: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
        /** @description request rejected because commissioner is not active. */
        readonly 409: {
          headers: {
            readonly [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
  readonly "/node/coprocessor/version": {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    /**
     * Get the coprocessor firmware version
     * @description Retrieves the NCP or RCP coprocessor firmware version string.
     */
    readonly get: {
      readonly parameters: {
        readonly query?: never;
        readonly header?: never;
        readonly path?: never;
        readonly cookie?: never;
      };
      readonly requestBody?: never;
      readonly responses: {
        /** @description Successful operation */
        readonly 200: {
          headers: {
            readonly [name: string]: unknown;
          };
          content: {
            readonly "application/json": string;
          };
        };
      };
    };
    readonly put?: never;
    readonly post?: never;
    readonly delete?: never;
    readonly options?: never;
    readonly head?: never;
    readonly patch?: never;
    readonly trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    readonly Actions_addThreadDeviceTask: {
      /** @enum {unknown} */
      readonly type?: "addThreadDeviceTask";
      readonly attributes?:
        | components["schemas"]["Actions_JoinerDataEui"]
        | components["schemas"]["Actions_JoinerDataDiscerner"]
        | components["schemas"]["Actions_JoinerDataJoinerId"];
    };
    readonly Actions_JoinerDataEui: {
      readonly pskd: components["schemas"]["pskd"];
      /**
       * @description A string of the EUI-64, mutually exclusive with `joinerId` and `discerner`.
       * @example 0123456789abcdef
       */
      readonly eui: string;
      /**
       * @description Timeout in seconds
       * @default 900
       */
      readonly timeout: number;
    };
    readonly Actions_JoinerDataDiscerner: {
      readonly pskd: components["schemas"]["pskd"];
      /**
       * @description A discerner in the form of the discerner hex value (optionally with leading 0x)
       *     and bit length separated by a '/'.
       *     Field is mutually exclusive with `joinerId` and `eui`.
       * @example 0xabc/12
       */
      readonly discerner: string;
      /**
       * @description Timeout in seconds
       * @default 900
       */
      readonly timeout: number;
    };
    readonly Actions_JoinerDataJoinerId: {
      readonly pskd: components["schemas"]["pskd"];
      /**
       * @description A string of the EUI-64, Discerner, or "*", mutually exclusive with `eui` and `discerner`.
       * @default *
       */
      readonly joinerId: string;
      /**
       * @description Timeout in seconds
       * @default 900
       */
      readonly timeout: number;
    };
    /**
     * @description Accepts the value of a `deviceId` (equal to 'ExtendedAddress'), `rloc16` or `mlEidIid`. The TBR expands the given destination to
     *     the Mesh-Local IPv6 address or Rloc16 address. `deviceId` must be a member of *Devices* collection where it is looked-up
     *     to find the ML-EID IID, which is then expanded to the Mesh-Local IPv6 address.
     *     A ML-EID IID needs additional attribute `destinationType`:'mleid'.
     */
    readonly Actions_destination:
      | components["schemas"]["LongAddr"]
      | components["schemas"]["ShortAddr"]
      | components["schemas"]["MlEidIid"];
    readonly Actions_getNetworkDiagnosticTask: {
      /** @enum {unknown} */
      readonly type?: "getNetworkDiagnosticTask";
      readonly attributes?: {
        readonly destination?: components["schemas"]["Actions_destination"];
        readonly types?: [
          (
            | number
            | (
                | "extAddress"
                | "rloc16"
                | "mode"
                | "childTimeout"
                | "connectivity"
                | "route64"
                | "leaderData"
                | "networkData"
                | "ipv6Addresses"
                | "macCounters"
                | "batteryLevel"
                | "supplyVoltage"
                | "childTable"
                | "channelPages"
                | "maxChildTimeout"
                | "eui64"
                | "version"
                | "vendorName"
                | "vendorModel"
                | "vendorVersion"
                | "threadStackVersion"
                | "children"
                | "childIpv6Addresses"
                | "routerNeighbors"
                | "mleCounters"
              )
          ),
          ...(
            | number
            | (
                | "extAddress"
                | "rloc16"
                | "mode"
                | "childTimeout"
                | "connectivity"
                | "route64"
                | "leaderData"
                | "networkData"
                | "ipv6Addresses"
                | "macCounters"
                | "batteryLevel"
                | "supplyVoltage"
                | "childTable"
                | "channelPages"
                | "maxChildTimeout"
                | "eui64"
                | "version"
                | "vendorName"
                | "vendorModel"
                | "vendorVersion"
                | "threadStackVersion"
                | "children"
                | "childIpv6Addresses"
                | "routerNeighbors"
                | "mleCounters"
              )
          )[],
        ];
        readonly timeout?: number;
      };
    };
    readonly Actions_resetNetworkDiagCounterTask: {
      /** @enum {unknown} */
      readonly type?: "resetNetworkDiagCounterTask";
      readonly attributes?: {
        readonly destination?: components["schemas"]["Actions_destination"];
        /**
         * @default [
         *       "macCounters",
         *       "mleCounters"
         *     ]
         */
        readonly types: readonly (number | ("macCounters" | "mleCounters"))[];
        /** @default 93 */
        readonly timeout: number;
      };
    };
    readonly Actions_getEnergyScanTask: {
      /** @enum {unknown} */
      readonly type?: "getEnergyScanTask";
      readonly attributes?: {
        readonly destination?: components["schemas"]["Actions_destination"];
        /**
         * @default [
         *       11,
         *       12,
         *       13,
         *       14,
         *       15,
         *       16,
         *       17,
         *       18,
         *       19,
         *       20,
         *       21,
         *       22,
         *       23,
         *       24,
         *       25,
         *       26
         *     ]
         */
        readonly channelMask: readonly components["schemas"]["Channel"][];
        /**
         * @description Number of *IEEE 802.15.4 ED Scans* per channel.
         * @default 1
         */
        readonly count: number;
        /**
         * @description Period between successive IEEE 802.15.4 ED Scans* (milliseconds).
         * @default 32
         */
        readonly period: number;
        /**
         * @description IEEE 802.15.4 ScanDuration to use when performing an *IEEE 802.15.4 ED Scan* (milliseconds).
         * @default 0
         */
        readonly scanDuration: number;
        /** @description calculated default: (len(channelMask) * count * (scanDuration + period) + 500 + 1000) / 1000 + 93 */
        readonly timeout?: number;
      };
    };
    readonly Actions_updateDeviceCollectionTask: {
      /** @enum {unknown} */
      readonly type?: "updateDeviceCollectionTask";
      readonly attributes?: {
        /**
         * @description Maximum age in seconds for device information to be considered valid.
         * @default 30
         */
        readonly maxAge: number;
        /**
         * @description Maximum number of retries for device discovery or update.
         * @default 5
         */
        readonly maxRetries: number;
        /**
         * @description Number of devices to discover or update in the collection. Usually equal to the number of devices in the Thread network.
         * @default 10
         */
        readonly deviceCount: number;
        /**
         * @description Timeout in seconds for the update device collection task.
         * @default 93
         */
        readonly timeout: number;
      };
    };
    readonly ActionsClient: {
      readonly data: [
        (
          | components["schemas"]["ActionsClient_addThreadDeviceTask"]
          | components["schemas"]["ActionsClient_getNetworkDiagnosticTask"]
          | components["schemas"]["ActionsClient_resetNetworkDiagCounterTask"]
          | components["schemas"]["ActionsClient_getEnergyScanTask"]
          | components["schemas"]["ActionsClient_updateDeviceCollectionTask"]
        ),
        ...(
          | components["schemas"]["ActionsClient_addThreadDeviceTask"]
          | components["schemas"]["ActionsClient_getNetworkDiagnosticTask"]
          | components["schemas"]["ActionsClient_resetNetworkDiagCounterTask"]
          | components["schemas"]["ActionsClient_getEnergyScanTask"]
          | components["schemas"]["ActionsClient_updateDeviceCollectionTask"]
        )[],
      ];
      readonly additionalProperties?: never;
    };
    readonly ActionsClient_addThreadDeviceTask: components["schemas"]["Actions_addThreadDeviceTask"] &
      Record<string, never>;
    readonly ActionsClient_getNetworkDiagnosticTask: components["schemas"]["Actions_getNetworkDiagnosticTask"] & {
      readonly attributes: Record<string, never>;
      readonly additionalProperties?: never;
    };
    readonly ActionsClient_resetNetworkDiagCounterTask: components["schemas"]["Actions_resetNetworkDiagCounterTask"] & {
      readonly attributes: Record<string, never>;
      readonly additionalProperties?: never;
    };
    readonly ActionsClient_getEnergyScanTask: components["schemas"]["Actions_getEnergyScanTask"] & {
      readonly attributes: Record<string, never>;
      readonly additionalProperties?: never;
    };
    readonly ActionsClient_updateDeviceCollectionTask: components["schemas"]["Actions_updateDeviceCollectionTask"] & {
      readonly attributes: Record<string, never>;
      readonly additionalProperties?: never;
    };
    readonly Meta: {
      /** @description Collection pagination metadata. */
      readonly collection: {
        /**
         * @description Number of items skipped in the response (related to `page[offset]` query parameter, `page[offset]` not implemented).
         * @default 0
         */
        readonly offset: number;
        /** @description Number of items included in the response, starting from offset; calculated default equal to total (related to `page[limit]` query parameter, `page[limit]` not implemented) or max collection items supported. */
        readonly limit: number;
        /** @description Total number of items in the collection. */
        readonly total: number;
        /** @description Number of pending items in the collection, only for *Actions* collection. */
        readonly pending?: number;
      };
    };
    readonly ActionsCollection: {
      readonly meta: components["schemas"]["Meta"];
      readonly data: readonly (
        | components["schemas"]["ActionsServer_addThreadDeviceTask"]
        | components["schemas"]["ActionsServer_getNetworkDiagnosticTask"]
        | components["schemas"]["ActionsServer_resetNetworkDiagCounterTask"]
        | components["schemas"]["ActionsServer_getEnergyScanTask"]
        | components["schemas"]["ActionsServer_updateDeviceCollectionTask"]
      )[];
    };
    readonly ActionItem: {
      readonly data:
        | components["schemas"]["ActionsServer_addThreadDeviceTask"]
        | components["schemas"]["ActionsServer_getNetworkDiagnosticTask"]
        | components["schemas"]["ActionsServer_resetNetworkDiagCounterTask"]
        | components["schemas"]["ActionsServer_getEnergyScanTask"]
        | components["schemas"]["ActionsServer_updateDeviceCollectionTask"];
    };
    readonly ActionsServer: {
      /** Format: uuid */
      readonly id: string;
      readonly type: string;
      readonly attributes: {
        /** @enum {string} */
        readonly status:
          | "pending"
          | "active"
          | "completed"
          | "stopped"
          | "failed"
          | "undiscovered"
          | "attempted";
      };
    };
    readonly ActionsServer_addThreadDeviceTask: components["schemas"]["ActionsServer"] &
      components["schemas"]["Actions_addThreadDeviceTask"] & {
        readonly attributes?: Record<string, never>;
      };
    readonly ActionsServer_getNetworkDiagnosticTask: components["schemas"]["ActionsServer"] &
      components["schemas"]["Actions_getNetworkDiagnosticTask"] & {
        readonly attributes?: Record<string, never>;
      };
    readonly ActionsServer_resetNetworkDiagCounterTask: components["schemas"]["ActionsServer"] &
      components["schemas"]["Actions_resetNetworkDiagCounterTask"] & {
        readonly attributes?: Record<string, never>;
      };
    readonly ActionsServer_getEnergyScanTask: components["schemas"]["ActionsServer"] &
      components["schemas"]["Actions_getEnergyScanTask"] & {
        readonly attributes?: Record<string, never>;
      };
    readonly ActionsServer_updateDeviceCollectionTask: components["schemas"]["ActionsServer"] &
      components["schemas"]["Actions_updateDeviceCollectionTask"] & {
        readonly attributes?: Record<string, never>;
      };
    /**
     * @description Array of error items, included in the JSON:API `errors` member.
     *     Each error item should correspond to RFC 7807.
     *     It may contain additional information such as:
     *     - a JSON:API `links` member, pointing to absolute/ relative URL with error details
     *     - a vendor specific information
     */
    readonly Errors: {
      readonly errors?: readonly components["schemas"]["SimpleError"][];
    };
    readonly SimpleError: unknown;
    /** @description Rloc16 address, formated as hex-string with leading '0x' */
    readonly ShortAddr: string;
    /** @description Extended address. */
    readonly LongAddr: string;
    /** @description The ML-EID Interface Identifier. */
    readonly MlEidIid: string;
    /**
     * @description Joining device's pre-shared key
     * @example J01NME
     */
    readonly pskd: string;
    readonly Channel: number;
    readonly LeaderData: {
      /**
       * Format: uint32
       * @description Partition ID
       * @example 1230046604
       */
      readonly partitionId?: number;
      /**
       * Format: uint8
       * @description Leader Weight
       * @example 64
       */
      readonly weighting?: number;
      /**
       * @description Full network data version
       * @example 244
       */
      readonly dataVersion?: number;
      /**
       * Format: uint8
       * @description Stable Network Data Version
       * @example 186
       */
      readonly stableDataVersion?: number;
      /**
       * Format: uint8
       * @description Leader Router ID
       * @example 4
       */
      readonly leaderRouterId?: number;
    };
    readonly ActiveDataset: {
      readonly activeTimestamp?: components["schemas"]["Timestamp"];
      /**
       * @description Network key, 16 bytes long, formatted as a hexadecimal string
       * @default random
       * @example 08277229F21FB7342D705D3CEFDC042A
       */
      readonly networkKey: string;
      /**
       * @description Network name, 16 bytes long
       * @default OpenThread-<PanId>
       * @example OpenThread-e445
       */
      readonly networkName: string;
      /**
       * @description Extended PAN ID, 8 bytes long, formatted as a hexadecimal string
       * @default random
       * @example 996D3BEE320097A3
       */
      readonly extPanId: string;
      /**
       * @description Mesh local IPv6 prefix
       * @default random
       * @example fd33:d3b9:89e3:72e4::/64
       */
      readonly meshLocalPrefix: string;
      /**
       * Format: uint16
       * @description IEEE 802.15.4 PAN ID of the Thread network
       * @default random
       * @example 58437
       */
      readonly panId: number;
      /**
       * Format: uint16
       * @description IEEE 802.15.4 channel of the Thread network
       * @default random
       * @example 21
       */
      readonly channel: number;
      /**
       * @description The pre-shared commissioner key
       * @default random
       * @example FD943ECA225A28979B991EFAC1218A72
       */
      readonly pskc: string;
      readonly securityPolicy?: components["schemas"]["SecurityPolicy"];
      /**
       * Format: uint32
       * @description Channel mask
       * @default 134215680
       * @example 134215680
       */
      readonly channelMask: number;
    };
    readonly PendingDataset: {
      readonly activeDataset?:
        | components["schemas"]["ActiveDataset"]
        | components["schemas"]["DatasetTlv"];
      readonly PendingTimestamp?: components["schemas"]["Timestamp"];
      /**
       * Format: uint32
       * @description Delay timer in milliseconds
       * @default not set
       * @example 30000
       */
      readonly delay: number;
    };
    readonly SecurityPolicy: {
      /**
       * Format: uint16
       * @description Thread key rotation time in hours
       * @default 672
       * @example 672
       */
      readonly rotationTime: number;
      /**
       * @description Obtaining the Network Key for out-of-band commissioning is enabled
       * @default true
       * @example true
       */
      readonly obtainNetworkKey: boolean;
      /**
       * @description Native Commissioning using PSKc is allowed
       * @default true
       * @example true
       */
      readonly nativeCommissioning: boolean;
      /**
       * @description Thread 1.0/1.1.x Routers are enabled
       * @default true
       * @example true
       */
      readonly routers: boolean;
      /**
       * @description External Commissioner authentication is allowed
       * @default true
       * @example true
       */
      readonly externalCommissioning: boolean;
      /**
       * @description Commercial Commissioning is enabled
       * @default false
       * @example false
       */
      readonly commercialCommissioning: boolean;
      /**
       * @description Autonomous Enrollment is enabled
       * @default false
       * @example false
       */
      readonly autonomousEnrollment: boolean;
      /**
       * @description Network Key Provisioning is enabled
       * @default false
       * @example false
       */
      readonly networkKeyProvisioning: boolean;
      /**
       * @description ToBLE link is enabled
       * @default false
       * @example false
       */
      readonly tobleLink: boolean;
      /**
       * @description Non-CCM Routers enabled
       * @default false
       * @example false
       */
      readonly nonCcmRouters: boolean;
    };
    readonly Timestamp: {
      /**
       * Format: uint64
       * @description Timestamp seconds
       * @default 1
       * @example 10
       */
      readonly seconds: number;
      /**
       * Format: uint16
       * @description Timestamp ticks
       * @default 0
       * @example 0
       */
      readonly ticks: number;
      /**
       * @default false
       * @example false
       */
      readonly authoritative: boolean;
    };
    /**
     * @description Operational dataset as hex-encoded TLVs.
     * @example 0E080000000000010000000300000F35060004001FFFE0020811111111222222220708FDAD70BFE5AA15DD051000112233445566778899AABBCCDDEEFF030E4F70656E54687265616444656D6F010212340410445F2B5CA6F2A93A55CE570A70EFEECB0C0402A0F7F8
     */
    readonly DatasetTlv: string;
    readonly JoinerData: {
      readonly pskd?: components["schemas"]["pskd"];
      /**
       * @description A string of the EUI-64, Discerner, or "*", mutually exclusive with Eui64 and Discerner
       * @default *
       * @example 0xabc/12
       */
      readonly joinerId: string;
      /**
       * @description A string of the EUI-64, mutually exclusive with JoinerId and Discerner
       * @example 0123456789abcdef
       */
      readonly eui64?: string;
      /**
       * @description A discerner in the form of the discerner hex value (optionally with leading 0x)
       *     and bit length separated by a '/'.
       *     Field is mutually exclusive with JoinerId and Eui64.
       * @example 0xabc/12
       */
      readonly discerner?: string;
      /**
       * @description Joiner expiration time in milliseconds on response and seconds on request
       * @default 60
       */
      readonly timeout: number;
    };
  };
  responses: {
    /**
     * @description The client sent an invalid request.
     *     The client SHOULD perform action(s) to provide valid syntax before retrying the request.
     */
    readonly BadRequestError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Bad Request",
         *       "status": 400
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Bad Request",
         *           "status": 400,
         *           "detail": "The client sent an invalid request."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The client requested a target resource that does not exist.
     *     The client SHOULD perform action(s) to re-align with the API or re-synchronize application state before retrying the request.
     */
    readonly NotFoundError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Not Found",
         *       "status": 404
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Not Found",
         *           "status": 404,
         *           "detail": "The client requested a target resource that does not exist."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The client used a method that is not supported by the target resource.
     *     The client SHOULD perform action(s) to re-align with the API before retrying the request.
     */
    readonly MethodNotAllowedError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Method Not Allowed",
         *       "status": 405
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Method Not Allowed",
         *           "status": 405,
         *           "detail": "The client used a method that is not supported by the target resource."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The client requests a content-type that is not supported by the target resource.
     *     The client SHOULD perform action(s) to re-align with the API before retrying the request.
     */
    readonly NotAcceptableError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Not Acceptable",
         *       "status": 406,
         *       "detail": "Supported media types: application/json, application/vnd.api+json"
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Not Acceptable",
         *           "status": 406,
         *           "detail": "Supported media types: application/json, application/vnd.api+json"
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The client request took too long to process.
     *     The client SHOULD perform action(s) validate correctness of the request and retry the validated request after a longer period of time.
     */
    readonly RequestTimeout: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Request Timeout",
         *       "status": 408
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Request Timeout",
         *           "status": 408,
         *           "detail": "The client request took too long to process."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The request conflicts with the current state of the target resource;
     *     either the request body cannot be applied to the resource state or the resource state cannot satisfy the request.
     *     The client SHOULD perform action(s) to re-synchronize application state before retrying the request.
     */
    readonly ConflictError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Conflict",
         *       "status": 409
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Conflict",
         *           "status": 409,
         *           "detail": "The request conflicts with the current state of the target resource."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The client sent a request body in an unsupported format.
     *     The client SHOULD change the request body format before retrying the request.
     */
    readonly UnsupportedMediaTypeError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Unsupported Media Type",
         *       "status": 415
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Unsupported Media Type",
         *           "status": 415,
         *           "detail": "The client sent a request body in an unsupported format."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The server understands the content type of the request body correct, but was unable to process the contained information.
     *     The client SHOULD perform action(s) to correct the request body before retrying the request.
     */
    readonly UnprocessableError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Unprocessable Content",
         *       "status": 422
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Unprocessable Content",
         *           "status": 422,
         *           "detail": "The request body could not be processed."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The server encountered an unexpected error.
     *     The client SHOULD retry after a longer period of time.
     */
    readonly InternalServerError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Internal Server Error",
         *       "status": 500
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Internal Server Error",
         *           "status": 500,
         *           "detail": "Unexpected error."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
    /**
     * @description The server is not ready to handle the request.
     *     The client SHOULD retry after a short period of time.
     */
    readonly ServiceUnavailableError: {
      headers: {
        readonly [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "title": "Service Unavailable",
         *       "status": 503
         *     }
         */
        readonly "application/json": components["schemas"]["SimpleError"];
        /**
         * @example {
         *       "errors": [
         *         {
         *           "title": "Service Unavailable",
         *           "status": 503,
         *           "detail": "The server is not ready to handle the request."
         *         }
         *       ]
         *     }
         */
        readonly "application/vnd.api+json": components["schemas"]["Errors"];
      };
    };
  };
  parameters: {
    /** @description Must be set to `application/vnd.api+json` or `application/json` */
    readonly AcceptJsonApi: "application/json" | "application/vnd.api+json";
    /** @description ID of the requested Action item (Task). */
    readonly actionId: string;
    /** @description ID of the requested Device item. */
    readonly deviceId: string;
    /** @description ID of the requested Diagnostic item. */
    readonly diagnosticsId: string;
    /**
     * @description A selector that allows clients to request a subset of items of the given type only:
     *     - with all attributes, for example, `fields[addThreadDeviceTask]` or `fields[{type}]` in general
     *     - with selected attributes only ("Sparse Fieldset"), `fields[nodeDevice]=vendorModel,operationalDataset.active.channel` or `fields[{type}]={attributeKey}(,{attributeKey})*` in general
     *
     *     ## Condition
     *     The `{type}` must be given (in other words, not empty).
     *     The value of the parameter must be fully omitted (in other words, no `=` in query) or contain one or more type-specific `{attributeKey}`s in a comma-separated list.
     *     An `{attributeKey}` may use the dot notation to select a subordinate field of the attribute.
     *
     *     Allowed characters for `{type}` and `{attributeKey}` are alphanumeric characters, underscores (`_`), hyphens (`-`), and dots (`.`) for nested fields. Commas (`,`) are used as separators.
     *     Allowed character set (regex): `^[A-Za-z0-9_.\-\,]+$`
     *
     *     ## Examples
     *     - `?fields[threadDevice]=hostname,role`
     *     - `?fields[addThreadDeviceTask]=eui,pskd&fields[threadDevice]=hostname`
     *     - `?fields[threadDevice]` (all attributes for threadDevice)
     */
    readonly SparseFieldset: {
      readonly type?: [
        | "threadDevice"
        | "threadBorderRouter"
        | "networkDiagnostics"
        | "energyReport"
        | "addThreadDeviceTask"
        | "getNetworkDiagnosticTask"
        | "resetNetworkDiagCounterTask"
        | "getEnergyScanTask"
        | "updateDeviceCollectionTask",
      ];
    };
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  readonly getNodeInformation: {
    readonly parameters: {
      readonly query?: {
        /**
         * @description A selector that allows clients to request a subset of items of the given type only:
         *     - with all attributes, for example, `fields[addThreadDeviceTask]` or `fields[{type}]` in general
         *     - with selected attributes only ("Sparse Fieldset"), `fields[nodeDevice]=vendorModel,operationalDataset.active.channel` or `fields[{type}]={attributeKey}(,{attributeKey})*` in general
         *
         *     ## Condition
         *     The `{type}` must be given (in other words, not empty).
         *     The value of the parameter must be fully omitted (in other words, no `=` in query) or contain one or more type-specific `{attributeKey}`s in a comma-separated list.
         *     An `{attributeKey}` may use the dot notation to select a subordinate field of the attribute.
         *
         *     Allowed characters for `{type}` and `{attributeKey}` are alphanumeric characters, underscores (`_`), hyphens (`-`), and dots (`.`) for nested fields. Commas (`,`) are used as separators.
         *     Allowed character set (regex): `^[A-Za-z0-9_.\-\,]+$`
         *
         *     ## Examples
         *     - `?fields[threadDevice]=hostname,role`
         *     - `?fields[addThreadDeviceTask]=eui,pskd&fields[threadDevice]=hostname`
         *     - `?fields[threadDevice]` (all attributes for threadDevice)
         */
        readonly fields?: components["parameters"]["SparseFieldset"];
      };
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description (JSON:API) document with a single `data` object of type `device` representing the Thread Border Router. */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?:
            | "application/json"
            | "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          readonly "application/json": Record<string, never>;
          readonly "application/vnd.api+json": unknown;
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 404: components["responses"]["NotFoundError"];
      readonly 406: components["responses"]["NotAcceptableError"];
    };
  };
  readonly listActions: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description List of actions. */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?:
            | "application/json"
            | "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          readonly "application/json":
            | readonly Record<string, never>[]
            | Record<string, never>;
          /**
           * @example {
           *       "data": [
           *         {
           *           "id": "9ecae480-07a0-4b72-869d-15858196144e",
           *           "type": "addThreadDeviceTask",
           *           "attributes": {
           *             "eui": "fedcba9876543210",
           *             "pskd": "J01NME",
           *             "timeout": 888,
           *             "status": "undiscovered",
           *             "created": "2025-02-26T15:51:06+02:00"
           *           }
           *         },
           *         {
           *           "id": "9ecae480-07a0-4b72-869d-15858196144f",
           *           "type": "addThreadDeviceTask",
           *           "attributes": {
           *             "eui": "fedcba9876543211",
           *             "pskd": "J01NME",
           *             "timeout": 333,
           *             "status": "attempted",
           *             "created": "2025-02-26T15:52:06+02:00"
           *           }
           *         },
           *         {
           *           "id": "99f61f7f-8862-4c36-b565-1cb7ce5f89ee",
           *           "type": "getNetworkDiagnosticTask",
           *           "attributes": {
           *             "destination": "f2f307043724e8d0,",
           *             "types": [
           *               "extAddress",
           *               "rloc16",
           *               "route",
           *               "leaderData",
           *               "ipv6Addresses",
           *               "macCounters",
           *               "childTable",
           *               "eui64",
           *               "version",
           *               "vendorName",
           *               "vendorModel",
           *               "vendorSwVersion",
           *               "threadStackVersion",
           *               "children",
           *               "childIpv6Addresses",
           *               "routerNeighbors",
           *               "mleCounters"
           *             ],
           *             "status": "completed",
           *             "created": "2025-02-26T15:53:06+02:00"
           *           },
           *           "relationships": {
           *             "result": {
           *               "data": {
           *                 "type": "diagnostics",
           *                 "id": "a6a0b433-437e-45bf-9994-58e0d7b32399"
           *               }
           *             }
           *           }
           *         }
           *       ],
           *       "meta": {
           *         "collection": {
           *           "offset": 0,
           *           "limit": 3,
           *           "total": 3,
           *           "pending": 2
           *         }
           *       }
           *     }
           */
          readonly "application/vnd.api+json": components["schemas"]["ActionsCollection"];
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 406: components["responses"]["NotAcceptableError"];
    };
  };
  readonly invokeAction: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path?: never;
      readonly cookie?: never;
    };
    /** @description Creates a new task. */
    readonly requestBody: {
      readonly content: {
        readonly "application/vnd.api+json": components["schemas"]["ActionsClient"];
      };
    };
    readonly responses: {
      /** @description Task accepted and queue for execution. */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?: "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          /**
           * @example {
           *       "data": [
           *         {
           *           "id": "9ecae480-07a0-4b72-869d-15858196144f",
           *           "type": "addThreadDeviceTask",
           *           "attributes": {
           *             "eui": "fedcba9876543210",
           *             "pskd": "J01NME",
           *             "timeout": 900,
           *             "status": "pending"
           *           }
           *         }
           *       ]
           *     }
           */
          readonly "application/vnd.api+json": Record<string, never>;
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 408: components["responses"]["RequestTimeout"];
      readonly 409: components["responses"]["ConflictError"];
      readonly 415: components["responses"]["UnsupportedMediaTypeError"];
      readonly 422: components["responses"]["UnprocessableError"];
      readonly 500: components["responses"]["InternalServerError"];
      readonly 503: components["responses"]["ServiceUnavailableError"];
    };
  };
  readonly deleteActions: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description Task(s) deleted. */
      readonly 204: {
        headers: {
          readonly [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  readonly optionsActions: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description List of allowed operations. */
      readonly 204: {
        headers: {
          /** @description Allowed operations */
          readonly Allow?: string;
          readonly [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  readonly getAction: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path: {
        /** @description ID of the requested Action item (Task). */
        readonly actionId: components["parameters"]["actionId"];
      };
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description (JSON:API) document with a single `data` object representing the selected *Task* item. */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?:
            | "application/json"
            | "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          readonly "application/json":
            | readonly Record<string, never>[]
            | Record<string, never>;
          readonly "application/vnd.api+json": components["schemas"]["ActionItem"];
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 404: components["responses"]["NotFoundError"];
      readonly 406: components["responses"]["NotAcceptableError"];
    };
  };
  readonly listDevices: {
    readonly parameters: {
      readonly query?: {
        /**
         * @description A selector that allows clients to request a subset of items of the given type only:
         *     - with all attributes, for example, `fields[addThreadDeviceTask]` or `fields[{type}]` in general
         *     - with selected attributes only ("Sparse Fieldset"), `fields[nodeDevice]=vendorModel,operationalDataset.active.channel` or `fields[{type}]={attributeKey}(,{attributeKey})*` in general
         *
         *     ## Condition
         *     The `{type}` must be given (in other words, not empty).
         *     The value of the parameter must be fully omitted (in other words, no `=` in query) or contain one or more type-specific `{attributeKey}`s in a comma-separated list.
         *     An `{attributeKey}` may use the dot notation to select a subordinate field of the attribute.
         *
         *     Allowed characters for `{type}` and `{attributeKey}` are alphanumeric characters, underscores (`_`), hyphens (`-`), and dots (`.`) for nested fields. Commas (`,`) are used as separators.
         *     Allowed character set (regex): `^[A-Za-z0-9_.\-\,]+$`
         *
         *     ## Examples
         *     - `?fields[threadDevice]=hostname,role`
         *     - `?fields[addThreadDeviceTask]=eui,pskd&fields[threadDevice]=hostname`
         *     - `?fields[threadDevice]` (all attributes for threadDevice)
         */
        readonly fields?: components["parameters"]["SparseFieldset"];
      };
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description (JSON:API) document with one or more `data` objects representing *threadDevice* items. */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?:
            | "application/json"
            | "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          readonly "application/json":
            | readonly Record<string, never>[]
            | Record<string, never>;
          readonly "application/vnd.api+json": unknown;
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 404: components["responses"]["NotFoundError"];
      readonly 406: components["responses"]["NotAcceptableError"];
    };
  };
  readonly deleteDevices: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description Devices collection deleted. */
      readonly 204: {
        headers: {
          readonly [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  readonly optionsDevices: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description List of allowed operations. */
      readonly 204: {
        headers: {
          /** @description Allowed operations */
          readonly Allow?: string;
          readonly [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  readonly getDevice: {
    readonly parameters: {
      readonly query?: {
        /**
         * @description A selector that allows clients to request a subset of items of the given type only:
         *     - with all attributes, for example, `fields[addThreadDeviceTask]` or `fields[{type}]` in general
         *     - with selected attributes only ("Sparse Fieldset"), `fields[nodeDevice]=vendorModel,operationalDataset.active.channel` or `fields[{type}]={attributeKey}(,{attributeKey})*` in general
         *
         *     ## Condition
         *     The `{type}` must be given (in other words, not empty).
         *     The value of the parameter must be fully omitted (in other words, no `=` in query) or contain one or more type-specific `{attributeKey}`s in a comma-separated list.
         *     An `{attributeKey}` may use the dot notation to select a subordinate field of the attribute.
         *
         *     Allowed characters for `{type}` and `{attributeKey}` are alphanumeric characters, underscores (`_`), hyphens (`-`), and dots (`.`) for nested fields. Commas (`,`) are used as separators.
         *     Allowed character set (regex): `^[A-Za-z0-9_.\-\,]+$`
         *
         *     ## Examples
         *     - `?fields[threadDevice]=hostname,role`
         *     - `?fields[addThreadDeviceTask]=eui,pskd&fields[threadDevice]=hostname`
         *     - `?fields[threadDevice]` (all attributes for threadDevice)
         */
        readonly fields?: components["parameters"]["SparseFieldset"];
      };
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path: {
        /** @description ID of the requested Device item. */
        readonly deviceId: components["parameters"]["deviceId"];
      };
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description (JSON:API) document with a single `data` object representing the selected *threadDevice* item. */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?:
            | "application/json"
            | "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          readonly "application/json":
            | readonly Record<string, never>[]
            | Record<string, never>;
          readonly "application/vnd.api+json": unknown;
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 404: components["responses"]["NotFoundError"];
      readonly 406: components["responses"]["NotAcceptableError"];
    };
  };
  readonly deleteDevice: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path: {
        /** @description ID of the requested Device item. */
        readonly deviceId: components["parameters"]["deviceId"];
      };
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description Device item deleted. */
      readonly 204: {
        headers: {
          readonly [name: string]: unknown;
        };
        content?: never;
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 404: components["responses"]["NotFoundError"];
    };
  };
  readonly listDiagnostics: {
    readonly parameters: {
      readonly query?: {
        /**
         * @description A selector that allows clients to request a subset of items of the given type only:
         *     - with all attributes, for example, `fields[addThreadDeviceTask]` or `fields[{type}]` in general
         *     - with selected attributes only ("Sparse Fieldset"), `fields[nodeDevice]=vendorModel,operationalDataset.active.channel` or `fields[{type}]={attributeKey}(,{attributeKey})*` in general
         *
         *     ## Condition
         *     The `{type}` must be given (in other words, not empty).
         *     The value of the parameter must be fully omitted (in other words, no `=` in query) or contain one or more type-specific `{attributeKey}`s in a comma-separated list.
         *     An `{attributeKey}` may use the dot notation to select a subordinate field of the attribute.
         *
         *     Allowed characters for `{type}` and `{attributeKey}` are alphanumeric characters, underscores (`_`), hyphens (`-`), and dots (`.`) for nested fields. Commas (`,`) are used as separators.
         *     Allowed character set (regex): `^[A-Za-z0-9_.\-\,]+$`
         *
         *     ## Examples
         *     - `?fields[threadDevice]=hostname,role`
         *     - `?fields[addThreadDeviceTask]=eui,pskd&fields[threadDevice]=hostname`
         *     - `?fields[threadDevice]` (all attributes for threadDevice)
         */
        readonly fields?: components["parameters"]["SparseFieldset"];
      };
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /**
       * @description (JSON:API) document with with up to TODO `data` objects representing *Diagnostic* items that must have the following members:
       *     - `id`: unique diagnostic ID assigned by the server
       *     - `type` diagnostic type (see *Schema*)
       *     - `attributes`: diagnostic-specific attributes (see *Schema*)
       */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?:
            | "application/json"
            | "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          readonly "application/json":
            | readonly Record<string, never>[]
            | Record<string, never>;
          readonly "application/vnd.api+json": unknown;
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 406: components["responses"]["NotAcceptableError"];
      readonly 500: components["responses"]["InternalServerError"];
    };
  };
  readonly deleteDiagnostics: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description Diagnostics collection deleted. */
      readonly 204: {
        headers: {
          readonly [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  readonly optionsDiagnostics: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: never;
      readonly path?: never;
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description List of allowed operations. */
      readonly 204: {
        headers: {
          /** @description Allowed operations */
          readonly Allow?: string;
          readonly [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  readonly getDiagnostic: {
    readonly parameters: {
      readonly query?: never;
      readonly header?: {
        /** @description Must be set to `application/vnd.api+json` or `application/json` */
        readonly Accept?: components["parameters"]["AcceptJsonApi"];
      };
      readonly path: {
        /** @description ID of the requested Diagnostic item. */
        readonly diagnosticsId: components["parameters"]["diagnosticsId"];
      };
      readonly cookie?: never;
    };
    readonly requestBody?: never;
    readonly responses: {
      /** @description (JSON:API) document with a single `data` object representing the selected *Diagnostic* item. */
      readonly 200: {
        headers: {
          /** @description Response Content-Type */
          readonly "Content-Type"?:
            | "application/json"
            | "application/vnd.api+json";
          readonly [name: string]: unknown;
        };
        content: {
          readonly "application/json":
            | readonly Record<string, never>[]
            | Record<string, never>;
          readonly "application/vnd.api+json": unknown;
        };
      };
      readonly 400: components["responses"]["BadRequestError"];
      readonly 404: components["responses"]["NotFoundError"];
      readonly 406: components["responses"]["NotAcceptableError"];
    };
  };
}

// Generated from: 'https://raw.githubusercontent.com/openthread/ot-br-posix/3e5478aa9f2a29336ee0187f7c5294d5b875fc6d/src/rest/openapi.yaml' in 'https://github.com/openthread/ot-br-posix'
// prettier-ignore
export const openApiSpec: any = {"openapi":"3.0.3","info":{"title":"Swagger OpenThread REST API","description":"This describes the OpenThread Border Router REST API. The API is provided by the otbr-agent, if the cmake flag `OTBR_REST=ON` is set. By default\nthe REST API listens on any address on port 8081.\n\nSome useful links:\n- [OpenThread Border Router repository](github.com/openthread/ot-br-posix/)","license":{"name":"BSD 3-Clause","url":"https://github.com/openthread/ot-br-posix/blob/main/LICENSE"},"version":"0.3.0"},"servers":[{"url":"http://localhost:8081"}],"tags":[{"name":"Actions","description":"Task queue."},{"name":"node","description":"Thread parameters of this node."},{"name":"Devices","description":"Collection of discovered Thread devices."},{"name":"Diagnostics","description":"Collection of Thread network diagnostic responses."}],"paths":{"/api/node":{"get":{"operationId":"getNodeInformation","tags":["node"],"summary":"Read border router device item of this node.","description":"Shortcut into the *Devices* collection returning the `threadBorderRouter` item representing this Thread Border Router.\n\nFailing to parse the query parameter(s) leads to a 400 Bad Request Error.\n\nFailing to populate any of the dynamic attributes may lead to a 500 Internal Server Error.\n","parameters":[{"$ref":"#/components/parameters/AcceptJsonApi"},{"$ref":"#/components/parameters/SparseFieldset"}],"responses":{"200":{"description":"(JSON:API) document with a single `data` object of type `device` representing the Thread Border Router.\n","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"type":"object"},"examples":{"TBR":{"summary":"Thread Border Router","value":{"rloc16":"0xf000","extAddress":"96518e5497d5b9f3","mlEidIid":"731f529f1266a17d","omrIpv6Address":["fd11:22:0:0:92de:b397:5758:368"],"hostname":"knx-00fd5f0123a5.local","eui":"9035eafffef3e09c","role":"leader","mode":{"deviceTypeFTD":false,"rxOnWhenIdle":false,"fullNetworkData":false},"baId":"e11e23c164311ce642f93297b095b2f8","routerCount":0,"rlocAddress":"fd7a:9882:1777:a344:0:ff:fe00:f000","networkName":"OpenThread-1234","routerId":0,"leaderData":{"partitionId":0,"weighting":193,"dataVersion":97,"stableDataVersion":176,"leaderRouterId":78},"extPanId":"a7b7d5d07d9ec2fa"}}}},"application/vnd.api+json":{"examples":{"TBR":{"summary":"Thread Border Router","value":{"data":{"id":"96518e5497d5b9f3","type":"threadBorderRouter","attributes":{"rloc16":"0xf000","extAddress":"96518e5497d5b9f3","mlEidIid":"731f529f1266a17d","omrIpv6Address":["fd11:22:0:0:92de:b397:5758:368"],"hostname":"knx-00fd5f0123a5.local","eui":"9035eafffef3e09c","role":"leader","mode":{"deviceTypeFTD":false,"rxOnWhenIdle":false,"fullNetworkData":false},"baId":"e11e23c164311ce642f93297b095b2f8","routerCount":0,"rlocAddress":"fd7a:9882:1777:a344:0:ff:fe00:f000","networkName":"OpenThread-1234","routerId":0,"leaderData":{"partitionId":0,"weighting":193,"dataVersion":97,"stableDataVersion":176,"leaderRouterId":78},"extPanId":"a7b7d5d07d9ec2fa","created":"2025-02-25T17:31:54+02:00"}}}}}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"404":{"$ref":"#/components/responses/NotFoundError"},"406":{"$ref":"#/components/responses/NotAcceptableError"}}}},"/api/actions":{"get":{"operationId":"listActions","tags":["Actions"],"summary":"Read Actions collection.","description":"*Actions* collection with items of the following *Task* types:\n- `discoverThreadNetworksTask` **TODO**\n- `addThreadDeviceTask` \n- `getNetworkDiagnosticTask`\n- `resetNetworkDiagCounterTask`\n- `getEnergyScanTask`\n- `updateDeviceCollectionTask`\n\nThe items contain all the attributes as given by a client in a POST request (values are not changed, except for timeout which counts down).\nThe items contain at least two additional server-added attributes (`id` and `status`); while the `id` must not change once assigned, the other server-added attributes may change according to the *Task* state.\n\nFailing to parse the query parameter(s) leads to a 400 Bad Request Error.\n","parameters":[{"$ref":"#/components/parameters/AcceptJsonApi"}],"responses":{"200":{"description":"List of actions.","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"oneOf":[{"type":"array","items":{"type":"object"}},{"type":"object"}]}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/ActionsCollection"},"example":{"data":[{"id":"9ecae480-07a0-4b72-869d-15858196144e","type":"addThreadDeviceTask","attributes":{"eui":"fedcba9876543210","pskd":"J01NME","timeout":888,"status":"undiscovered","created":"2025-02-26T15:51:06+02:00"}},{"id":"9ecae480-07a0-4b72-869d-15858196144f","type":"addThreadDeviceTask","attributes":{"eui":"fedcba9876543211","pskd":"J01NME","timeout":333,"status":"attempted","created":"2025-02-26T15:52:06+02:00"}},{"id":"99f61f7f-8862-4c36-b565-1cb7ce5f89ee","type":"getNetworkDiagnosticTask","attributes":{"destination":"f2f307043724e8d0,","types":["extAddress","rloc16","route","leaderData","ipv6Addresses","macCounters","childTable","eui64","version","vendorName","vendorModel","vendorSwVersion","threadStackVersion","children","childIpv6Addresses","routerNeighbors","mleCounters"],"status":"completed","created":"2025-02-26T15:53:06+02:00"},"relationships":{"result":{"data":{"type":"diagnostics","id":"a6a0b433-437e-45bf-9994-58e0d7b32399"}}}}],"meta":{"collection":{"offset":0,"limit":3,"total":3,"pending":2}}}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"406":{"$ref":"#/components/responses/NotAcceptableError"}}},"post":{"operationId":"invokeAction","tags":["Actions"],"summary":"Add task(s) to the Actions collection.","description":"Input to add one or more *Task* items to the *Actions* collection (in other words, enqueue).\n\n## Condition\n- requires all items in the list to be valid *Task* items with all required attributes;\n  otherwise rejects whole list and returns 422 Conflict.\n- requires the *Actions* collection to have free memory slots to enqueue the new items;\n  completed, stopped, or failed items in the collection may be removed (oldest first);\n  otherwise,\n    - if number of items send by client exceeds maximum number of items in collection, rejects whole list and returns 409 Conflict\n    - else if not enough items can be freed, rejects whole list and returns 503 Service Unavailable\n\n## On Success\n- enqueues the tasks given in the `data` array\n- each *Task* item is given a unique `id`\n- each *Task* item is given a `status` attribute that is initialized with `pending`\n- returns 200 OK listing all items enqueued with ID and status\n\n## On Failure\nReturns one of the following:\n- 409 Conflict, when the request contains more items than the maximum total number of items for the collection\n- 415 Unsupported Media Type, when the request content type is not `application/vnd.api+json`, TODO: allow `application/json` or empty (tolerant server)\n- 422 Unprocessable Content, when invalid items are included or required task-specific attributes are missing\n- 503 Service Unavailable, when no more items can be enqueued (but the number of items in the request does not exceed the maximum)\n\n## General Background Logic (amended by task-specific background logic)\n- when a *Task* item is executed, its `status` attribute changes to `active`\n- when a *Task* item completes successfully, its `status` attribute changes to `completed`\n- when a *Task* item completes unsuccessfully, its `status` attribute changes to `stopped`\n- when a *Task* item fails, its `status` attribute changes to `failed`\n","parameters":[{"$ref":"#/components/parameters/AcceptJsonApi"}],"requestBody":{"description":"Creates a new task.","required":true,"content":{"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/ActionsClient"},"examples":{"addThreadDeviceTask":{"summary":"Add new Thread Device to the Network","description":"### Background Logic\n- when the task status becomes `active`:\n  - the *On-Mesh Commissioner* is started, if not already running\n  - the given *EUI-64*, *Joining Device Credential (pskd)*, and timeout are added to the *Commissioner Joiner Table*\n  - the task status is updated to `undiscovered`, before first attempts from *Joiner*, and `attempted` waiting for retries from *Joiner*\n- when the identified *Joiner* successfully joins the network, the task completes successfully by:\n  - stopping the *On-Mesh Commissioner*, if it is the last active `addThreadDeviceTask`\n  - setting the task status to `completed`\n- when the task times out without any *Joiner* attempts, the task status is set to `stopped`\n- when an error occurs, the task status is set to `failed`\n","value":{"data":[{"type":"addThreadDeviceTask","attributes":{"eui":"fedcba9876543210","pskd":"J01NME","timeout":900}}]}},"getNetworkDiagnosticTask":{"summary":"Get Thread Network Diagnostic","description":"The `destination` should be the Device item ID (deviceId), but may also be the ML-EID IID when additional attribute destinationType is given.\n*TODO*: It defaults to the TBR as destination.\n\n*TODO*: If `types` is omitted or empty, the following default values are included:\n- `extAddress`\n- `rloc16`\n- `macCounters`\n- `mleCounters`\n\nIf `timeout` is omitted, the value defaults to 93 seconds (suitable only for Rx-On-While-Idle devices).\n\n### Background Logic\n- when the task is enqueued, missing `destination`, `types`, and `timeout` attributes are added using the default values defined in the schema\n- when the task status becomes `active`, the TBR sends a *Get Diagnostics Request* (`DIAG_GET.req`, Section 10.11.2.1) to the destination\n  - deviceId and ML-EID IID destinations are internally converted to IP addresses using the Mesh-Local prefix\n  - the *Type List TLV* contains the TLVs given in the request\n- when a *Get Diagnostics Response* (`DIAG_GET.rsp`, Section 10.11.2.2) is received, the task completes successfully by:\n  - parsing the TLV to a JSON-based `networkDiagnostic` item (*TODO*: unkonwn TLVs are converted to a member with the TLV number as key and a hex-string as value)\n  - making that item available in the *Diagnostics* collection (`/api/diagnostics`) and adding a `relationShips` attribute to the task item referencing the diagnostic item.\n  - setting the task status to `completed`\n- when the *Get Diagnostics Request* (`DIAG_GET.req`) times out, the task status is set to `stopped`\n- when an error is received, the task status is set to `failed`\n","value":{"data":[{"type":"getNetworkDiagnosticTask","attributes":{"destination":"f2f307043724e8d0","types":["extAddress","rloc16","leaderData","ipv6Addresses","macCounters","batteryLevel","supplyVoltage","channelPages","maxChildTimeout","eui64","version","vendorName","vendorModel","vendorSwVersion","threadStackVersion","routerNeighbors","mleCounters"],"timeout":1800}}]}},"getNetworkDiagnosticTask2":{"summary":"Get Thread Network Diagnostic (Example 2)","description":"Example of a `getNetworkDiagnosticTask` with a different set of `types` and `timeout`.\n","value":{"data":[{"type":"getNetworkDiagnosticTask","attributes":{"destination":"f2f307043724e8d0","types":["extAddress","ipv6Addresses","macCounters","eui64","version","vendorName","vendorModel","vendorSwVersion","threadStackVersion","mleCounters"],"timeout":900}}]}},"resetNetworkDiagCounterTask":{"summary":"Reset Thread Diagnostic Counters","description":"The `destination` should be the Device item ID (deviceId), but may also be the ML-EID IID when additional attribute destinationType is given.\n*TODO*: It defaults to the TBR as destination.\n\n*TODO*: If `types` is omitted or empty, the following default values are included:\n- `macCounters`\n- `mleCounters`\n\nIf `timeout` is omitted, the value defaults to 93 seconds (suitable only for Rx-On-While-Idle devices).\n\nSee also <https://github.com/openthread/openthread/blob/main/src/cli/README.md#networkdiagnostic-reset-addr-type->\n\n### Background Logic\n- when the task is enqueued, missing `destination`, `types`, and `timeout` attributes are added using the default values defined in the schema\n- when the task status becomes `active`, the TBR sends a *Reset Diagnostic Notification* (Section 10.11.2.5) to the destination\n  - deviceId and ML-EID IID destinations are internally converted to IP addresses using the Mesh-Local prefix\n  - the *Type List TLV* contains the TLVs given in the request\n- when the reset is confirmed, the task status is set to `completed`\n- when the task times out, the task status is set to `stopped`\n- when an error occurs, the task status is set to `failed`\n","value":{"data":[{"type":"resetNetworkDiagCounterTask","attributes":{"destination":"f2f307043724e8d0","types":["mleCounters"],"timeout":1920}}]}},"getEnergyScanTask":{"summary":"Get Thread Energy Scan","description":"The `destination` should be the Device item ID (deviceId), but may also be the ML-EID IID when additional attribute destinationType is given.\n*TODO*: It defaults to the TBR as destination.\n\n*TODO*: If `channelMask` is omitted, it defaults to all channels.\n\n*TODO*: If `count`, `period`, or `scanDuration` is omitted, they default to `1`, `32` ms, `0` ms, resp.\n\nSee also <https://github.com/openthread/openthread/blob/main/src/cli/README_COMMISSIONER.md#energy>\n\n### Background Logic\n- when the task is enqueued:\n  - missing `destination`, `channelMask`, `count`, `period`, and `scanDuration` attributes are added using the default values defined in the schema\n  - the scan timeout is calculated following the Thread specification (including an transmission delay buffer) and added as `timeout` attribute of the task\n- the commissioner is petitioned until it becomes active to start an *Energy Scan*\n- when the task status becomes `active`, an *Energy Detect Scan Notification* (`MGMT_ED_SCAN.qry`) following the Thread specification is sent to the destination\n  - deviceId and ML-EID IID destinations are internally converted to IP addresses using the Mesh-Local prefix\n- when an *Energy Detect Report Notification* (`MGMT_ED_REPORT.ans`) is received, the task completes successfully by:\n  - parsing the TLV to a JSON-based `energyScanReport` item\n  - making the item available in the *Diagnostics* collection (`/api/diagnostics`) and adding a `relationShips` attribute to the task item referencing the diagnostic item.\n  - setting the task status to `completed`\n- when the *Energy Detect Scan Notification* (`MGMT_ED_SCAN.qry`) times out, the task status is set to `stopped`\n- when an error is received, the task status is set to `failed`\n","value":{"data":[{"type":"getEnergyScanTask","attributes":{"destination":"f2f307043724e8d0","channelMask":[11,12],"count":3,"period":32,"scanDuration":50,"timeout":60}}]}},"updateDeviceCollectionTask":{"summary":"Update Device Collection","description":"Discovers the Thread network and add or updates any responding attached devices in the device collection.\n\n### Background Logic\n- when the task is enqueued:\n  - missing `maxAge`, `maxRetries`, and `timeout` attributes are added using the default values defined in the schema (**TODO**)\n- when the task status becomes `active`, - multicast diagnostic queries are sent to all routers in the Thread network and diagnostic requests are sent to all children\n- when responses from 'deviceCount' devices are received for all requested TLVs, the task completes successfully by:\n  - parsing the TLV to a JSON-based 'threadDevice' item\n  - making the item available in the *Devices* collection (`/api/devices`). An existing item with the same `deviceId` is updated, otherwise a new item is created.\n  - setting the task status to `completed`\n- when the task times out, the task status is set to `stopped`\n- when an error is received, the task status is set to `failed`\n","value":{"data":[{"type":"updateDeviceCollectionTask","attributes":{"maxAge":30,"maxRetries":5,"deviceCount":50,"timeout":60}}]}}}}}},"responses":{"200":{"description":"Task accepted and queue for execution.","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/vnd.api+json"]}}},"content":{"application/vnd.api+json":{"schema":{"type":"object"},"example":{"data":[{"id":"9ecae480-07a0-4b72-869d-15858196144f","type":"addThreadDeviceTask","attributes":{"eui":"fedcba9876543210","pskd":"J01NME","timeout":900,"status":"pending"}}]}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"408":{"$ref":"#/components/responses/RequestTimeout"},"409":{"$ref":"#/components/responses/ConflictError"},"415":{"$ref":"#/components/responses/UnsupportedMediaTypeError"},"422":{"$ref":"#/components/responses/UnprocessableError"},"500":{"$ref":"#/components/responses/InternalServerError"},"503":{"$ref":"#/components/responses/ServiceUnavailableError"}}},"options":{"operationId":"optionsActions","tags":["Actions"],"summary":"List of allowed operations.","description":"Lists allowed operations.\n","responses":{"204":{"description":"List of allowed operations.","headers":{"Allow":{"description":"Allowed operations","schema":{"type":"string","example":"GET, POST, DELETE, OPTIONS"}}}}}},"delete":{"operationId":"deleteActions","tags":["Actions"],"summary":"Stop and remove all tasks from the queue of actions.","description":"Removes all Tasks.\n","responses":{"204":{"description":"Task(s) deleted."}}}},"/api/actions/{actionId}":{"get":{"operationId":"getAction","tags":["Actions"],"summary":"Read Actions item","description":"*Task* item in the *Actions* collection selected by its `id`.\n\n## Condition\nRequires a *Task* item with the given `id` to exist;\notherwise returns 404 Not Found.\n","parameters":[{"$ref":"#/components/parameters/actionId"},{"$ref":"#/components/parameters/AcceptJsonApi"}],"responses":{"200":{"description":"(JSON:API) document with a single `data` object representing the selected *Task* item.\n","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"oneOf":[{"type":"array","items":{"type":"object"}},{"type":"object"}]}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/ActionItem"},"examples":{"addThreadDeviceTask":{"summary":"1211547c-6207-4833-a629-8992ead4068c (Add New Thread Device to Network)","value":{"data":{"id":"1211547c-6207-4833-a629-8992ead4068c","type":"addThreadDeviceTask","attributes":{"eui":"9035EAFFFEF02CA9","pskd":"J01NME","timeout":42,"status":"completed"}}}},"getEnergyScanTaskActive":{"summary":"e8e6a4c4-ee9c-4c84-a2cf-45f02d90501a (Get Thread Energy Scan - active)","value":{"data":{"id":"e8e6a4c4-ee9c-4c84-a2cf-45f02d90501a","type":"getEnergyScanTask","attributes":{"destination":"f2f307043724e8d0","channelMask":[11,12],"count":3,"period":32,"scanDuration":50,"timeout":60,"status":"active"}}}},"getEnergyScanTaskCompleted":{"summary":"e8e6a4c4-ee9c-4c84-a2cf-45f02d90501a (Get Thread Energy Scan - completed)","value":{"data":{"id":"e8e6a4c4-ee9c-4c84-a2cf-45f02d90501a","type":"getEnergyScanTask","attributes":{"destination":"f2f307043724e8d0","channelMask":[11,12],"count":3,"period":32,"scanDuration":50,"timeout":60,"status":"active"},"relationships":{"result":{"data":{"type":"diagnostics","id":"688f881a-b3d5-4261-949c-9c18dfdd7fca"}}}}}}}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"404":{"$ref":"#/components/responses/NotFoundError"},"406":{"$ref":"#/components/responses/NotAcceptableError"}}}},"/api/devices":{"get":{"operationId":"listDevices","summary":"Read Devices collection","description":"*Devices* collection with at least the `threadBorderRouter` item representing the Thread Border Router.\n\n## Background Logic\nA `updateDeviceCollectionTask` posted on api/actions triggers an update of this resource.\nFor updateing the resource, it performs a procedure similar to the `ot-ctl meshdiag topology` CLI command:\n- for each router, query the following Diagnostic TLVs using multicast and unicast retries:\n    - TLV 0: MAC Extended Address (64-bit)\n    - TLV 1: MAC Address (16-bit)\n    - TLV 8: IPv6 Address List\n    - TLV 24: Version\n    - TLV 29: Child\n    - TLV 30: Child IPv6 Address List\n- look up hostname and services instance name for each SRP-registered IPv6 address\n- augment local data for the local `threadBorderRouter` item\n- generate `threadDevice` or `threadBorderRouter` items based on the TLV and networkData\n\nOn GET request, the collection is returned, with following attributes for each device:\n- extAddress\n- mlEidIid \n- mode\n- omrIpv6Address\n- eui64 (optional)\n- hostname \n- role\n- created\n- updated (optional)\n\nAnd additional attributes for this *threadBorderRouter* item:\n- rloc16\n- extPanId\n- networkName\n- routerId (optional)\n- leaderData\n- routerCount\n- rlocAddress\n- baId\n","tags":["Devices"],"parameters":[{"$ref":"#/components/parameters/SparseFieldset"},{"$ref":"#/components/parameters/AcceptJsonApi"}],"responses":{"200":{"description":"(JSON:API) document with one or more `data` objects representing *threadDevice* items.\n","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"oneOf":[{"type":"array","items":{"type":"object"}},{"type":"object"}]}},"application/vnd.api+json":{"examples":{"initial":{"summary":"Initial Collection","value":{"meta":{"collection":{"offset":0,"limit":1,"total":1}},"data":[{"id":"96518e5497d5b9f3","type":"threadBorderRouter","attributes":{"rloc16":"0xf000","extAddress":"96518e5497d5b9f3","mlEidIid":"731f529f1266a17d","omrIpv6Address":["fd11:22:0:0:92de:b397:5758:368"],"hostname":"knx-00fd5f0123a5.local","eui":"9035eafffef3e09c","role":"leader","mode":{"deviceTypeFTD":false,"rxOnWhenIdle":false,"fullNetworkData":false},"baId":"e11e23c164311ce642f93297b095b2f8","routerCount":0,"rlocAddress":"fd7a:9882:1777:a344:0:ff:fe00:f000","networkName":"OpenThread-1234","routerId\"":0,"leaderData":{"partitionId":0,"weighting":193,"dataVersion":97,"stableDataVersion":176,"leaderRouterId":78},"extPanId":"a7b7d5d07d9ec2fa","created":"2025-02-25T17:31:54+02:00"}}]}}}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"404":{"$ref":"#/components/responses/NotFoundError"},"406":{"$ref":"#/components/responses/NotAcceptableError"}}},"options":{"operationId":"optionsDevices","tags":["Devices"],"summary":"List of allowed operations.","description":"Lists allowed operations.\n","responses":{"204":{"description":"List of allowed operations.","headers":{"Allow":{"description":"Allowed operations","schema":{"type":"string","example":"GET, POST, DELETE, OPTIONS"}}}}}},"delete":{"operationId":"deleteDevices","summary":"Delete Devices collection","description":"Removes all *threadDevice* items from the *Devices* collection.\n","tags":["Devices"],"responses":{"204":{"description":"Devices collection deleted."}}}},"/api/devices/{deviceId}":{"get":{"operationId":"getDevice","tags":["Devices"],"summary":"Read Devices item","description":"*threadDevice* item in the *Devices* collection selected by its `id`.\n\n## Condition\nRequires a *threadDevice* item with the given `id` to exist;\notherwise returns 404 Not Found.\n","parameters":[{"$ref":"#/components/parameters/deviceId"},{"$ref":"#/components/parameters/SparseFieldset"},{"$ref":"#/components/parameters/AcceptJsonApi"}],"responses":{"200":{"description":"(JSON:API) document with a single `data` object representing the selected *threadDevice* item.\n","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"oneOf":[{"type":"array","items":{"type":"object"}},{"type":"object"}]},"examples":{"threadDevice":{"summary":"96518e5497d5b9f3","value":{"extAddress":"96518e5497d5b9f3","mlEidIid":"731f529f1266a17d","omrIpv6Address":["fd11:22:0:0:92de:b397:5758:368"],"hostname":"knx-00fd5f0123a5.local","eui":"9035eafffef3e09c","role":"leader","mode":{"deviceTypeFTD":false,"rxOnWhenIdle":false,"fullNetworkData":false}}}}},"application/vnd.api+json":{"examples":{"threadDevice":{"summary":"96518e5497d5b9f3","value":{"data":{"id":"96518e5497d5b9f3","type":"threadDevice","attributes":{"extAddress":"96518e5497d5b9f3","mlEidIid":"731f529f1266a17d","omrIpv6Address":["fd11:22:0:0:92de:b397:5758:368"],"hostname":"knx-00fd5f0123a5.local","eui":"9035eafffef3e09c","role":"leader","mode":{"deviceTypeFTD":false,"rxOnWhenIdle":false,"fullNetworkData":false},"created":"2025-02-25T17:31:54+02:00"}}}}}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"404":{"$ref":"#/components/responses/NotFoundError"},"406":{"$ref":"#/components/responses/NotAcceptableError"}}},"delete":{"operationId":"deleteDevice","tags":["Devices"],"summary":"Delete Devices item","description":"Removes a *threadDevice* item from the *Devices* collection.\nRequires a *threadDevice* item with the given `id` to exist;\notherwise returns 404 Not Found.\n","parameters":[{"$ref":"#/components/parameters/deviceId"}],"responses":{"204":{"description":"Device item deleted."},"400":{"$ref":"#/components/responses/BadRequestError"},"404":{"$ref":"#/components/responses/NotFoundError"}}}},"/api/diagnostics":{"get":{"operationId":"listDiagnostics","summary":"List Diagnostics collection.","description":"*Diagnostics* collection with up to **TODO** items of the following *Diagnostic* types:\n- `threadNetworkDiscovery` **TODO**\n- `threadNetworkDiagnostic`\n- `threadEnergyScanReport`\n\n## Background Logic\n- when a new item is added, old items may be removed (oldest first) to free enough memory\n- all *Diagnostic* items are created through their corresponding *Task*\n","tags":["Diagnostics"],"parameters":[{"$ref":"#/components/parameters/SparseFieldset"},{"$ref":"#/components/parameters/AcceptJsonApi"}],"responses":{"200":{"description":"(JSON:API) document with with up to TODO `data` objects representing *Diagnostic* items that must have the following members:\n- `id`: unique diagnostic ID assigned by the server\n- `type` diagnostic type (see *Schema*)\n- `attributes`: diagnostic-specific attributes (see *Schema*)\n","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"oneOf":[{"type":"array","items":{"type":"object"}},{"type":"object"}]}},"application/vnd.api+json":{"examples":{"empty":{"summary":"Empty Collection","value":{"meta":{"collection":{"offset":0,"limit":0,"total":0}},"data":[]}},"all":{"summary":"All types","value":{"meta":{"collection":{"offset":0,"limit":5,"total":5}},"data":[{"id":"1f48bf82-acee-45a1-9038-e2748860a467","type":"threadDiscoveryDiagnostic","attributes":{"created":"2023-10-31T15:35:41Z","networksInRange":[{"channel":11,"panId":"0xABCD","extPanId":"60B5026528844E25","networkName":"MyHome4","lqi":64},{"channel":26,"panId":"0x1234","extPanId":"1111111122222222","networkName":"Formed-1234","lqi":255}]}},{"id":"fd428d18-8528-45cf-8a2d-f191bef39b5d","type":"threadNetworkDiagnostic","attributes":{"created":"2023-11-23T18:30:42Z","extAddress":"96518e5497d5b9f3","addr":"0x5000","leaderData":{"partitionId":1794764107,"weighting":64,"dataVersion":64,"stableDataVersion":230,"leaderRouterId":60},"ipv6Addresses":["fdd2:399d:3564:aba6:36f1:b05d:d638:43b6","fd11:22:0:0:aadb:cb2d:47b9:97bc"],"macCounters":{"ifInUnknownProtos":0,"ifInErrors":0,"ifOutErrors":0,"ifInUcastPkts":9,"ifInBroadcastPkts":1167,"ifInDiscards":0,"ifOutUcastPkts":6,"ifOutBroadcastPkts":926,"ifOutDiscards":0},"batteryLevel":null,"supplyVoltage":5000,"channelPages":[0],"maxChildTimeout":2880,"eui":"9035eafffef02ca9","threadVersion":4,"vendorName":"VendorName","vendorModel":"VendorModel","vendorVersion":"1.0.0","stackVersion":"openthread-esp32/-; esp32; Nov 1 2023 01:02:03","routerNeighbors":[{"addr":"0xf000","extAddress":"96518e5497d5b9f3","threadVersion":4,"connTime":43742,"linkMargin":85,"averageRssi":-23,"lastRssi":-20,"frameErrorRate":0,"msgErrorRate":0}],"mleCounters":{"roleDisabled":1,"roleDetached":1,"roleChild":1,"roleRouter":1,"roleLeader":0,"attachAttempts":1,"partitionChanges":0,"betterAttachAttempts":0,"parentChanges":1,"trackingTime":44000,"roleDisabledTime":21.434,"roleDetachedTime":174.56,"roleChildTime":62.006,"roleRouterTime":43742,"roleLeaderTime":0},"brCounters":{"ifInUcastPkts":0,"ifInBroadcastPkts":0,"ifOutUcastPkts":0,"ifOutBroadcastPkts":0,"raRx":1801,"raTxSuccess":602,"raTxFailed":0,"rsRx":218,"rsTxSuccess":3,"rsTxFailed":0},"isLeader":true,"hostsService":true,"isPrimaryBBR":true,"isBorderRouter":true}},{"id":"beed10ee-f73f-4a61-992c-5738d5ab9e42","type":"threadNetworkDiagnostic","attributes":{"created":"2023-11-23T18:30:23Z","extAddress":"2a55d952bc7b4008","rloc16":"0x5004","mode":{"rxOnWhenIdle":false,"fullThreadDevice":false,"fullNetworkData":true},"childTimeout":2880,"leaderData":{"partitionId":1794764107,"weighting":64,"dataVersion":64,"stableDataVersion":230,"leaderRouterId":60},"ipv6Addresses":["fdd2:399d:3564:aba6:e5de:b9d2:260a:2685","fd11:22:0:0:3abd:e522:97a8:7083"],"macCounters":{"ifInUnknownProtos":0,"ifInErrors":0,"ifOutErrors":0,"ifInUcastPkts":231,"ifInBroadcastPkts":0,"ifInDiscards":0,"ifOutUcastPkts":5376,"ifOutBroadcastPkts":1,"ifOutDiscards":0},"batteryLevel":82,"supplyVoltage":null,"eui":"f4ce36dbdca16d79","threadVersion":null,"vendorName":"VendorName","vendorModel":"VendorModel","vendorVersion":"1.0.0","stackVersion":"OPENTHREAD/9cf62ff-dirty; NRF52840; Sep 13 2023 06:50:37","mleCounters":{"roleDisabled":1,"roleDetached":1,"roleChild":1,"roleRouter":0,"roleLeader":0,"attachAttempts":1,"partitionChanges":0,"betterAttachAttempts":0,"parentChanges":1,"trackingTime":43576.123,"roleDisabledTime":20.788,"roleDetachedTime":342.333,"roleChildTime":43213.002,"roleRouterTime":0,"roleLeaderTime":0}}},{"id":"688f881a-b3d5-4261-949c-9c18dfdd7fca","type":"energyScanReport","attributes":{"origin":"f2f307043724e8d0","report":[{"channel":11,"maxRssi":[-45,-55,-50]},{"channel":12,"maxRssi":[-45,-55,-50]}],"created":"2023-10-31T15:32:29Z"}}]}}}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"406":{"$ref":"#/components/responses/NotAcceptableError"},"500":{"$ref":"#/components/responses/InternalServerError"}}},"options":{"operationId":"optionsDiagnostics","tags":["Diagnostics"],"summary":"List of allowed operations.","description":"Lists allowed operations.\n","responses":{"204":{"description":"List of allowed operations.","headers":{"Allow":{"description":"Allowed operations","schema":{"type":"string","example":"GET, POST, DELETE, OPTIONS"}}}}}},"delete":{"operationId":"deleteDiagnostics","summary":"Delete Diagnostics collection","description":"Removes all *diagnostics* items from the *Diagnostics* collection.\n","tags":["Diagnostics"],"responses":{"204":{"description":"Diagnostics collection deleted."}}}},"/api/diagnostics/{diagnosticsId}":{"get":{"operationId":"getDiagnostic","summary":"Diagnostic item.","description":"*Diagnostic* item in the *Diagnostics* collection selected by its `id`.\n\n## Condition\nRequires a *Diagnostic* item with the given `id` to exist;\notherwise returns 404 Not Found.\n","tags":["Diagnostics"],"parameters":[{"$ref":"#/components/parameters/diagnosticsId"},{"$ref":"#/components/parameters/AcceptJsonApi"}],"responses":{"200":{"description":"(JSON:API) document with a single `data` object representing the selected *Diagnostic* item.\n","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"oneOf":[{"type":"array","items":{"type":"object"}},{"type":"object"}]},"examples":{"energyScanReport":{"summary":"688f881a-b3d5-4261-949c-9c18dfdd7fca","value":{"origin":"f2f307043724e8d0","report":[{"channel":11,"maxRssi":[-45,-55,-50]},{"channel":12,"maxRssi":[-45,-55,-50]}]}}}},"application/vnd.api+json":{"examples":{"energyScanReport":{"summary":"688f881a-b3d5-4261-949c-9c18dfdd7fca","value":{"data":{"id":"688f881a-b3d5-4261-949c-9c18dfdd7fca","type":"energyScanReport","attributes":{"origin":"f2f307043724e8d0","report":[{"channel":11,"maxRssi":[-45,-55,-50]},{"channel":12,"maxRssi":[-45,-55,-50]}],"created":"2023-10-31T15:32:29Z"}}}}}}}},"400":{"$ref":"#/components/responses/BadRequestError"},"404":{"$ref":"#/components/responses/NotFoundError"},"406":{"$ref":"#/components/responses/NotAcceptableError"}},"delete":{"operationId":"deleteDiagnostic","summary":"Delete Diagnostic item.","description":"Removes a *Diagnostic* item from the *Diagnostics* collection.\nRequires a *Diagnostic* item with the given `id` to exist;\notherwise returns 404 Not Found.\n","tags":["Diagnostics"],"parameters":[{"$ref":"#/components/parameters/diagnosticsId"}],"responses":{"204":{"description":"Diagnostic item deleted."},"400":{"$ref":"#/components/responses/BadRequestError"},"404":{"$ref":"#/components/responses/NotFoundError"}}}}},"/node":{"get":{"tags":["node"],"summary":"Get current active node parameters","description":"Redirects to the current active node parameters, same as api/node.\n","responses":{"200":{"description":"Successful operation","headers":{"Content-Type":{"description":"Response Content-Type","schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}}},"content":{"application/json":{"schema":{"oneOf":[{"type":"array","items":{"type":"object"}},{"type":"object"}]}},"application/vnd.api+json":{"schema":{"type":"object"}}}},"415":{"$ref":"#/components/responses/UnsupportedMediaTypeError"}}},"delete":{"tags":["node"],"summary":"Erase all persistent information, essentially factory reset the Border Router.","responses":{"200":{"description":"Successful operation"},"204":{"description":"Success without content in response."},"409":{"description":"Thread interface is in wrong state."}}}},"/node/ba-id":{"get":{"tags":["node"],"summary":"Get the border agent ID","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"16 byte border agent ID as hex string.","example":"AA897CA8A67F6E6DD6166133AD1562A5"}}}}}}},"/node/rloc":{"get":{"tags":["node"],"summary":"Routing Locator IPv6 address of this Thread node.","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"RLOC IPv6 address","example":"fda4:728e:4b39:bc4a:0:ff:fe00:1000"}}}}}}},"/node/rloc16":{"get":{"tags":["node"],"summary":"Routing Locator Router and Child ID (RLOC16).","description":"Last 16-bit of the Routing Locator IPv6 consisting of the Router ID and a Child ID.","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"number","description":"RLOC16 address","example":4096}}}}}}},"/node/ext-address":{"get":{"tags":["node"],"summary":"IEEE 802.15.4 Extended Address (EUI-64).","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"8-byte IEEE 802.15.4 Extended Address of this node as hex string.","example":"C21F906BE0352A4C"}}}}}}},"/node/state":{"get":{"tags":["node"],"summary":"Get current Thread state.","description":"State describing the current Thread role of this Thread node.\n- disabled: The Thread stack is disabled.\n- detached: Not currently participating in a Thread network/partition.\n- child: The Thread Child role.\n- router: The Thread Router role.\n- leader: The Thread Leader role.","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"Current state","example":"leader"}}}}}},"put":{"tags":["node"],"summary":"Set current Thread state.","description":"Enable and disable the Thread protocol operation. If network interface\nhasn't been started yet, it will get started automatically.","responses":{"200":{"description":"Successful operation."},"400":{"$ref":"#/components/responses/BadRequestError"},"409":{"$ref":"#/components/responses/ConflictError"},"500":{"$ref":"#/components/responses/InternalServerError"}},"requestBody":{"description":"New Thread state","content":{"application/json":{"schema":{"type":"string","description":"Can be \"enable\" or \"disable\".","example":"enable"}}}}}},"/node/network-name":{"get":{"tags":["node"],"summary":"Thread network name this node is part of.","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"Thread network name.","example":"OpenThread-e445"}}}}}}},"/node/leader-data":{"get":{"tags":["node"],"summary":"Gets the network's leader data.","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"$ref":"#/components/schemas/LeaderData"}}}},"500":{"$ref":"#/components/responses/InternalServerError"}}}},"/node/ext-panid":{"get":{"tags":["node"],"summary":"Extended PAN ID.","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"8-byte extended PAN ID as hex string.","example":"3CAB144450CF407E"}}}}}}},"/node/num-of-router":{"get":{"tags":["node"],"summary":"Get number of router devices","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"number","description":"Number of routers","example":1}}}}}}},"/node/dataset/active":{"get":{"tags":["node"],"summary":"Get current active operational dataset","responses":{"200":{"description":"Returns currently active operational dataset","content":{"application/json":{"schema":{"$ref":"#/components/schemas/ActiveDataset"}},"text/plain":{"schema":{"$ref":"#/components/schemas/DatasetTlv"}}}},"204":{"description":"No active operational dataset"}}},"put":{"tags":["node"],"summary":"Creates or updates the active operational dataset","description":"Creates or updates the the active operational dataset on the current node. Only allowed if the Thread node\nis inactive. If the Thread node is active, a pending dataset should be used to update the current active\noperational dataset.","requestBody":{"description":"Operational dataset that will be stored as active operational dataset. Supports request body Content-Type\n`text/plain` (dataset in TLV format as hex string) or `application/json` (dataset in JSON format). In both\ncases keys which are not set will be initialized with defaults.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/ActiveDataset"}},"plain/text":{"schema":{"$ref":"#/components/schemas/DatasetTlv"}}}},"responses":{"200":{"description":"Successfully updated the active operational dataset."},"201":{"description":"Successfully created the active operational dataset."},"400":{"description":"Invalid request body."},"409":{"description":"Writing active operational dataset rejected because Thread network is active."},"500":{"$ref":"#/components/responses/InternalServerError"}}}},"/node/dataset/pending":{"get":{"tags":["node"],"summary":"Get current pending operational dataset","responses":{"200":{"description":"Returns currently pending operational dataset","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PendingDataset"}},"text/plain":{"schema":{"$ref":"#/components/schemas/DatasetTlv"}}}},"204":{"description":"No pending operational dataset"}}},"put":{"tags":["node"],"summary":"Creates or updates the pending operational dataset","description":"Creates or updates the the pending operational dataset on the current node. Delay needs to be set to let\nthe pending dataset apply as active dataset in the near future.","requestBody":{"description":"Operational dataset that will be stored as pending operational dataset. Supports request body Content-Type\n`text/plain` (dataset in TLV format as hex string) or `application/json` (dataset in JSON format). In both\ncases keys which are not set will be initialized with defaults.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PendingDataset"}},"text/plain":{"schema":{"$ref":"#/components/schemas/DatasetTlv"}}}},"responses":{"200":{"description":"Successfully updated the pending operational dataset."},"201":{"description":"Successfully created the pending operational dataset."},"400":{"description":"Invalid request body."},"500":{"$ref":"#/components/responses/InternalServerError"}}}},"/node/commissioner/state":{"get":{"tags":["node","commissioner"],"summary":"Get current Commissioner state.","description":"State describing the current Commissioner role of this Thread node.\n- disabled\n- petitioning\n- active","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"Current state","example":"active"}}}}}},"put":{"tags":["node","commissioner"],"summary":"Set current Commissioner state.","description":"Enable or disable the Commissioner.","responses":{"200":{"description":"Successful operation."},"400":{"$ref":"#/components/responses/BadRequestError"},"409":{"description":"Cannot set commissioner state because border router state is not active"},"500":{"$ref":"#/components/responses/InternalServerError"}},"requestBody":{"description":"New Commissioner state","content":{"application/json":{"schema":{"type":"string","description":"Can be \"enable\" or \"disable\".","example":"enable"}}}}}},"/node/commissioner/joiner":{"get":{"tags":["node"],"summary":"Get current joiner data","responses":{"200":{"description":"Returns an array of currently active joiners","content":{"application/json":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/JoinerData"}}}}}}},"post":{"tags":["node"],"summary":"Adds a new joiner","requestBody":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/JoinerData"}}}},"responses":{"200":{"description":"Successfully added joiner."},"400":{"description":"Invalid request body."},"409":{"description":"Adding joiner rejected because commissioner is not active."},"507":{"description":"Number of joiners the commissioner supports is full and the new one cannot be added."}}},"delete":{"tags":["node"],"summary":"Removes a joiner from the node","requestBody":{"content":{"application/json":{"schema":{"type":"string","description":"Joiner ID to remove, can be either:\n - An EUI64 in the form of a 16 character hex string\n - A discerner in the form of the discerner hex value \n   (optionally with leading 0x) and bit length separated by a '/'","example":"0xabc/12"}}}},"responses":{"200":{"description":"Successfully removed joiner."},"204":{"description":"Joiner not found."},"400":{"description":"Invalid request body."},"409":{"description":"request rejected because commissioner is not active."}}}},"/node/coprocessor/version":{"get":{"tags":["node"],"summary":"Get the coprocessor firmware version","description":"Retrieves the NCP or RCP coprocessor firmware version string.","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"string","description":"Coprocessor version string","example":"OPENTHREAD/thread-reference-20200818-1740-g33cc75ed3; NRF52840; Jun  2 2022 14:25:49"}}}}}}}},"components":{"schemas":{"Actions_addThreadDeviceTask":{"type":"object","properties":{"type":{"enum":["addThreadDeviceTask"]},"attributes":{"type":"object","oneOf":[{"$ref":"#/components/schemas/Actions_JoinerDataEui"},{"$ref":"#/components/schemas/Actions_JoinerDataDiscerner"},{"$ref":"#/components/schemas/Actions_JoinerDataJoinerId"}]}}},"Actions_JoinerDataEui":{"type":"object","properties":{"pskd":{"$ref":"#/components/schemas/pskd"},"eui":{"type":"string","description":"A string of the EUI-64, mutually exclusive with `joinerId` and `discerner`.","pattern":"^[0-9a-fA-F]{16}$","example":"0123456789abcdef"},"timeout":{"type":"integer","description":"Timeout in seconds","default":900}},"required":["pskd","eui"]},"Actions_JoinerDataDiscerner":{"type":"object","properties":{"pskd":{"$ref":"#/components/schemas/pskd"},"discerner":{"type":"string","description":"A discerner in the form of the discerner hex value (optionally with leading 0x) \nand bit length separated by a '/'.\nField is mutually exclusive with `joinerId` and `eui`.","pattern":"^0x[0-9a-fA-F]{1,16}/[0-9]{1,2}$","example":"0xabc/12"},"timeout":{"type":"integer","description":"Timeout in seconds","default":900}},"required":["pskd","discerner"]},"Actions_JoinerDataJoinerId":{"type":"object","properties":{"pskd":{"$ref":"#/components/schemas/pskd"},"joinerId":{"type":"string","description":"A string of the EUI-64, Discerner, or \"*\", mutually exclusive with `eui` and `discerner`.","default":"*"},"timeout":{"type":"integer","description":"Timeout in seconds","default":900}},"required":["pskd","joinerId"]},"Actions_destination":{"description":"Accepts the value of a `deviceId` (equal to 'ExtendedAddress'), `rloc16` or `mlEidIid`. The TBR expands the given destination to \nthe Mesh-Local IPv6 address or Rloc16 address. `deviceId` must be a member of *Devices* collection where it is looked-up\nto find the ML-EID IID, which is then expanded to the Mesh-Local IPv6 address.\nA ML-EID IID needs additional attribute `destinationType`:'mleid'.\n","oneOf":[{"$ref":"#/components/schemas/LongAddr"},{"$ref":"#/components/schemas/ShortAddr"},{"$ref":"#/components/schemas/MlEidIid"}]},"Actions_getNetworkDiagnosticTask":{"type":"object","properties":{"type":{"enum":["getNetworkDiagnosticTask"]},"attributes":{"type":"object","properties":{"destination":{"$ref":"#/components/schemas/Actions_destination"},"types":{"type":"array","items":{"anyOf":[{"type":"integer","minimum":0},{"type":"string","enum":["extAddress","rloc16","mode","childTimeout","connectivity","route64","leaderData","networkData","ipv6Addresses","macCounters","batteryLevel","supplyVoltage","childTable","channelPages","maxChildTimeout","eui64","version","vendorName","vendorModel","vendorVersion","threadStackVersion","children","childIpv6Addresses","routerNeighbors","mleCounters"]}]},"uniqueItems":true,"minItems":1},"timeout":{"type":"integer","unit":"seconds","minimum":0}}}}},"Actions_resetNetworkDiagCounterTask":{"type":"object","properties":{"type":{"enum":["resetNetworkDiagCounterTask"]},"attributes":{"type":"object","properties":{"destination":{"$ref":"#/components/schemas/Actions_destination"},"types":{"type":"array","items":{"anyOf":[{"type":"integer","minimum":0},{"type":"string","enum":["macCounters","mleCounters"]}],"minItems":1},"default":["macCounters","mleCounters"]},"timeout":{"type":"integer","unit":"seconds","minimum":0,"default":93}}}}},"Actions_getEnergyScanTask":{"type":"object","properties":{"type":{"enum":["getEnergyScanTask"]},"attributes":{"type":"object","properties":{"destination":{"$ref":"#/components/schemas/Actions_destination"},"channelMask":{"type":"array","uniqueItems":true,"minItems":1,"maxItems":16,"items":{"$ref":"#/components/schemas/Channel"},"default":[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]},"count":{"type":"integer","minimum":0,"maximum":4,"default":1,"description":"Number of *IEEE 802.15.4 ED Scans* per channel."},"period":{"type":"integer","unit":"milliseconds","minimum":0,"maximum":65535,"default":32,"description":"Period between successive IEEE 802.15.4 ED Scans* (milliseconds)."},"scanDuration":{"type":"integer","unit":"milliseconds","minimum":0,"maximum":100,"default":0,"description":"IEEE 802.15.4 ScanDuration to use when performing an *IEEE 802.15.4 ED Scan* (milliseconds)."},"timeout":{"type":"integer","unit":"seconds","minimum":0,"description":"calculated default: (len(channelMask) * count * (scanDuration + period) + 500 + 1000) / 1000 + 93"}}}}},"Actions_updateDeviceCollectionTask":{"type":"object","properties":{"type":{"enum":["updateDeviceCollectionTask"]},"attributes":{"type":"object","properties":{"maxAge":{"type":"integer","unit":"seconds","minimum":0,"default":30,"description":"Maximum age in seconds for device information to be considered valid."},"maxRetries":{"type":"integer","minimum":0,"default":5,"description":"Maximum number of retries for device discovery or update."},"deviceCount":{"type":"integer","minimum":0,"default":10,"description":"Number of devices to discover or update in the collection. Usually equal to the number of devices in the Thread network."},"timeout":{"type":"integer","unit":"seconds","minimum":0,"default":93,"description":"Timeout in seconds for the update device collection task."}}}}},"ActionsClient":{"type":"object","required":["data"],"properties":{"data":{"type":"array","minItems":1,"items":{"anyOf":[{"$ref":"#/components/schemas/ActionsClient_addThreadDeviceTask"},{"$ref":"#/components/schemas/ActionsClient_getNetworkDiagnosticTask"},{"$ref":"#/components/schemas/ActionsClient_resetNetworkDiagCounterTask"},{"$ref":"#/components/schemas/ActionsClient_getEnergyScanTask"},{"$ref":"#/components/schemas/ActionsClient_updateDeviceCollectionTask"}]}},"additionalProperties":false}},"ActionsClient_addThreadDeviceTask":{"allOf":[{"$ref":"#/components/schemas/Actions_addThreadDeviceTask"},{"type":"object","required":["type","attributes"],"additionalProperties":false}]},"ActionsClient_getNetworkDiagnosticTask":{"allOf":[{"$ref":"#/components/schemas/Actions_getNetworkDiagnosticTask"},{"type":"object","required":["type","attributes"],"properties":{"attributes":{"type":"object","required":["destination","types"]},"additionalProperties":false},"additionalProperties":false}]},"ActionsClient_resetNetworkDiagCounterTask":{"allOf":[{"$ref":"#/components/schemas/Actions_resetNetworkDiagCounterTask"},{"type":"object","required":["type","attributes"],"properties":{"attributes":{"type":"object","required":["types"],"additionalProperties":false},"additionalProperties":false}}]},"ActionsClient_getEnergyScanTask":{"allOf":[{"$ref":"#/components/schemas/Actions_getEnergyScanTask"},{"type":"object","required":["type","attributes"],"properties":{"attributes":{"type":"object","required":["destination","channelMask","count","period","scanDuration","timeout"],"additionalProperties":false},"additionalProperties":false}}]},"ActionsClient_updateDeviceCollectionTask":{"allOf":[{"$ref":"#/components/schemas/Actions_updateDeviceCollectionTask"},{"type":"object","required":["type","attributes"],"properties":{"attributes":{"type":"object","required":["maxAge","maxRetries","deviceCount","timeout"],"additionalProperties":false},"additionalProperties":false}}]},"Meta":{"type":"object","required":["collection"],"properties":{"collection":{"type":"object","required":["offset","limit","total"],"properties":{"offset":{"type":"integer","minimum":0,"default":0,"description":"Number of items skipped in the response (related to `page[offset]` query parameter, `page[offset]` not implemented)."},"limit":{"type":"integer","minimum":0,"description":"Number of items included in the response, starting from offset; calculated default equal to total (related to `page[limit]` query parameter, `page[limit]` not implemented) or max collection items supported."},"total":{"type":"integer","minimum":0,"description":"Total number of items in the collection."},"pending":{"type":"integer","minimum":0,"description":"Number of pending items in the collection, only for *Actions* collection."}},"description":"Collection pagination metadata."}}},"ActionsCollection":{"type":"object","required":["meta","data"],"properties":{"meta":{"$ref":"#/components/schemas/Meta"},"data":{"type":"array","items":{"anyOf":[{"$ref":"#/components/schemas/ActionsServer_addThreadDeviceTask"},{"$ref":"#/components/schemas/ActionsServer_getNetworkDiagnosticTask"},{"$ref":"#/components/schemas/ActionsServer_resetNetworkDiagCounterTask"},{"$ref":"#/components/schemas/ActionsServer_getEnergyScanTask"},{"$ref":"#/components/schemas/ActionsServer_updateDeviceCollectionTask"}]}}}},"ActionItem":{"type":"object","required":["data"],"properties":{"data":{"anyOf":[{"$ref":"#/components/schemas/ActionsServer_addThreadDeviceTask"},{"$ref":"#/components/schemas/ActionsServer_getNetworkDiagnosticTask"},{"$ref":"#/components/schemas/ActionsServer_resetNetworkDiagCounterTask"},{"$ref":"#/components/schemas/ActionsServer_getEnergyScanTask"},{"$ref":"#/components/schemas/ActionsServer_updateDeviceCollectionTask"}]}}},"ActionsServer":{"type":"object","required":["id","type","attributes"],"properties":{"id":{"type":"string","format":"uuid"},"type":{"type":"string"},"attributes":{"type":"object","required":["status"],"properties":{"status":{"type":"string","enum":["pending","active","completed","stopped","failed","undiscovered","attempted"]}}}}},"ActionsServer_addThreadDeviceTask":{"allOf":[{"$ref":"#/components/schemas/ActionsServer"},{"$ref":"#/components/schemas/Actions_addThreadDeviceTask"},{"type":"object","properties":{"attributes":{"type":"object","status":{"type":"string","enum":["pending","active","completed","stopped","failed","undiscovered","attempted"]},"required":["pskd","timeout","status"]}}}]},"ActionsServer_getNetworkDiagnosticTask":{"allOf":[{"$ref":"#/components/schemas/ActionsServer"},{"$ref":"#/components/schemas/Actions_getNetworkDiagnosticTask"},{"type":"object","properties":{"attributes":{"type":"object","required":["destination","types","timeout"]}}}]},"ActionsServer_resetNetworkDiagCounterTask":{"allOf":[{"$ref":"#/components/schemas/ActionsServer"},{"$ref":"#/components/schemas/Actions_resetNetworkDiagCounterTask"},{"type":"object","properties":{"attributes":{"type":"object","required":["destination","types","timeout"]}}}]},"ActionsServer_getEnergyScanTask":{"allOf":[{"$ref":"#/components/schemas/ActionsServer"},{"$ref":"#/components/schemas/Actions_getEnergyScanTask"},{"type":"object","properties":{"attributes":{"type":"object","required":["destination","channelMask","count","period","scanDuration","timeout"]}}}]},"ActionsServer_updateDeviceCollectionTask":{"allOf":[{"$ref":"#/components/schemas/ActionsServer"},{"$ref":"#/components/schemas/Actions_updateDeviceCollectionTask"},{"type":"object","properties":{"attributes":{"type":"object","required":["maxAge","maxRetries","deviceCount","timeout"]}}}]},"Errors":{"description":"Array of error items, included in the JSON:API `errors` member.\nEach error item should correspond to RFC 7807.\nIt may contain additional information such as:\n- a JSON:API `links` member, pointing to absolute/ relative URL with error details\n- a vendor specific information\n","type":"object","properties":{"errors":{"type":"array","items":{"$ref":"#/components/schemas/SimpleError"}}}},"SimpleError":{"items":{"required":["title","status"],"properties":{"title":{"description":"Error title or HTTP status phrase.","type":"string"},"status":{"description":"HTTP status code.","type":"integer","minimum":400,"maximum":599},"detail":{"description":"Detailed description of the error.","type":"string"},"links":{"description":"Absolute URL reference to a detailed description of the error.","type":"string","format":"uri-reference"}}}},"ShortAddr":{"description":"Rloc16 address, formated as hex-string with leading '0x'","type":"string","pattern":"^0x[0-9a-fA-F]{4}$"},"LongAddr":{"description":"Extended address.","type":"string","pattern":"^(0x)?[0-9a-fA-F]{16}$"},"MlEidIid":{"description":"The ML-EID Interface Identifier.","type":"string","pattern":"^(0x)?[0-9a-fA-F]{16}$"},"pskd":{"description":"Joining device's pre-shared key","type":"string","pattern":"^[0-9ABCDEFGHJKLMNPRSTUVWXY]{6,32}$","example":"J01NME"},"Channel":{"type":"integer","minimum":11,"maximum":26},"LeaderData":{"type":"object","properties":{"partitionId":{"type":"number","format":"uint32","description":"Partition ID","example":1230046604},"weighting":{"type":"number","format":"uint8","description":"Leader Weight","example":64},"dataVersion":{"type":"number","description":"Full network data version","example":244},"stableDataVersion":{"type":"number","format":"uint8","description":"Stable Network Data Version","example":186},"leaderRouterId":{"type":"number","format":"uint8","description":"Leader Router ID","example":4}}},"ActiveDataset":{"type":"object","properties":{"activeTimestamp":{"$ref":"#/components/schemas/Timestamp"},"networkKey":{"type":"string","description":"Network key, 16 bytes long, formatted as a hexadecimal string","example":"08277229F21FB7342D705D3CEFDC042A","default":"random"},"networkName":{"type":"string","description":"Network name, 16 bytes long","example":"OpenThread-e445","default":"OpenThread-<PanId>"},"extPanId":{"type":"string","description":"Extended PAN ID, 8 bytes long, formatted as a hexadecimal string","example":"996D3BEE320097A3","default":"random"},"meshLocalPrefix":{"type":"string","description":"Mesh local IPv6 prefix","example":"fd33:d3b9:89e3:72e4::/64","default":"random"},"panId":{"type":"integer","description":"IEEE 802.15.4 PAN ID of the Thread network","format":"uint16","example":58437,"default":"random"},"channel":{"type":"integer","description":"IEEE 802.15.4 channel of the Thread network","format":"uint16","example":21,"default":"random"},"pskc":{"type":"string","description":"The pre-shared commissioner key","example":"FD943ECA225A28979B991EFAC1218A72","default":"random"},"securityPolicy":{"$ref":"#/components/schemas/SecurityPolicy"},"channelMask":{"type":"integer","description":"Channel mask","format":"uint32","example":134215680,"default":134215680}}},"PendingDataset":{"type":"object","properties":{"activeDataset":{"oneOf":[{"$ref":"#/components/schemas/ActiveDataset"},{"$ref":"#/components/schemas/DatasetTlv"}]},"PendingTimestamp":{"$ref":"#/components/schemas/Timestamp"},"delay":{"type":"integer","description":"Delay timer in milliseconds","format":"uint32","example":30000,"default":"not set"}}},"SecurityPolicy":{"type":"object","properties":{"rotationTime":{"type":"integer","description":"Thread key rotation time in hours","format":"uint16","example":672,"default":672},"obtainNetworkKey":{"type":"boolean","description":"Obtaining the Network Key for out-of-band commissioning is enabled","example":true,"default":true},"nativeCommissioning":{"type":"boolean","description":"Native Commissioning using PSKc is allowed","example":true,"default":true},"routers":{"type":"boolean","description":"Thread 1.0/1.1.x Routers are enabled","example":true,"default":true},"externalCommissioning":{"type":"boolean","description":"External Commissioner authentication is allowed","example":true,"default":true},"commercialCommissioning":{"type":"boolean","description":"Commercial Commissioning is enabled","example":false,"default":false},"autonomousEnrollment":{"type":"boolean","description":"Autonomous Enrollment is enabled","example":false,"default":false},"networkKeyProvisioning":{"type":"boolean","description":"Network Key Provisioning is enabled","example":false,"default":false},"tobleLink":{"type":"boolean","description":"ToBLE link is enabled","example":false,"default":false},"nonCcmRouters":{"type":"boolean","description":"Non-CCM Routers enabled","example":false,"default":false}}},"Timestamp":{"type":"object","properties":{"seconds":{"type":"integer","description":"Timestamp seconds","format":"uint64","example":10,"default":1},"ticks":{"type":"integer","description":"Timestamp ticks","format":"uint16","example":0,"default":0},"authoritative":{"type":"boolean","example":false,"default":false}}},"DatasetTlv":{"type":"string","description":"Operational dataset as hex-encoded TLVs.","example":"0E080000000000010000000300000F35060004001FFFE0020811111111222222220708FDAD70BFE5AA15DD051000112233445566778899AABBCCDDEEFF030E4F70656E54687265616444656D6F010212340410445F2B5CA6F2A93A55CE570A70EFEECB0C0402A0F7F8"},"JoinerData":{"type":"object","properties":{"pskd":{"$ref":"#/components/schemas/pskd"},"joinerId":{"type":"string","description":"A string of the EUI-64, Discerner, or \"*\", mutually exclusive with Eui64 and Discerner","example":"0xabc/12","default":"*"},"eui64":{"type":"string","description":"A string of the EUI-64, mutually exclusive with JoinerId and Discerner","example":"0123456789abcdef"},"discerner":{"type":"string","description":"A discerner in the form of the discerner hex value (optionally with leading 0x) \nand bit length separated by a '/'.\nField is mutually exclusive with JoinerId and Eui64.","example":"0xabc/12"},"timeout":{"type":"integer","description":"Joiner expiration time in milliseconds on response and seconds on request","default":60}}}},"parameters":{"AcceptJsonApi":{"name":"Accept","description":"Must be set to `application/vnd.api+json` or `application/json`","in":"header","required":false,"schema":{"type":"string","enum":["application/json","application/vnd.api+json"]}},"actionId":{"name":"actionId","description":"ID of the requested Action item (Task).","in":"path","required":true,"schema":{"type":"string","format":"uuid"}},"deviceId":{"name":"deviceId","description":"ID of the requested Device item.","in":"path","required":true,"schema":{"type":"string","pattern":"^[0-9a-fA-F]{16}$","description":"Alphanumeric hex string of length 16"}},"diagnosticsId":{"name":"diagnosticsId","description":"ID of the requested Diagnostic item.","in":"path","required":true,"schema":{"type":"string","format":"uuid"}},"SparseFieldset":{"name":"fields","description":"A selector that allows clients to request a subset of items of the given type only:\n- with all attributes, for example, `fields[addThreadDeviceTask]` or `fields[{type}]` in general\n- with selected attributes only (\"Sparse Fieldset\"), `fields[nodeDevice]=vendorModel,operationalDataset.active.channel` or `fields[{type}]={attributeKey}(,{attributeKey})*` in general\n\n## Condition\nThe `{type}` must be given (in other words, not empty).\nThe value of the parameter must be fully omitted (in other words, no `=` in query) or contain one or more type-specific `{attributeKey}`s in a comma-separated list.\nAn `{attributeKey}` may use the dot notation to select a subordinate field of the attribute.\n\nAllowed characters for `{type}` and `{attributeKey}` are alphanumeric characters, underscores (`_`), hyphens (`-`), and dots (`.`) for nested fields. Commas (`,`) are used as separators.\nAllowed character set (regex): `^[A-Za-z0-9_.\\-\\,]+$`\n\n## Examples\n- `?fields[threadDevice]=hostname,role`\n- `?fields[addThreadDeviceTask]=eui,pskd&fields[threadDevice]=hostname`\n- `?fields[threadDevice]` (all attributes for threadDevice)\n","in":"query","style":"deepObject","required":false,"schema":{"type":"object","properties":{"type":{"type":"array","items":{"type":"string","enum":["threadDevice","threadBorderRouter","networkDiagnostics","energyReport","addThreadDeviceTask","getNetworkDiagnosticTask","resetNetworkDiagCounterTask","getEnergyScanTask","updateDeviceCollectionTask"]},"minItems":1,"maxItems":1,"attributes":{"type":"string","pattern":"^[A-Za-z0-9_.\\-]+(,[A-Za-z0-9_.\\-]+)*$","description":"A comma-separated list of attribute keys to include in the response.\nIf omitted, all attributes of the type are included.\n"}}}},"examples":{"allAttributes":{"summary":"All attributes for a type","value":{"fields[threadDevice]":""}},"selectedAttributes":{"summary":"Selected attributes for a type","value":{"fields[threadDevice]":"hostname,role"}},"multipleTypes":{"summary":"Selected attributes for multiple types","value":{"fields[threadDevice]":"hostname,role","fields[addThreadDeviceTask]":"eui,pskd"}},"nestedAttributes":{"summary":"Nested attributes for a type","value":{"fields[threadDevice]":"mode.deviceTypeFTD,mode.rxOnWhenIdle"}}}}},"responses":{"BadRequestError":{"description":"The client sent an invalid request.\nThe client SHOULD perform action(s) to provide valid syntax before retrying the request.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Bad Request","status":400}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Bad Request","status":400,"detail":"The client sent an invalid request."}]}}}},"NotFoundError":{"description":"The client requested a target resource that does not exist.\nThe client SHOULD perform action(s) to re-align with the API or re-synchronize application state before retrying the request.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Not Found","status":404}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Not Found","status":404,"detail":"The client requested a target resource that does not exist."}]}}}},"MethodNotAllowedError":{"description":"The client used a method that is not supported by the target resource.\nThe client SHOULD perform action(s) to re-align with the API before retrying the request.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Method Not Allowed","status":405}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Method Not Allowed","status":405,"detail":"The client used a method that is not supported by the target resource."}]}}}},"NotAcceptableError":{"description":"The client requests a content-type that is not supported by the target resource.\nThe client SHOULD perform action(s) to re-align with the API before retrying the request.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Not Acceptable","status":406,"detail":"Supported media types: application/json, application/vnd.api+json"}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Not Acceptable","status":406,"detail":"Supported media types: application/json, application/vnd.api+json"}]}}}},"RequestTimeout":{"description":"The client request took too long to process.\nThe client SHOULD perform action(s) validate correctness of the request and retry the validated request after a longer period of time.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Request Timeout","status":408}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Request Timeout","status":408,"detail":"The client request took too long to process."}]}}}},"ConflictError":{"description":"The request conflicts with the current state of the target resource;\neither the request body cannot be applied to the resource state or the resource state cannot satisfy the request.\nThe client SHOULD perform action(s) to re-synchronize application state before retrying the request.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Conflict","status":409}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Conflict","status":409,"detail":"The request conflicts with the current state of the target resource."}]}}}},"UnsupportedMediaTypeError":{"description":"The client sent a request body in an unsupported format.\nThe client SHOULD change the request body format before retrying the request.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Unsupported Media Type","status":415}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Unsupported Media Type","status":415,"detail":"The client sent a request body in an unsupported format."}]}}}},"UnprocessableError":{"description":"The server understands the content type of the request body correct, but was unable to process the contained information.\nThe client SHOULD perform action(s) to correct the request body before retrying the request.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Unprocessable Content","status":422}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Unprocessable Content","status":422,"detail":"The request body could not be processed."}]}}}},"InternalServerError":{"description":"The server encountered an unexpected error.\nThe client SHOULD retry after a longer period of time.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Internal Server Error","status":500}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Internal Server Error","status":500,"detail":"Unexpected error."}]}}}},"ServiceUnavailableError":{"description":"The server is not ready to handle the request.\nThe client SHOULD retry after a short period of time.\n","content":{"application/json":{"schema":{"$ref":"#/components/schemas/SimpleError"},"example":{"title":"Service Unavailable","status":503}},"application/vnd.api+json":{"schema":{"$ref":"#/components/schemas/Errors"},"example":{"errors":[{"title":"Service Unavailable","status":503,"detail":"The server is not ready to handle the request."}]}}}}}}};
