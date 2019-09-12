// original source: https://github.com/route360/Leaflet.CondensedAttribution
L.Control.CondensedAttribution = L.Control.Attribution.extend({
    options: {
        emblem: "<h2 class='white-text'>?</h2>",
    },
    onAdd: function (map) {
        var vMaj = parseInt(L.version.split('.')[0]);
        if (vMaj >= 1) {
            map.attributionControl = this;
        }

        this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
        if (L.DomEvent) {
            L.DomEvent.disableClickPropagation(this._container);
        }

        for (var i in map._layers) {
            if (map._layers[i].getAttribution) {
                this.addAttribution(map._layers[i].getAttribution());
            }
        }

        if (vMaj < 1) {
            map
                .on('layeradd', this._onLayerAdd, this)
                .on('layerremove', this._onLayerRemove, this);
        }

        this._update();

        L.DomUtil.addClass(this._container, 'leaflet-condensed-attribution');

        return this._container;
    },
    _update: function () {
        if (!this._map) {
            return;
        }

        var attribs = [];

        for (var i in this._attributions) {
            if (this._attributions[i]) {
                attribs.push(i);
            }
        }

        var prefixAndAttribs = [];

        if (this.options.prefix) {
            prefixAndAttribs.push(this.options.prefix);
        }
        if (attribs.length) {
            prefixAndAttribs.push(attribs.join(', '));
        }

        this._container.innerHTML = '<div class="attributes-body">' +
            prefixAndAttribs.join(' | ') +
            '</div><div class="attributes-emblem">' +
            this.options.emblem + '</div>';
    }
});

L.Map.mergeOptions({
    attributionControl: false,
    condensedAttributionControl: true
});

L.Map.addInitHook(function () {
    if (this.options.condensedAttributionControl) {
        new L.Control.CondensedAttribution().addTo(this);
    }
});

L.control.condensedAttribution = function (options) {
    return new L.Control.CondensedAttribution(options);
};
