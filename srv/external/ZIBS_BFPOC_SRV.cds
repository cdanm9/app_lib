/* checksum : ef01f201ccfbbbc0ce76796687c803c2 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZIBS_BFPOC_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.VENDORF4Set {
  @sap.unicode : 'false'
  @sap.label : 'Vendor'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Lifnr : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Region'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Regio : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Name 1'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Name1 : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Bezei : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 3'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Stcd3 : String(18) not null;
  @sap.unicode : 'false'
  @sap.label : 'PAN'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  J1ipanno : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.POC_ATTACHSet {
  @sap.unicode : 'false'
  @sap.label : 'Request Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key RequestNo : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Item : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Phys. Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PhioId : String(32) not null;
  @sap.unicode : 'false'
  @sap.label : 'Text (200 char)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  FileTitle : String(200) not null;
  @sap.unicode : 'false'
  @sap.label : 'MimeType'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Mimetype : String(100) not null;
  @sap.unicode : 'false'
  @sap.label : 'File Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Filename : String(100) not null;
  @sap.unicode : 'false'
  @sap.label : 'XString'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Value : LargeString not null;
  @Core.MediaType : 'application/octet-stream'
  blob : LargeBinary;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.HEADERSet {
  @sap.unicode : 'false'
  @sap.label : 'REQUEST_NO'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key RequestNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'VENDOR_CODE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VendorCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'VENDOR_NAME'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VendorName : String(50);
  @sap.unicode : 'false'
  @sap.label : 'VENDOR_INV'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VendorInv : String(16);
  @sap.unicode : 'false'
  @sap.label : 'VENDOR_STATE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VendorState : String(50);
  @sap.unicode : 'false'
  @sap.label : 'VENDOR_GST'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VendorGst : String(16);
  @sap.unicode : 'false'
  @sap.label : 'VENDOR_INV_AMT'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VendorInvAmt : String(10);
  @sap.unicode : 'false'
  @sap.label : 'COMPANY_STATE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CompanyState : String(50);
  @sap.unicode : 'false'
  @sap.label : 'COMPANY_GST'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CompanyGst : String(16);
  @sap.unicode : 'false'
  @sap.label : 'COMPANY_BP'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CompanyBp : String(4);
  @sap.unicode : 'false'
  @sap.label : 'CREDIT_TYPE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CreditType : String(30);
  @sap.unicode : 'false'
  @sap.label : 'ORG_UNIT'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  OrgUnit : String(30);
  @sap.unicode : 'false'
  @sap.label : 'STATUS'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Status : String(10);
  @sap.unicode : 'false'
  @sap.label : 'LEVEL'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Zlevel : String(10);
  @sap.unicode : 'false'
  @sap.label : 'SAP_DOCUMENT_NO'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SapDocumentNo : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Fiscal Year'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  FiscalYear : String(4);
  @cds.ambiguous : 'missing on condition?'
  HEADERTOITEM : Association to many ZIBS_BFPOC_SRV.ITEMSet on HEADERTOITEM.RequestNo = RequestNo;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.ITEMSet {
  @sap.unicode : 'false'
  @sap.label : 'REQUEST_NO'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key RequestNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'INVOICE_ITEM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key InvoiceItem : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'GL_CODE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  GlCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'GL_DESCRIPTION'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  GlDescription : String(60);
  @sap.unicode : 'false'
  @sap.label : 'RATE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Rate : String(10);
  @sap.unicode : 'false'
  @sap.label : 'HSNCODE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Hsncode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'GST'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Gst : String(4);
  @sap.unicode : 'false'
  @sap.label : 'PROFIT_CENTER'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ProfitCenter : String(10);
  @sap.unicode : 'false'
  @sap.label : 'SHIP_TO'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ShipTo : String(40);
  @sap.unicode : 'false'
  @sap.label : 'COST_CENTER'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CostCenter : String(10);
  @sap.unicode : 'false'
  @sap.label : 'COST_ALLOCATION'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CostAllocation : String(4);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.BPDETAILSSet {
  @sap.unicode : 'false'
  @sap.label : 'State Tax No.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key StateInsc : String(18) not null;
  @sap.unicode : 'false'
  @sap.label : 'Name 1'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Name : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Business Place'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Branch : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 3'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Gstin : String(18) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.COSTCENTERF4Set {
  @sap.unicode : 'false'
  @sap.label : 'Cost Center'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Kostl : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Ltext : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.GLF4Set {
  @sap.unicode : 'false'
  @sap.label : 'G/L Account'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Saknr : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Long Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Txt50 : String(50) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZIBS_BFPOC_SRV.STATESet {
  @sap.unicode : 'false'
  @sap.label : 'Region (State, Province, County)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key BLAND : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  BEZEI : String(20) not null;
};

