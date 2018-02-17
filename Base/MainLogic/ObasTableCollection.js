var ObasTableCollection = (function () {
    function ObasTableCollection() {
    }
    Object.defineProperty(ObasTableCollection, "RroPartIndicateBudgetValues", {
        get: function () {
            if (this._rroPartIndicateBudgetValues == null) {
                this._rroPartIndicateBudgetValues = new RroPartIndicateBudgetValues();
            }
            return this._rroPartIndicateBudgetValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroSumOutlayKosguTable", {
        get: function () {
            if (this._rroSumOutlayKosguTable == null) {
                this._rroSumOutlayKosguTable = new RroSumOutlayKosguTable();
            }
            return this._rroSumOutlayKosguTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroOutlayKosguTable", {
        get: function () {
            if (this._rroOutlayKosguTable == null) {
                this._rroOutlayKosguTable = new RroOutlayKosguTable();
            }
            return this._rroOutlayKosguTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroExpendSheduleHistoryTable", {
        get: function () {
            if (this._rroExpendSheduleHistoryTable == null) {
                this._rroExpendSheduleHistoryTable = new RroExpendSheduleHistoryTable();
            }
            return this._rroExpendSheduleHistoryTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroExpendSheduleTable", {
        get: function () {
            if (this._rroExpendSheduleTable == null) {
                this._rroExpendSheduleTable = new RroExpendSheduleTable();
            }
            return this._rroExpendSheduleTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OutlayAnalysisIndicatorExchangeDataTable", {
        get: function () {
            if (this._outlayAnalysisIndicatorExchangeDataTable == null) {
                this._outlayAnalysisIndicatorExchangeDataTable = new OutlayAnalysisIndicatorExchangeDataTable("OutlayAnalysisIndicatorExchangeData", ObasTableCollection.OutlayExchangeDataTable);
            }
            return this._outlayAnalysisIndicatorExchangeDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroSumObasAddAnalysisIndicatorTable", {
        get: function () {
            if (this._rroSumObasAddAnalysisIndicatorTable == null) {
                this._rroSumObasAddAnalysisIndicatorTable = new RroSumObasAddAnalysisIndicatorTable();
            }
            return this._rroSumObasAddAnalysisIndicatorTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroObasAddAnalysisIndicatorTable", {
        get: function () {
            if (ObasTableCollection._rroObasAddAnalysisIndicatorTable == null) {
                ObasTableCollection._rroObasAddAnalysisIndicatorTable = new RroObasAddAnalysisIndicatorTable();
            }
            return ObasTableCollection._rroObasAddAnalysisIndicatorTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroSumDataTable", {
        get: function () {
            if (this._rroSumDataTable == null) {
                this._rroSumDataTable = new RroSumDataTable();
            }
            return this._rroSumDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroSumObasTable", {
        get: function () {
            if (this._rroSumObasTable == null) {
                this._rroSumObasTable = new RroSumObasTable();
            }
            return this._rroSumObasTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroSumObasVersionsTable", {
        get: function () {
            if (this._rroSumObasVersionsTable == null) {
                this._rroSumObasVersionsTable = new RroSumObasVersionsTable();
            }
            return this._rroSumObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OutlayExchangeDataTable", {
        get: function () {
            if (this._outlayExchangeDataTable == null) {
                this._outlayExchangeDataTable = new OutlayExchangeDataTable();
            }
            return this._outlayExchangeDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroSumOutlayTable", {
        get: function () {
            if (this._rroSumOutlayTable == null) {
                this._rroSumOutlayTable = new RroSumOutlayTable();
            }
            return this._rroSumOutlayTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroOutlayTable", {
        get: function () {
            if (this._rroOutlayTable == null) {
                this._rroOutlayTable = new RroOutlayTable();
            }
            return this._rroOutlayTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroNpaTable", {
        get: function () {
            if (this._rroNpaTable == null) {
                this._rroNpaTable = new RroNpaTable("RRO_NPA");
            }
            return this._rroNpaTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "BudgetAuthoritySprTable", {
        get: function () {
            if (this._budgetAuthoritySprTable == null) {
                this._budgetAuthoritySprTable = new BudgetAuthoritySprTable();
            }
            return this._budgetAuthoritySprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OutlayStatusSprTable", {
        get: function () {
            if (this._outlayStatusSprTable == null) {
                this._outlayStatusSprTable = new OutlayStatusSprTable();
            }
            return this._outlayStatusSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "Coefficients05304SprTable", {
        get: function () {
            if (this._coefficients05304SprTable == null) {
                this._coefficients05304SprTable = new Coefficients05304SprTable();
            }
            return this._coefficients05304SprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SubvensionsSprTable", {
        get: function () {
            if (this._subvensionsSprTable == null) {
                this._subvensionsSprTable = new SubvensionsSprTable();
            }
            return this._subvensionsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "AddAnalysisFeatureSprtable", {
        get: function () {
            if (this._addAnalysisFeatureSprtable == null) {
                this._addAnalysisFeatureSprtable = new AddAnalysisFeatureSprtable();
            }
            return this._addAnalysisFeatureSprtable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OkvSprTable", {
        get: function () {
            if (this._okvSprTable == null) {
                this._okvSprTable = new OkvSprTable();
            }
            return this._okvSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroLimitsDetailsTable", {
        get: function () {
            if (ObasTableCollection._rroLimitsDetailsTable == null) {
                ObasTableCollection._rroLimitsDetailsTable = new RroLimitsDetailsTable();
            }
            return ObasTableCollection._rroLimitsDetailsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroSecurityTypeTable", {
        get: function () {
            if (ObasTableCollection._rroSecurityTypeTable == null) {
                ObasTableCollection._rroSecurityTypeTable = new RroSecurityTypeTable();
            }
            return ObasTableCollection._rroSecurityTypeTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroPlanTable", {
        get: function () {
            if (ObasTableCollection._rroPlanTable == null) {
                ObasTableCollection._rroPlanTable = new RroPlanTable();
            }
            return ObasTableCollection._rroPlanTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroObasKosguTable", {
        get: function () {
            if (ObasTableCollection._rroObasKosguTable == null) {
                ObasTableCollection._rroObasKosguTable = new RroObasKosguTable();
            }
            return ObasTableCollection._rroObasKosguTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroPedCountTable", {
        get: function () {
            if (ObasTableCollection._rroPedCountTable == null) {
                ObasTableCollection._rroPedCountTable = new RroPedCountTable();
            }
            return ObasTableCollection._rroPedCountTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroPedTable", {
        get: function () {
            if (ObasTableCollection._rroPedTable == null) {
                ObasTableCollection._rroPedTable = new RroPedTable();
            }
            return ObasTableCollection._rroPedTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroObasRecvisitsTable", {
        get: function () {
            if (ObasTableCollection._rroObasRecvisitsTable == null) {
                ObasTableCollection._rroObasRecvisitsTable = new RroObasRecvisitsTable();
            }
            return ObasTableCollection._rroObasRecvisitsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroObasNumbersTable", {
        get: function () {
            if (ObasTableCollection._rroObasNumbersTable == null) {
                ObasTableCollection._rroObasNumbersTable = new RroObasNumbersTable();
            }
            return ObasTableCollection._rroObasNumbersTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroObasVersionsTable", {
        get: function () {
            if (ObasTableCollection._rroObasVersionsTable == null) {
                ObasTableCollection._rroObasVersionsTable = new RroObasVersionsTable();
            }
            return ObasTableCollection._rroObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroObasTable", {
        get: function () {
            if (ObasTableCollection._rroObasTable == null) {
                ObasTableCollection._rroObasTable = new RroObasTable();
            }
            return ObasTableCollection._rroObasTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroKUDataTable", {
        get: function () {
            if (ObasTableCollection._rroKuDataTable == null) {
                ObasTableCollection._rroKuDataTable = new RroKuDataTable();
            }
            return ObasTableCollection._rroKuDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroLboTable", {
        get: function () {
            if (ObasTableCollection._rroLboTable == null) {
                ObasTableCollection._rroLboTable = new RroLboTable();
            }
            return ObasTableCollection._rroLboTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RroDataTable", {
        get: function () {
            if (ObasTableCollection._rroDataTable == null) {
                ObasTableCollection._rroDataTable = new RroDataTable();
            }
            return ObasTableCollection._rroDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "BuildParamsTable", {
        get: function () {
            if (ObasTableCollection._buildParams == null) {
                ObasTableCollection._buildParams = new BuildParamsTable();
            }
            return ObasTableCollection._buildParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SelectedFoivTable", {
        get: function () {
            if (ObasTableCollection._selectedFoivTable == null) {
                ObasTableCollection._selectedFoivTable = new SelectedFoivTable();
            }
            return ObasTableCollection._selectedFoivTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "NpaStatusesSprTable", {
        get: function () {
            if (this._npaStatusesSprTable == null) {
                this._npaStatusesSprTable = new NpaStatusesSprTable();
            }
            return this._npaStatusesSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "NpaRegSpheresSprTable", {
        get: function () {
            if (this._npaRegSpheresSprTable == null) {
                this._npaRegSpheresSprTable = new NpaRegSpheresSprTable();
            }
            return this._npaRegSpheresSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RecipientCategorySprTable", {
        get: function () {
            if (this._recipientCategorySprTable == null) {
                this._recipientCategorySprTable = new RecipientCategorySprTable();
            }
            return this._recipientCategorySprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PnoSprTable", {
        get: function () {
            if (this._pnoSprTable == null) {
                this._pnoSprTable = new PnoSprTable();
            }
            return this._pnoSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "CostTypeSpendObligationLinksTable", {
        get: function () {
            if (ObasTableCollection._costTypeSpendObligationLinksTable == null) {
                ObasTableCollection._costTypeSpendObligationLinksTable = new CostTypeSpendObligationLinksTable();
            }
            return ObasTableCollection._costTypeSpendObligationLinksTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ObasKbkLinksTable", {
        get: function () {
            if (ObasTableCollection._obasKbkLinksTable == null) {
                ObasTableCollection._obasKbkLinksTable = new ObasKbkLinksTable();
            }
            return ObasTableCollection._obasKbkLinksTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SubjPlanBudgGovProgLinksTable", {
        get: function () {
            if (ObasTableCollection._subjPlanBudgGovProgLinksTable == null) {
                ObasTableCollection._subjPlanBudgGovProgLinksTable = new SubjPlanBudgGovProgLinksTable();
            }
            return ObasTableCollection._subjPlanBudgGovProgLinksTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SubjPlanBudgFoivLinksTable", {
        get: function () {
            if (ObasTableCollection._subjPlanBudgFoivLinksTable == null) {
                ObasTableCollection._subjPlanBudgFoivLinksTable = new SubjPlanBudgFoivLinksTable();
            }
            return ObasTableCollection._subjPlanBudgFoivLinksTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "NationalProjectsSprTable", {
        get: function () {
            if (ObasTableCollection._nationalProjectsSprTable == null) {
                ObasTableCollection._nationalProjectsSprTable = new NationalProjectsSprTable();
            }
            return ObasTableCollection._nationalProjectsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "DepartmentSprTable", {
        get: function () {
            if (ObasTableCollection._departmentSprTable == null) {
                ObasTableCollection._departmentSprTable = new DepartmentSprTable();
            }
            return ObasTableCollection._departmentSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "KuDataTypeSprTable", {
        get: function () {
            if (ObasTableCollection._kuDataTypeSprTable == null) {
                ObasTableCollection._kuDataTypeSprTable = new KuDataTypeSprTable();
            }
            return ObasTableCollection._kuDataTypeSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PedTypeSprTable", {
        get: function () {
            if (ObasTableCollection._pedTypeSprTable == null) {
                ObasTableCollection._pedTypeSprTable = new PedTypeSprTable();
            }
            return ObasTableCollection._pedTypeSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SecurityTypesTable", {
        get: function () {
            if (ObasTableCollection._securityTypesTable == null) {
                ObasTableCollection._securityTypesTable = new SecurityTypesTable();
            }
            return ObasTableCollection._securityTypesTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "StatusSprTable", {
        get: function () {
            if (ObasTableCollection._statusSprTable == null) {
                ObasTableCollection._statusSprTable = new StatusSprTable();
            }
            return ObasTableCollection._statusSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ObasSprTable", {
        get: function () {
            if (ObasTableCollection._obasSprTable == null) {
                ObasTableCollection._obasSprTable = new ObasSprTable();
            }
            return ObasTableCollection._obasSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "FileTypeTable", {
        get: function () {
            if (ObasTableCollection._filetypeTable == null) {
                ObasTableCollection._filetypeTable = new FileTypeTable();
            }
            return ObasTableCollection._filetypeTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "FoivTable", {
        get: function () {
            if (ObasTableCollection._foivTable == null) {
                ObasTableCollection._foivTable = new FoivTable();
            }
            return ObasTableCollection._foivTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "FcrTable", {
        get: function () {
            if (ObasTableCollection._fcrTable == null) {
                ObasTableCollection._fcrTable = new FcrTable();
            }
            return ObasTableCollection._fcrTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "CsrTable", {
        get: function () {
            if (ObasTableCollection._csrTable == null) {
                ObasTableCollection._csrTable = new CsrTable();
            }
            return ObasTableCollection._csrTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "GovermentProgramTable", {
        get: function () {
            if (ObasTableCollection._govermentProgramTable == null) {
                ObasTableCollection._govermentProgramTable = new GovermentProgramTable();
            }
            return ObasTableCollection._govermentProgramTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SubProgramTable", {
        get: function () {
            if (ObasTableCollection._subProgramTable == null) {
                ObasTableCollection._subProgramTable = new SubProgramTable();
            }
            return ObasTableCollection._subProgramTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "DirectionCostTable", {
        get: function () {
            if (ObasTableCollection._directionCostTable == null) {
                ObasTableCollection._directionCostTable = new DirectionCostTable();
            }
            return ObasTableCollection._directionCostTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "MainActionTable", {
        get: function () {
            if (ObasTableCollection._mainActionTable == null) {
                ObasTableCollection._mainActionTable = new MainActionTable();
            }
            return ObasTableCollection._mainActionTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "CostTypeTable", {
        get: function () {
            if (ObasTableCollection._costTypeTable == null) {
                ObasTableCollection._costTypeTable = new CostTypeTable();
            }
            return ObasTableCollection._costTypeTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "KosguSprTable", {
        get: function () {
            if (ObasTableCollection._kosguSprTable == null) {
                ObasTableCollection._kosguSprTable = new KosguSprTable();
            }
            return ObasTableCollection._kosguSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ChangeTypeTable", {
        get: function () {
            if (ObasTableCollection._changeTypeTable == null) {
                ObasTableCollection._changeTypeTable = new ChangeTypeTable();
            }
            return ObasTableCollection._changeTypeTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "NpaTypeTable", {
        get: function () {
            if (ObasTableCollection._npaTypeTable == null) {
                ObasTableCollection._npaTypeTable = new NpaTypeTable();
            }
            return ObasTableCollection._npaTypeTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PedStateTable", {
        get: function () {
            if (ObasTableCollection._pedStateTable == null) {
                ObasTableCollection._pedStateTable = new PedStateTable();
            }
            return ObasTableCollection._pedStateTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OrganizationTable", {
        get: function () {
            if (ObasTableCollection._organizationTable == null) {
                ObasTableCollection._organizationTable = new OrganizationTable();
            }
            return ObasTableCollection._organizationTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "RateDollarActualTable", {
        get: function () {
            if (ObasTableCollection._rateDollarActualTable == null) {
                ObasTableCollection._rateDollarActualTable = new RateDollarActualTable();
            }
            return ObasTableCollection._rateDollarActualTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "DollarRateTable", {
        get: function () {
            if (ObasTableCollection._dollarRateTable == null) {
                ObasTableCollection._dollarRateTable = new DollarRateTransposedObasTable();
            }
            return ObasTableCollection._dollarRateTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ObasVersionSumTable", {
        get: function () {
            if (ObasTableCollection._obasVersionVrSumTable == null) {
                ObasTableCollection._obasVersionVrSumTable = new AggrTransposedObasTable("tRRO_OBAS_VERSIONS", ["KBK_OwnerVR", "ChangeTypeCode", "DateApprove"], []);
            }
            return ObasTableCollection._obasVersionVrSumTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ServiceWorkIndicatorsSprTable", {
        get: function () {
            if (this._serviceWorkIndicatorsSprTable == null) {
                this._serviceWorkIndicatorsSprTable = new ServiceWorkIndicatorsSprTable();
            }
            return this._serviceWorkIndicatorsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ServiceWorkSprTable", {
        get: function () {
            if (this._serviceWorkSprTable == null) {
                this._serviceWorkSprTable = new ServiceWorkSprTable();
            }
            return this._serviceWorkSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PublicCommitmentsSprTable", {
        get: function () {
            if (this._publicCommitmentsSprTable == null) {
                this._publicCommitmentsSprTable = new PublicCommitmentsSprTable();
            }
            return this._publicCommitmentsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SubgroupNormativeExpensesSprTable", {
        get: function () {
            if (this._subgroupNormativeExpensesSprTable == null) {
                this._subgroupNormativeExpensesSprTable = new SubgroupNormativeExpensesSprTable();
            }
            return this._subgroupNormativeExpensesSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "FederalEmployeePositionsSprTable", {
        get: function () {
            if (this._federalEmployeePositionsSprTable == null) {
                this._federalEmployeePositionsSprTable = new FederalEmployeePositionsSprTable();
            }
            return this._federalEmployeePositionsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PaymentReestrSprTable", {
        get: function () {
            if (this._paymentReestrSprTable == null) {
                this._paymentReestrSprTable = new PaymentReestrSprTable();
            }
            return this._paymentReestrSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "NsotSprTable", {
        get: function () {
            if (this._nsotSprTable == null) {
                this._nsotSprTable = new NsotSprTable();
            }
            return this._nsotSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ZagranPositionsSprTable", {
        get: function () {
            if (this._zagranPositionsSprTable == null) {
                this._zagranPositionsSprTable = new ZagranPositionsSprTable();
            }
            return this._zagranPositionsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OkeiSprTable", {
        get: function () {
            if (this._okeiSprTable == null) {
                this._okeiSprTable = new OkeiSprTable();
            }
            return this._okeiSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OkvedSprTable", {
        get: function () {
            if (this._okvedSprTable == null) {
                this._okvedSprTable = new OkvedSprTable();
            }
            return this._okvedSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "InvestigationTypesSprTable", {
        get: function () {
            if (this._investigationTypesSprTable == null) {
                this._investigationTypesSprTable = new InvestigationTypesSprTable();
            }
            return this._investigationTypesSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "AddAnalysisIndicatorSprTable", {
        get: function () {
            if (ObasTableCollection._addAnalysisIndicatorSprTable == null) {
                ObasTableCollection._addAnalysisIndicatorSprTable = new AddAnalysisIndicatorSprTable();
            }
            return ObasTableCollection._addAnalysisIndicatorSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PostCategoryTable", {
        get: function () {
            if (ObasTableCollection._postCategorySprTable == null) {
                ObasTableCollection._postCategorySprTable = new PostCategorySprTable();
            }
            return ObasTableCollection._postCategorySprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "AuthorityTypeTable", {
        get: function () {
            if (ObasTableCollection._authorityTypeSprTable == null) {
                ObasTableCollection._authorityTypeSprTable = new AuthorityTypeSprTable();
            }
            return ObasTableCollection._authorityTypeSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PositionsSprTable", {
        get: function () {
            if (ObasTableCollection._positionsSprTable == null) {
                ObasTableCollection._positionsSprTable = new PositionsSprTable();
            }
            return ObasTableCollection._positionsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "InsuranceRowsSprTable", {
        get: function () {
            if (ObasTableCollection._insuranceRowsSprTable == null) {
                ObasTableCollection._insuranceRowsSprTable = new InsuranceRowsSprTable();
            }
            return ObasTableCollection._insuranceRowsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OksmSprTable", {
        get: function () {
            if (this._oksmSprTable == null) {
                this._oksmSprTable = new OksmSprTable();
            }
            return this._oksmSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ConsularPositionsSprTable", {
        get: function () {
            if (this._consularPositionsSprTable == null) {
                this._consularPositionsSprTable = new ConsularPositionsSprTable();
            }
            return this._consularPositionsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "FcpSprTable", {
        get: function () {
            if (this._fcpSprTable == null) {
                this._fcpSprTable = new FcpSprTable();
            }
            return this._fcpSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "CostTypeKosguLinksTable", {
        get: function () {
            if (ObasTableCollection._costTypeKosguLinksTable == null) {
                ObasTableCollection._costTypeKosguLinksTable = new CostTypeKosguLinksTable();
            }
            return ObasTableCollection._costTypeKosguLinksTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OkpdSprTable", {
        get: function () {
            if (this._okpdSprTable == null) {
                this._okpdSprTable = new OkpdSprTable();
            }
            return this._okpdSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OtherPaymentsSprTable", {
        get: function () {
            if (this._otherPaymentsSprTable == null) {
                this._otherPaymentsSprTable = new OtherPaymentsSprTable();
            }
            return this._otherPaymentsSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "TargetSubsidieSprTable", {
        get: function () {
            if (this._targetSubsidieSprTable == null) {
                this._targetSubsidieSprTable = new TargetSubsidieSprTable();
            }
            return this._targetSubsidieSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "AgriculturalMachinerySprTable", {
        get: function () {
            if (this._agriculturalMachinerySprTable == null) {
                this._agriculturalMachinerySprTable = new AgriculturalMachinerySprTable();
            }
            return this._agriculturalMachinerySprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "ReserveDirectionsSprTable", {
        get: function () {
            if (this._reserveDirectionsSprTableSprTable == null) {
                this._reserveDirectionsSprTableSprTable = new ReserveDirectionsSprTable();
            }
            return this._reserveDirectionsSprTableSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "OrgTaxPrivilegeSprTable", {
        get: function () {
            if (this._orgTaxPrivilegeSprTable == null) {
                this._orgTaxPrivilegeSprTable = new OrgTaxPrivilegeSprTable();
            }
            return this._orgTaxPrivilegeSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "LandCategorySprTable", {
        get: function () {
            if (this._landCategorySprTable == null) {
                this._landCategorySprTable = new LandCategorySprTable();
            }
            return this._landCategorySprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "LandTaxPrivilegeSprTable", {
        get: function () {
            if (this._landTaxPrivilegeSprTable == null) {
                this._landTaxPrivilegeSprTable = new LandTaxPrivilegeSprTable();
            }
            return this._landTaxPrivilegeSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "PaymentTypeSprTable", {
        get: function () {
            if (this._paymentTypeSprTable == null) {
                this._paymentTypeSprTable = new PaymentTypeSprTable();
            }
            return this._paymentTypeSprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "DualTable", {
        get: function () {
            if (ObasTableCollection._dualTable == null) {
                ObasTableCollection._dualTable = new ObasTable("dual", [BaseObasTableFields.RecordKeyField.Id], true);
            }
            return ObasTableCollection._dualTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SprSubject", {
        get: function () {
            if (ObasTableCollection._rrosprSubject == null) {
                ObasTableCollection._rrosprSubject = new RroSprSubject();
            }
            return ObasTableCollection._rrosprSubject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SprScienceCity", {
        get: function () {
            if (ObasTableCollection._rrosprScienceCity == null) {
                ObasTableCollection._rrosprScienceCity = new RroSprScienceCity();
            }
            return ObasTableCollection._rrosprScienceCity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SprSecurityAdmTerrEntity", {
        get: function () {
            if (ObasTableCollection._rrosprSecurityAdmTerrEntity == null) {
                ObasTableCollection._rrosprSecurityAdmTerrEntity = new RroSprSecurityAdmTerrEntity();
            }
            return ObasTableCollection._rrosprSecurityAdmTerrEntity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SprMunicipalEntity", {
        get: function () {
            if (ObasTableCollection._rrosprMunicipalEntity == null) {
                ObasTableCollection._rrosprMunicipalEntity = new RroSprMunicipalEntity();
            }
            return ObasTableCollection._rrosprMunicipalEntity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "SprTypeAssistance", {
        get: function () {
            if (ObasTableCollection._rroSprTypeAssistance == null) {
                ObasTableCollection._rroSprTypeAssistance = new RroTypeAssistance();
            }
            return ObasTableCollection._rroSprTypeAssistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "Faips", {
        get: function () {
            if (ObasTableCollection._faips == null) {
                ObasTableCollection._faips = new Faips();
            }
            return ObasTableCollection._faips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableCollection, "CorrectionFactorsTable", {
        get: function () {
            if (ObasTableCollection._correctionFactorsTable == null) {
                ObasTableCollection._correctionFactorsTable = new CorrectionFactorsSprTable();
            }
            return ObasTableCollection._correctionFactorsTable;
        },
        enumerable: true,
        configurable: true
    });
    return ObasTableCollection;
}());
ObasTableCollection._rroObasVersionsTable = null;
ObasTableCollection._rroObasTable = null;
ObasTableCollection._rroDataTable = null;
ObasTableCollection._rroPedTable = null;
ObasTableCollection._rroPedCountTable = null;
ObasTableCollection._rroKuDataTable = null;
ObasTableCollection._rroObasNumbersTable = null;
ObasTableCollection._rroObasRecvisitsTable = null;
ObasTableCollection._rroObasKosguTable = null;
ObasTableCollection._rroLboTable = null;
ObasTableCollection._rroPlanTable = null;
ObasTableCollection._rroSecurityTypeTable = null;
ObasTableCollection._buildParams = null;
ObasTableCollection._selectedFoivTable = null;
ObasTableCollection._kuDataTypeSprTable = null;
ObasTableCollection._rroLimitsDetailsTable = null;
ObasTableCollection._rroNpaTable = null;
ObasTableCollection._rroOutlayTable = null;
ObasTableCollection._rroSumOutlayTable = null;
ObasTableCollection._outlayExchangeDataTable = null;
ObasTableCollection._rroSumObasVersionsTable = null;
ObasTableCollection._rroSumObasTable = null;
ObasTableCollection._rroSumDataTable = null;
ObasTableCollection._rroObasAddAnalysisIndicatorTable = null;
ObasTableCollection._rroSumObasAddAnalysisIndicatorTable = null;
ObasTableCollection._outlayAnalysisIndicatorExchangeDataTable = null;
ObasTableCollection._rroExpendSheduleTable = null;
ObasTableCollection._rroExpendSheduleHistoryTable = null;
ObasTableCollection._rroOutlayKosguTable = null;
ObasTableCollection._rroSumOutlayKosguTable = null;
ObasTableCollection._rroPartIndicateBudgetValues = null;
ObasTableCollection._rrosprSubject = null;
ObasTableCollection._rrosprScienceCity = null;
ObasTableCollection._rrosprSecurityAdmTerrEntity = null;
ObasTableCollection._rrosprMunicipalEntity = null;
ObasTableCollection._rroSprTypeAssistance = null;
ObasTableCollection._faips = null;
ObasTableCollection._correctionFactorsTable = null;
ObasTableCollection._obasSprTable = null;
ObasTableCollection._statusSprTable = null;
ObasTableCollection._filetypeTable = null;
ObasTableCollection._foivTable = null;
ObasTableCollection._fcrTable = null;
ObasTableCollection._csrTable = null;
ObasTableCollection._directionCostTable = null;
ObasTableCollection._costTypeTable = null;
ObasTableCollection._mainActionTable = null;
ObasTableCollection._govermentProgramTable = null;
ObasTableCollection._subProgramTable = null;
ObasTableCollection._kosguSprTable = null;
ObasTableCollection._securityTypesTable = null;
ObasTableCollection._departmentSprTable = null;
ObasTableCollection._nationalProjectsSprTable = null;
ObasTableCollection._subjPlanBudgGovProgLinksTable = null;
ObasTableCollection._subjPlanBudgFoivLinksTable = null;
ObasTableCollection._obasKbkLinksTable = null;
ObasTableCollection._costTypeSpendObligationLinksTable = null;
ObasTableCollection._npaTypeTable = null;
ObasTableCollection._pnoSprTable = null;
ObasTableCollection._recipientCategorySprTable = null;
ObasTableCollection._npaRegSpheresSprTable = null;
ObasTableCollection._npaStatusesSprTable = null;
ObasTableCollection._outlayStatusSprTable = null;
ObasTableCollection._budgetAuthoritySprTable = null;
ObasTableCollection._postCategorySprTable = null;
ObasTableCollection._authorityTypeSprTable = null;
ObasTableCollection._positionsSprTable = null;
ObasTableCollection._insuranceRowsSprTable = null;
ObasTableCollection._oksmSprTable = null;
ObasTableCollection._consularPositionsSprTable = null;
ObasTableCollection._fcpSprTable = null;
ObasTableCollection._costTypeKosguLinksTable = null;
ObasTableCollection._okpdSprTable = null;
ObasTableCollection._otherPaymentsSprTable = null;
ObasTableCollection._addAnalysisIndicatorSprTable = null;
ObasTableCollection._investigationTypesSprTable = null;
ObasTableCollection._okvedSprTable = null;
ObasTableCollection._okeiSprTable = null;
ObasTableCollection._zagranPositionsSprTable = null;
ObasTableCollection._nsotSprTable = null;
ObasTableCollection._paymentReestrSprTable = null;
ObasTableCollection._federalEmployeePositionsSprTable = null;
ObasTableCollection._subgroupNormativeExpensesSprTable = null;
ObasTableCollection._publicCommitmentsSprTable = null;
ObasTableCollection._serviceWorkSprTable = null;
ObasTableCollection._serviceWorkIndicatorsSprTable = null;
ObasTableCollection._targetSubsidieSprTable = null;
ObasTableCollection._agriculturalMachinerySprTable = null;
ObasTableCollection._reserveDirectionsSprTableSprTable = null;
ObasTableCollection._orgTaxPrivilegeSprTable = null;
ObasTableCollection._landCategorySprTable = null;
ObasTableCollection._landTaxPrivilegeSprTable = null;
ObasTableCollection._okvSprTable = null;
ObasTableCollection._addAnalysisFeatureSprtable = null;
ObasTableCollection._rateDollarActualTable = null;
ObasTableCollection._subvensionsSprTable = null;
ObasTableCollection._coefficients05304SprTable = null;
ObasTableCollection._changeTypeTable = null;
ObasTableCollection._pedStateTable = null;
ObasTableCollection._pedTypeSprTable = null;
ObasTableCollection._dollarRateTable = null;
ObasTableCollection._obasVersionVrSumTable = null;
ObasTableCollection._dualTable = null;
ObasTableCollection._organizationTable = null;
ObasTableCollection._paymentTypeSprTable = null;
