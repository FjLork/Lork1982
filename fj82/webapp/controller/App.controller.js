sap.ui.define([
    "sap/ui/core/mvc/Controller",       // Importa la clase base del controlador
    "sap/ui/model/Filter",              // Importa la clase para crear filtros en el modelo
    "sap/ui/model/FilterOperator",      // Importa los operadores de filtros (como EQ, Contains, etc.)
    "sap/ui/core/Fragment",             // Importa la clase para trabajar con fragmentos (diálogos, popups)
    "sap/ui/model/json/JSONModel"       // Importa la clase para trabajar con modelos JSON
],
    function (Controller, Filter, FilterOperator, Fragment, JSONModel) {
        "use strict";

        // Extiende el controlador base para crear uno personalizado
        return Controller.extend("lorkgroup.fj82.controller.App", {


            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            //--                 Método:  onInit                                          --//
            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            onInit: function () {
                this._loadCountries();  // Carga los datos de países
            },


            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            //--                 Método:  _loadCountries                                  --//
            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            // Método privado para cargar datos de países
            _loadCountries: function () {
                let oModelCountries = new JSONModel();  // Crea un nuevo modelo JSON
                oModelCountries.loadData("../model/Countries.json");  // Carga datos desde el archivo JSON
                this.getView().setModel(oModelCountries, "jsonCountries");  // Asigna el modelo a la vista con el nombre "jsonCountries"
            },


            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            //--                 Método:  onFilter                                        --//
            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            // Método para aplicar filtros a los datos mostrados en la tabla
            onFilter: function () {

                // Obtiene el modelo de países desde la vista
                let oModelCountries = this.getView().getModel("jsonCountries"),
                    sEmployee = oModelCountries.getProperty("/EmployeeId"),  // Obtiene el ID del empleado desde el modelo
                    sCode = oModelCountries.getProperty("/CountryCode");  // Obtiene el código del país desde el modelo

                let aFilters = [];  // Array que almacenará los filtros

                // Si hay un ID de empleado, crea un filtro por EmployeeID
                if (sEmployee) {
                    aFilters.push(new Filter("EmployeeID", FilterOperator.EQ, sEmployee));
                }

                // Si hay un código de país, crea un filtro que contenga el código de país
                if (sCode) {
                    aFilters.push(new Filter("Country", FilterOperator.Contains, sCode));
                }

                // Obtiene la tabla desde la vista y aplica los filtros
                let oTable = this.getView().byId("table"),
                    oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters);  // Aplica los filtros a la tabla
            },


            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            //--                 Método:  onClearFilter                                   --//
            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            // Método para limpiar los filtros aplicados
            onClearFilter: function () {
                this._loadCountries();  // Recarga los datos de países
                let oTable = this.getView().byId("table"),
                    oBinding = oTable.getBinding("items");
                oBinding.filter([]);  // Limpia los filtros aplicados a la tabla
            },


            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            //--                 Método:  onOpenOrders                                    --//
            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//

            onOpenOrders: function (oEvent) {

                let oItem = oEvent.getSource(),  // Obtiene el item que disparó el evento
                    oBindingContext = oItem.getBindingContext("northwind"),  // Obtiene el contexto de datos del empleado seleccionado
                    sPath = oBindingContext.getPath(),  // Obtiene la ruta del contexto
                    oView = this.getView();  // Obtiene la vista actual

                console.log(oView);  // Imprime en consola la vista

                // Si el diálogo no existe, lo carga dinámicamente
                if (!this._pDialog) {
                    this._pDialog = Fragment.load({
                        id: this.getView().getId(),  // Asigna un ID al diálogo
                        name: "lorkgroup.fj82.view.fragment.Orders",  // Especifica el nombre del fragmento
                        controller: this  // Asocia el fragmento con este controlador
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);  // Añade el diálogo como dependiente de la vista
                        return oDialog;
                    });
                }

                // Una vez cargado, asocia el diálogo con los datos del empleado y lo abre
                this._pDialog.then(function (oDialog) {
                    oDialog.bindElement({
                        path: sPath,  // Asocia el diálogo con la ruta de datos del empleado
                        model: 'northwind'  // Especifica el modelo a utilizar
                    });
                    oDialog.open();  // Abre el diálogo
                });
            },


            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            //--                 Método:  onCloseDialog                                   --//
            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            onCloseDialog: function () {
                this._pDialog.then(function (oDialog) {
                    oDialog.close();  // Cierra el diálogo
                });
            },


            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            //--                 Método:  onNavToDetails                                  --//
            //------------------------------------------------------------------------------//
            //------------------------------------------------------------------------------//
            onNavToDetails: function (oEvent) {
                let oItem = oEvent.getSource(),  // Obtiene el item que disparó el evento
                    oBindingContext = oItem.getBindingContext("northwind");  // Obtiene el contexto de datos del empleado seleccionado
                this.oEventBus.publish("flexible", "showEmployeeDetails", oBindingContext);  // Publica un evento para mostrar los detalles del empleado
            }

        });
    });