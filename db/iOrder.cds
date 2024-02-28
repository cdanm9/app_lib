namespace iorder;

entity Header {

    key ORDER_NO      : Integer;
        CREATION_DATE : DateTime;
        CREATED_BY    : String(100);
        CITY         : String(100);   
        PRIORITY     : String(20);
        NET_AMOUNT    : Decimal(16, 3);
        CURRENCY     : String(10);
        STATUS       : String(20);
        ToItem       : Association to many iorder.Item
                           on ToItem.ORDER_NO = ORDER_NO;
};


entity Item {

    key ORDER_NO    : Integer;
    key ITEM       : Integer;
        CLASS      : String(40);
        MATERIAL   : String(100);
        QUANTITY   : Integer;
        UNIT_PRICE  : Decimal(16, 3);
        TOTAL_PRICE : Decimal(16, 3);
        CURRENCY   : String(10);
        RKIT       : Integer;
        ACKIT      : Integer;
        GKIT       : Integer;
};


entity CityVH {

    key CITY_ID : Integer;
        CITY   : String(100);

};


entity StatusVH {

    key STATUS_ID : Integer;
        STATUS   : String(20);

};


entity ClassVH {

    key CLASS_ID : Integer;
        CLASS   : String(40);

};


entity MaterailSH {

    key MATERIAL_ID  : Integer;
        MATERIAL_DSC : String(40);
        UNIT_PRICE   : Decimal(16, 3);
        CURRENCY    : String(10);

};
