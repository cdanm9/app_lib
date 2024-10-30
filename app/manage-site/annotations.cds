using toolPage as service from '../../srv/tool-page';
annotate service.MasterApps with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Sequence',
                Value : sequence,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Icon',
                Value : icon,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Application',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Role',
                Value : btpRole,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Application Type',
                Value : appType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Icon URI',
                Value : iconUri,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Application',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Sub Application',
            ID : 'SubApplication',
            Target : 'to_SubApp/@UI.LineItem#SubApplication',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Sequence',
            Value : sequence,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Icon',
            Value : icon,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Application',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Role',
            Value : btpRole,
        },
        {
            $Type : 'UI.DataField',
            Value : appType,
            Label : 'Application Type',
        },
    ],
    UI.SelectionFields : [
        btpRole,
        appType,
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : sequence,
                    Descending : false,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Apps',
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        TypeName : '',
        TypeNamePlural : '',
        ImageUrl : icon,
    },
);

annotate service.MasterApps with {
    btpRole @(
        Common.Label : 'Application Role',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'MasterRoleCollections',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : btpRole,
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'description',
                },
            ],
            Label : 'Application Role',
        },
        Common.ValueListWithFixedValues : false,
    )
};

annotate service.MasterApps with {
    appType @(
        Common.Label : 'Application Type',
        Common.Text : to_AppType.desc,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'MasterAppTypes',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : appType,
                    ValueListProperty : 'code',
                },
            ],
            Label : 'Application Type',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.MasterAppTypes with {
    code @Common.Text : {
        $value : desc,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

annotate service.MasterRoleCollections with {
    name @Common.Text : description
};

annotate service.MasterSubApps with @(
    UI.LineItem #SubApplication : [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Application',
        },
        {
            $Type : 'UI.DataField',
            Value : icon,
            Label : 'Icon',
        },
        {
            $Type : 'UI.DataField',
            Value : iconUri,
            Label : 'Icon URI',
        },
        {
            $Type : 'UI.DataField',
            Value : appUrl,
            Label : 'Application Link',
        },
    ]
);

annotate service.MasterAppResources with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : appName,
            Label : 'Application Description',
        },
        {
            $Type : 'UI.DataField',
            Value : resource,
            Label : 'Resource',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Resources',
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Resource',
            ID : 'Resource',
            Target : '@UI.FieldGroup#Resource',
        },
    ],
    UI.FieldGroup #Resource : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : appName,
                Label : 'Application Description',
            },
            {
                $Type : 'UI.DataField',
                Value : resource,
                Label : 'Resource',
            },
            {
                $Type : 'UI.DataField',
                Value : resourceType,
                Label : 'Resource Type',
            },
        ],
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : appName,
        },
        TypeName : '',
        TypeNamePlural : '',
        ImageUrl : resource,
    },
);

annotate service.MasterAppResources with {
    resourceType @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'MasterAppResourceTypes',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : resourceType,
                    ValueListProperty : 'code',
                },
            ],
            Label : 'Resource Type',
        },
        Common.ValueListWithFixedValues : true,
        Common.Text : {
            $value : to_ResourceType.desc,
            ![@UI.TextArrangement] : #TextOnly,
        },
)};

annotate service.MasterAppResourceTypes with {
    code @Common.Text : {
        $value : desc,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

