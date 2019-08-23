import Adapter from './application';
export default Adapter.extend({
  requestForQuery: function(request, { dc, index, id }) {
    return request`
      GET /v1/internal/ui/nodes?${{ dc }}

      ${{ index }}
    `;
  },
  requestForQueryRecord: function(request, { dc, index, id }) {
    if (typeof id === 'undefined') {
      throw new Error('You must specify an id');
    }
    return request`
      GET /v1/internal/ui/node/${id}?${{ dc }}

      ${{ index }}
    `;
  },
  requestForQueryLeader: function(request, { dc }) {
    return request`
      GET /v1/status/leader?${{ dc }}
    `;
  },
  queryLeader: function(store, type, id, snapshot) {
    return this.request(
      function(adapter, request, serialized, unserialized) {
        return adapter.requestForQueryLeader(request, serialized, unserialized);
      },
      function(serializer, response, serialized, unserialized) {
        return serializer.respondForQueryLeader(response, serialized, unserialized);
      },
      snapshot,
      type.modelName
    );
  },
});
