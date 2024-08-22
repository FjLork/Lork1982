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

             this.oEventBus = sap.ui.getCore().getEventBus();
            this.oEventBus.subscribe("flexible","showEmployeeDetails", this.showEmployeeDetails.bind(this));
            // this.oEventBus.subscribe("incidence","onSaveODataIncidence", this.onSaveODataIncidence.bind(this))


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
        
        },

        //------------------------------------------------------------------------------//
        //------------------------------------------------------------------------------//
        //--                 Método:  showEmployeeDetails                             --//
        //------------------------------------------------------------------------------//
        //------------------------------------------------------------------------------//
        //Este método lo quiero compartir con culquier otro controlador
        showEmployeeDetails: function (sChannelId, sEventId, oBindingContext) {
            let oDetails = this.getView().byId("details");
                oDetails.bindElement("northwind>"+oBindingContext.getPath());
            this.getView().getModel("jsonLayout").setProperty("/ActiveCode", "TwoColumnsMidExpanded");

            let oIncidenceModel = new JSONModel([]);
                oDetails.setModel(oIncidenceModel, "incidenceModel");
                oDetails.byId("tableIncidence").removeAllContent();

            }

    });
});