sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";


    return Controller.extend("lorkgroup.fj82.controller.Main", {

        //------------------------------------------------------------------------------//
        //------------------------------------------------------------------------------//
        //--                 Método:  onInit                                          --//
        //------------------------------------------------------------------------------//
        //------------------------------------------------------------------------------//
        onInit: function () {
            this._loadLayouts();    // Carga los datos de layouts
        },

        //------------------------------------------------------------------------------//
        //------------------------------------------------------------------------------//
        //--                 Método:  _loadLayouts                                    --//
        //------------------------------------------------------------------------------//
        //------------------------------------------------------------------------------//
        // Método privado para cargar datos de layouts
        _loadLayouts: function () {
            let oModelCountries = new JSONModel();  // Crea un nuevo modelo JSON
            oModelCountries.loadData("../model/Layouts.json");  // Carga datos desde el archivo JSON
            this.getView().setModel(oModelCountries, "jsonLayout");  // Asigna el modelo a la vista con el nombre "jsonLayout"
        }

    });
});