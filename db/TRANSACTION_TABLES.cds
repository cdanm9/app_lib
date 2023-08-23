namespace VENDOR_PORTAL;

entity APPR_VENDOR_REQ {

    key REQ_ID   : Integer;
        APPROVER : String(20);
        APPR_REJ : String(1);
        APPROVE  : String(1);
        REJECT   : String(1);
        REMARK   : String(200);
        ACT_DAT  : Date;

}


entity MASTER_REGFORM_FIELDS_MANDATORY {
    key CCODE     : String(10);
    key TYPE      : Integer;
        // Section 1: General Information -------------------------------------------------------
        // Group 1: Company Information
        // Type 1: Head Quarter Information
        S1G1T1F1  : String(1); //Company Name (English)
        S1G1T1F2  : String(1); //Company Name (Arabic)
        S1G1T1F3  : String(1); //Mailing Address
        S1G1T1F13 : String(1); //Street 2
        S1G1T1F14 : String(1); //Street 3
        S1G1T1F15 : String(1); //Street 4
        S1G1T1F4  : String(1); //City
        S1G1T1F5  : String(1); //State
        S1G1T1F6  : String(1); //Country
        S1G1T1F7  : String(1); //Postal code
        S1G1T1F8  : String(1); //Contact No.
        S1G1T1F9  : String(1); //Fax No.
        S1G1T1F10 : String(1); //Email
        S1G1T1F11 : String(1); //Website
        S1G1T1F12 : String(1); //District

        //Type 2: Other Office details
        S1G1T2F1  : String(1); //Whole Table - Registering Office Details
        S1G1T2F2  : String(1); //Add Additional Other Office Details
        S1G1T2F3  : String(1); //Office Address - Street 1
        S1G1T2F12 : String(1); //Street 2
        S1G1T2F13 : String(1); //Street 3
        S1G1T2F14 : String(1); //Street 4
        S1G1T2F4  : String(1); //City
        S1G1T2F5  : String(1); //State
        S1G1T2F6  : String(1); //Country
        S1G1T2F7  : String(1); //Postal code/ZIP Code/ PO Box No.
        S1G1T2F8  : String(1); //Office Contact No.
        S1G1T2F9  : String(1); //Fax No.
        S1G1T2F10 : String(1); //Email
        S1G1T2F11 : String(1); //District


        // Group 2: Contact Details
        // Type 1: Head of the company (MD / Chariman)
        S1G2T1F1  : String(1); //Name
        S1G2T1F2  : String(1); //Designation
        S1G2T1F3  : String(1); //Email Address
        S1G2T1F4  : String(1); //Contact Number
        S1G2T1F5  : String(1); //Mobile Number
        S1G2T1F6  : String(1); //Nationality
        S1G2T1F7  : String(1); //City
        S1G2T1F8  : String(1); //State
        S1G2T1F9  : String(1); //Postal code/ZIP Code/ PO Box No.

        // Type 2: Authorised Contact Details
        S1G2T2F1  : String(1); //Name
        S1G2T2F2  : String(1); //Other Contact Details
        S1G2T2F3  : String(1); //Designation
        S1G2T2F4  : String(1); //Email Address
        S1G2T2F5  : String(1); //Contact Number
        S1G2T2F6  : String(1); //Nationality
        S1G2T2F7  : String(1); //Passport #
        S1G2T2F8  : String(1); //Mobile Number
        S1G2T2F9  : String(1); //City
        S1G2T2F10 : String(1); //State
        S1G2T2F11 : String(1); //Postal code/ZIP Code/ PO Box No.

        // Group 3: Legal Structure
        // Type 1: Registering office legal structure
        S1G3T1F1  : String(1); //Type of legal structure

        // Group 4: Business Information
        // Type 1: A:: same Business Information type
        S1G4T1F1  : String(1); //Year of establishment
        S1G4T2F1  : String(1); //No. of Employees
        S1G4T3F1  : String(1); //No. of Employees in Engineering
        S1G4T4F1  : String(1); //No. of Employees in Quality
        S1G4T5F1  : String(1); //No. of Employees in Production
        S1G4T6F1  : String(1); //No. of Employees in Administration
        S1G4T7F1  : String(1); //No. of Employees in Other functions
        S1G4T8F1  : String(1); //Type of Business
        S1G4T9F1  : String(1); //Trade License No.

        // Group 5: Supplier Category
        // Type 1: Supplier Category's Information
        S1G5T1F1  : String(1); //Supplier Category
        S1G5T2F1  : String(1); //Supplier Type

        // Section 2: Financial Information -------------------------------------------------------
        // Group 1: Payment Information
        // Type 1: Bank Account details
        S2G1T1F1  : String(1); //Bank Name
        S2G1T1F2  : String(1); //Beneficiary Name
        S2G1T1F3  : String(1); //Account Number
        S2G1T1F4  : String(1); //Branch Name
        S2G1T1F5  : String(1); //IBAN Number
        S2G1T1F6  : String(1); //Swift code
        S2G1T1F7  : String(1); //BIC code
        S2G1T1F8  : String(1); //Routing code
        S2G1T1F9  : String(1); //Other Codes
        S2G1T1F10 : String(1); //Bank Country
        S2G1T1F11 : String(1); //Bank Currency

        // Type 2: Payment Type
        S2G1T2F10 : String(1); //Payment Method
        S2G1T2F11 : String(1); //Payment Terms / Credit Period
        S2G1T2F12 : String(1); //Invoice Currency

        // Type 3: Value Added Tax (VAT) Information
        S2G1T3F13 : String(1); //VAT Registration Number
        S2G1T3F14 : String(1); //VAT Registration Date

        // Type 4: DUNS Number
        S2G1T4F15 : String(1); //DUNS Number

        // Type 5: Additional Paymenr Details
        S2G1T5F1  : String(1); //Bank Name
        S2G1T5F2  : String(1); ////Other Payment Details
        S2G1T5F3  : String(1); //Beneficiary Name
        S2G1T5F4  : String(1); //Account Number
        S2G1T5F5  : String(1); //Branch Name
        S2G1T5F6  : String(1); //IBAN Number
        S2G1T5F7  : String(1); //Swift code
        S2G1T5F8  : String(1); //Routing code
        S2G1T5F9  : String(1); //Other Codes
        S2G1T5F10 : String(1); //Bank Country
        S2G1T5F11 : String(1); //Bank Currency
        S2G1T5F12 : String(1); //VAT Registration Number
        S2G1T5F13 : String(1); //VAT Registration Date


        // Group 2: Financial Information
        // Type 1: Bank Account details
        S2G2T1F1  : String(1); //Total Revenue
        S2G2T2F1  : String(1); //Net Profit/Loss
        S2G2T3F1  : String(1); //Total Assets
        S2G2T4F1  : String(1); //Total Equity
        S2G2T5F1  : String(1); //Currency

        // Group 3: Owner's Information
        // Type 1: Owner's Information
        S2G3T1F1  : String(1); //Owner's name
        S2G3T1F2  : String(1); //Add Additional Owner's information
        S2G3T1F3  : String(1); //Owner's Nationality
        S2G3T1F4  : String(1); //Owner's Phone No
        S2G3T1F5  : String(1); //Owner's Passport  No
        S2G3T1F6  : String(1); //Owner's % of ownership

        // Section 3: Operational Information -------------------------------------------------------
        // Group 1: Products / Service description
        // Type 1: Product/service details
        S3G1T1F1  : String(1); // Product Name
        S3G1T1F2  : String(1); // Add additional product information
        S3G1T1F3  : String(1); // Product description
        S3G1T1F4  : String(1); // Category of product
        S3G1T1F5  : String(1); // Type (eg: Products/Services)

        // Group 2: Operational capacity
        // Type 1: Production details
        S3G2T1F1  : String(1); // Production capacity
        // Type 2: Plant location
        S3G2T2F1  : String(1); // Country
        S3G2T2F2  : String(1); // Add additional Operational/production information
        S3G2T2F3  : String(1); // City
        S3G2T2F4  : String(1); // Will this plant will be used to manufacture products/services
        S3G2T2F5  : String(1); // Production capacity
        S3G2T2F6  : String(1); // Lead time to service

        // Group 3: Order Details
        // Type 1: Order size details
        S3G3T1F1  : String(1); // Minimum Order size
        S3G3T1F2  : String(1); // Maximum Order size

        // Group 4: Major Clients / customers
        // Type 1: Major Clients / customers details
        S3G4T1F1  : String(1); // Provide list of major clients / customers

        // Group 5: Original equipment manufacturer details
        // Type 1: Exclusive Distributor of OEM
        S3G5T1F1  : String(1); // Company Name
        S3G5T1F2  : String(1); // Add Addtional Exclusive Distributor of OEM
        S3G5T1F3  : String(1); // Country
        S3G5T1F4  : String(1); // Category of product

        // Type 2: Non Exclusive Distributor of OEM
        S3G5T2F1  : String(1); // Company Name
        S3G5T2F2  : String(1); // Add Addtional Non Exclusive Distributor of OEM
        S3G5T2F3  : String(1); // Country
        S3G5T2F4  : String(1); // Category of product


        // Section 4: Disclosures -------------------------------------------------------
        // Group 1: Conflict of Interest
        S4G1D1    : String(1);
        // Group 2: Legal case disclosure
        S4G2D1    : String(1);
        // Group 3: Supplier declaration
        S4G3D1    : String(1);
        // Group 4: Academic Discount
        S4G4D1    : String(1);
        // Group 5: Relatives Table
        S4G5D1    : String(1);
        // Group 6: Validation of information submitted
        //     S4G6D1 : String(1);
        // Group 7: REACH compliance
        S4G7D1    : String(1);
        // Group 8: CLP compliance
        S4G8D1    : String(1);
        // Group 9: ITAR and FCPA compliance
        S4G9D1    : String(1);
        S4G9D2    : String(1);
        S4G9D3    : String(1);
        S4G9D4    : String(1);
        // Group 10: IT Equipment and Tools
        S4G10D1   : String(1);
        S4G10D2   : String(1);
        // Group 11: Quality Certificates
        S4G11D1   : String(1);
        // Group 12: Overview
        S4G12D1   : String(1);
        S4G12D2   : String(1);
        S4G12D3   : String(1);
        S4G12D4   : String(1);
        S4G12D5   : String(1);
        S4G12D6   : String(1);
        S4G12D7   : String(1);
        S4G12D8   : String(1);
        S4G12D9   : String(1);
        S4G12D10  : String(1);
        // Group 13: Suppliers/ input material
        S4G13D1   : String(1);
        S4G13D2   : String(1);
        S4G13D3   : String(1);
        S4G13D4   : String(1);
        S4G13D5   : String(1);
        S4G13D6   : String(1);
        // Group 14: Production
        S4G14D1   : String(1);
        S4G14D2   : String(1);
        S4G14D3   : String(1);
        S4G14D4   : String(1);
        S4G14D5   : String(1);
        S4G14D6   : String(1);
        S4G14D7   : String(1);
        S4G14D8   : String(1);
        S4G14D9   : String(1);
        S4G14D10  : String(1);
        S4G14D11  : String(1);
        S4G14D12  : String(1);
        S4G14D13  : String(1);
        // Group 15: Storage
        S4G15D1   : String(1);
        S4G15D2   : String(1);
        S4G15D3   : String(1);
        S4G15D4   : String(1);
        // Group 16: Customer service
        S4G16D1   : String(1);
        // Group 17: Customer service
        S4G17D1   : String(1);
        S4G17D2   : String(1);
        // Group 18: Health; Safety & Environment
        S4G18D1   : String(1);
        S4G18D2   : String(1);
        S4G18D3   : String(1);
        S4G18D4   : String(1);
        // Group 18: Export Complaince
        S4G19D1   : String(1);
        S4G19D2   : String(1);
        // Section 5: Attachments -------------------------------------------------------
        // Attachment 5.1: Company Profile
        S5A1F1    : String(1);
        // Attachment 5.2: Catalogue of Products / services
        S5A2F1    : String(1);
        // Attachment 5.3: Production/Quality Resources
        S5A3F1    : String(1);
        // Attachment 5.4: Power of Attorney
        S5A4F1    : String(1);
        // Attachment 5.5: Passport Copy of Authorized Signatory
        S5A5F1    : String(1);
        S5A5F3    : String(1); // UID copy
        // Attachment 5.6: Passport  Representative / Authorized person
        S5A5F2    : String(1);
        S5A5F4    : String(1); // UID copy

        // Attachment 5.7: Bank Account letter issued by the Bank (In Bank's letterhead)
        S5A6F1    : String(1);
        // Attachment 5.8: If UAE Company
        S5A7F1    : String(1);
        // Attachment 5.9: If UAE Company
        S5A7F2    : String(1);
        // Attachment 5.10: Do you issue an Electronic Tax Invoice
        S5A9F1    : String(1);
        // Attachment 5.11: TRN Certificate
        S5A10F1   : String(1);
        // Attachment 5.12: Chamber of Commerce certificate
        S5A11F1   : String(1);
        // Attachment 5.14: Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
        S5A12F1   : String(1);
        // Attachment 5.15: Signed  Non-disclosure Agreement (NDA)
        S5A13F1   : String(1);
        // Attachment 5.16: Financial Statement of the past three recorded years
        S5A14F1   : String(1);
        // Attachment 5.17: ISO Certificate
        S5A15F1   : String(1);
        // Attachment 5.19: Other Quality certificates
        S5A16F1   : String(1);
        // Attachment 5.20: List of Major Customers
        S5A17F1   : String(1);
        // Attachment 5.21: List of Major Suppliers
        S5A18F1   : String(1);
        // Attachment 5.22: List of references
        S5A19F1   : String(1);
        // Attachment 5.23: Signed and stamped NIMR PO terms and conditions
        S5A20F1   : String(1);
        // Attachment 5.24: all Agency /distributorship Agreement endorse by OEM
        S5A21F1   : String(1);
        // Section 7: Acknowledgment -------------------------------------------------------
        // Attachment 5.1: Acknowledgment fields
        S7G1D1    : String(1); // Completed by
        S7G1D2    : String(1); // Designation
        S7G1D3    : String(1); // Date
        S7G1D4    : String(1); // Validation of information submitted
}

entity MASTER_REGFORM_FIELDS_UPDATED {
    key REQ_NO    : Int64 not null;
        // Section 1: General Information -------------------------------------------------------
        // Group 1: Company Information
        // Type 1: Head Quarter Information
        S1G1T1F1  : String(1); //Company Name (English);
        S1G1T1F2  : String(1); //Company Name (Arabic);
        S1G1T1F3  : String(1); //Mailing Address
        S1G1T1F13 : String(1); //Street 2
        S1G1T1F14 : String(1); //Street 3
        S1G1T1F15 : String(1); //Street 4
        S1G1T1F4  : String(1); //City
        S1G1T1F5  : String(1); //State
        S1G1T1F6  : String(1); //Country
        S1G1T1F7  : String(1); //Postal code
        S1G1T1F8  : String(1); //Contact No.
        S1G1T1F9  : String(1); //Fax No.
        S1G1T1F10 : String(1); //Email
        S1G1T1F11 : String(1); //Website
        S1G1T1F12 : String(1); //District

        // Type 2: Other Office details
        S1G1T2F1  : String(1); //Whole Table - Registering Office Details
        S1G1T2F2  : String(1); //Add Additional Other Office Details
        S1G1T2F3  : String(1); //Office Address - Street 1
        S1G1T2F12 : String(1); //Street 2
        S1G1T2F13 : String(1); //Street 3
        S1G1T2F14 : String(1); //Street 4
        S1G1T2F4  : String(1); //City
        S1G1T2F5  : String(1); //State
        S1G1T2F6  : String(1); //Country
        S1G1T2F7  : String(1); //Postal code/ZIP Code/ PO Box No.
        S1G1T2F8  : String(1); //Office Contact No.
        S1G1T2F9  : String(1); //Fax No.
        S1G1T2F10 : String(1); //Email
        S1G1T2F11 : String(1); //District

        // Group 2: Contact Details
        // Type 1: Head of the company (MD / Chariman)
        S1G2T1F1  : String(1); //Name
        S1G2T1F2  : String(1); //Designation
        S1G2T1F3  : String(1); //Email Address
        S1G2T1F4  : String(1); //Contact Number
        S1G2T1F5  : String(1); //Mobile Number
        S1G2T1F6  : String(1); //Nationality
        S1G2T1F7  : String(1); //City
        S1G2T1F8  : String(1); //State
        S1G2T1F9  : String(1); //Postal code/ZIP Code/ PO Box No.

        // Type 2: Authorised Contact Details
        S1G2T2F1  : String(1); //Name
        S1G2T2F2  : String(1); //Other Contact Details
        S1G2T2F3  : String(1); //Designation
        S1G2T2F4  : String(1); //Email Address
        S1G2T2F5  : String(1); //Contact Number
        S1G2T2F6  : String(1); //Nationality
        S1G2T2F7  : String(1); //Passport #
        S1G2T2F8  : String(1); //Mobile Number
        S1G2T2F9  : String(1); //City
        S1G2T2F10 : String(1); //State
        S1G2T2F11 : String(1); //Postal code/ZIP Code/ PO Box No.

        // Group 3: Legal Structure
        // Type 1: Registering office legal structure
        S1G3T1F1  : String(1); //Type of legal structure

        // Group 4: Business Information
        // Type 1: A;; same Business Information type
        S1G4T1F1  : String(1); //Year of establishment
        S1G4T2F1  : String(1); //No. of Employees
        S1G4T3F1  : String(1); //No. of Employees in Engineering
        S1G4T4F1  : String(1); //No. of Employees in Quality
        S1G4T5F1  : String(1); //No. of Employees in Production
        S1G4T6F1  : String(1); //No. of Employees in Administration
        S1G4T7F1  : String(1); //No. of Employees in Other functions
        S1G4T8F1  : String(1); //Type of Business
        S1G4T9F1  : String(1); //Trade License No.

        // Group 5: Supplier Category
        // Type 1: Supplier Category's Information
        S1G5T1F1  : String(1); //Supplier Category
        S1G5T2F1  : String(1); //Supplier Type

        // Section 2: Financial Information -------------------------------------------------------
        // Group 1: Payment Information
        // Type 1: Bank Account details
        S2G1T1F1  : String(1); //Bank Name
        S2G1T1F2  : String(1); //Beneficiary Name
        S2G1T1F3  : String(1); //Account Number
        S2G1T1F4  : String(1); //Branch Name
        S2G1T1F5  : String(1); //IBAN Number
        S2G1T1F6  : String(1); //Swift code
        S2G1T1F7  : String(1); //BIC code
        S2G1T1F8  : String(1); //Routing code
        S2G1T1F9  : String(1); //Other Codes
        S2G1T1F10 : String(1); //Bank Country
        S2G1T1F11 : String(1); //Bank Currency

        // Type 2: Payment Type
        S2G1T2F10 : String(1); //Payment Method
        S2G1T2F11 : String(1); //Payment Terms / Credit Period
        S2G1T2F12 : String(1); //Invoice Currency

        // Type 3: Value Added Tax (VAT) Information
        S2G1T3F13 : String(1); //VAT Registration Number
        S2G1T3F14 : String(1); //VAT Registration Date

        // Type 4: DUNS Number
        S2G1T4F15 : String(1); //DUNS Number

        // Type 5: Additional Paymenr Details
        S2G1T5F1  : String(1); //Bank Name
        S2G1T5F2  : String(1); ////Other Payment Details
        S2G1T5F3  : String(1); //Beneficiary Name
        S2G1T5F4  : String(1); //Account Number
        S2G1T5F5  : String(1); //Branch Name
        S2G1T5F6  : String(1); //IBAN Number
        S2G1T5F7  : String(1); //Swift code
        S2G1T5F8  : String(1); //Routing code
        S2G1T5F9  : String(1); //Other Codes
        S2G1T5F10 : String(1); //Bank Country
        S2G1T5F11 : String(1); //Bank Currency
        S2G1T5F12 : String(1); //VAT Registration Number
        S2G1T5F13 : String(1); //VAT Registration Date


        // Group 2: Financial Information
        // Type 1: Bank Account details
        S2G2T1F1  : String(1); //Total Revenue
        S2G2T2F1  : String(1); //Net Profit/Loss
        S2G2T3F1  : String(1); //Total Assets
        S2G2T4F1  : String(1); //Total Equity
        S2G2T5F1  : String(1); //Currency

        // Group 3: Owner's Information
        // Type 1: Owner's Information
        S2G3T1F1  : String(1); //Owner's name
        S2G3T1F2  : String(1); //Add Additional Owner's information
        S2G3T1F3  : String(1); //Owner's Nationality
        S2G3T1F4  : String(1); //Owner's Phone No
        S2G3T1F5  : String(1); //Owner's Passport  No
        S2G3T1F6  : String(1); //Owner's % of ownership

        // Section 3: Operational Information -------------------------------------------------------
        // Group 1: Products / Service description
        // Type 1: Product/service details
        S3G1T1F1  : String(1); // Product Name
        S3G1T1F2  : String(1); // Add additional product information
        S3G1T1F3  : String(1); // Product description
        S3G1T1F4  : String(1); // Category of product
        S3G1T1F5  : String(1); // Type (eg: Products/Services)

        // Group 2: Operational capacity
        // Type 1: Production details
        S3G2T1F1  : String(1); // Production capacity
        // Type 2: Plant location
        S3G2T2F1  : String(1); // Country
        S3G2T2F2  : String(1); // Add additional Operational/production information
        S3G2T2F3  : String(1); // City
        S3G2T2F4  : String(1); // Will this plant will be used to manufacture products/services
        S3G2T2F5  : String(1); // Production capacity
        S3G2T2F6  : String(1); // Lead time to service

        // Group 3: Order Details
        // Type 1: Order size details
        S3G3T1F1  : String(1); // Minimum Order size
        S3G3T1F2  : String(1); // Maximum Order size

        // Group 4: Major Clients / customers
        // Type 1: Major Clients / customers details
        S3G4T1F1  : String(1); // Provide list of major clients / customers

        // Group 5: Original equipment manufacturer details
        // Type 1: Exclusive Distributor of OEM
        S3G5T1F1  : String(1); // Company Name
        S3G5T1F2  : String(1); // Add Addtional Exclusive Distributor of OEM
        S3G5T1F3  : String(1); // Country
        S3G5T1F4  : String(1); // Category of product

        // Type 2: Non Exclusive Distributor of OEM
        S3G5T2F1  : String(1); // Company Name
        S3G5T2F2  : String(1); // Add Addtional Non Exclusive Distributor of OEM
        S3G5T2F3  : String(1); // Country
        S3G5T2F4  : String(1); // Category of product


        // Section 4: Disclosures -------------------------------------------------------
        // Group 1: Conflict of Interest
        S4G1D1    : String(1);
        // Group 2: Legal case disclosure
        S4G2D1    : String(1);
        // Group 3: Supplier declaration
        S4G3D1    : String(1);
        // Group 4: Academic Discount
        S4G4D1    : String(1);
        // Group 5: Relatives Table
        S4G5D1    : String(1);
        // Group 6: Validation of information submitted
        //     S4G6D1 : String(1);
        // Group 7: REACH compliance
        S4G7D1    : String(1);
        // Group 8: CLP compliance
        S4G8D1    : String(1);
        // Group 9: ITAR and FCPA compliance
        S4G9D1    : String(1);
        S4G9D2    : String(1);
        S4G9D3    : String(1);
        S4G9D4    : String(1);
        // Group 10: IT Equipment and Tools
        S4G10D1   : String(1);
        S4G10D2   : String(1);
        // Group 11: Quality Certificates
        S4G11D1   : String(1);
        // Group 12: Overview
        S4G12D1   : String(1);
        S4G12D2   : String(1);
        S4G12D3   : String(1);
        S4G12D4   : String(1);
        S4G12D5   : String(1);
        S4G12D6   : String(1);
        S4G12D7   : String(1);
        S4G12D8   : String(1);
        S4G12D9   : String(1);
        S4G12D10  : String(1);
        // Group 13: Suppliers/ input material
        S4G13D1   : String(1);
        S4G13D2   : String(1);
        S4G13D3   : String(1);
        S4G13D4   : String(1);
        S4G13D5   : String(1);
        S4G13D6   : String(1);
        // Group 14: Production
        S4G14D1   : String(1);
        S4G14D2   : String(1);
        S4G14D3   : String(1);
        S4G14D4   : String(1);
        S4G14D5   : String(1);
        S4G14D6   : String(1);
        S4G14D7   : String(1);
        S4G14D8   : String(1);
        S4G14D9   : String(1);
        S4G14D10  : String(1);
        S4G14D11  : String(1);
        S4G14D12  : String(1);
        S4G14D13  : String(1);
        // Group 15: Storage
        S4G15D1   : String(1);
        S4G15D2   : String(1);
        S4G15D3   : String(1);
        S4G15D4   : String(1);
        // Group 16: Customer service
        S4G16D1   : String(1);
        // Group 17: Customer service
        S4G17D1   : String(1);
        S4G17D2   : String(1);
        // Group 18: Health, Safety & Environment
        S4G18D1   : String(1);
        S4G18D2   : String(1);
        S4G18D3   : String(1);
        S4G18D4   : String(1);
        // Group 18: Export Complaince
        S4G19D1   : String(1);
        S4G19D2   : String(1);
        // Section 5: Attachments -------------------------------------------------------
        // Attachment 5.1: Company Profile
        S5A1F1    : String(1);
        // Attachment 5.2: Catalogue of Products / services
        S5A2F1    : String(1);
        // Attachment 5.3: Production/Quality Resources
        S5A3F1    : String(1);
        // Attachment 5.4: Power of Attorney
        S5A4F1    : String(1);
        // Attachment 5.5: Passport Copy of Authorized Signatory
        S5A5F1    : String(1);
        S5A5F3    : String(1); // UID copy
        // Attachment 5.6: Passport  Representative / Authorized person
        S5A5F2    : String(1);
        S5A5F4    : String(1); // UID copy

        // Attachment 5.7: Bank Account letter issued by the Bank (In Bank's letterhead)
        S5A6F1    : String(1);
        // Attachment 5.8: If UAE Company
        S5A7F1    : String(1);
        // Attachment 5.9: If UAE Company
        S5A7F2    : String(1);
        // Attachment 5.10: Do you issue an Electronic Tax Invoice
        S5A9F1    : String(1);
        // Attachment 5.11: TRN Certificate
        S5A10F1   : String(1);
        // Attachment 5.12: Chamber of Commerce certificate
        S5A11F1   : String(1);
        // Attachment 5.14: Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
        S5A12F1   : String(1);
        // Attachment 5.15: Signed  Non-disclosure Agreement (NDA)
        S5A13F1   : String(1);
        // Attachment 5.16: Financial Statement of the past three recorded years
        S5A14F1   : String(1);
        // Attachment 5.17: ISO Certificate
        S5A15F1   : String(1);
        // Attachment 5.19: Other Quality certificates
        S5A16F1   : String(1);
        // Attachment 5.20: List of Major Customers
        S5A17F1   : String(1);
        // Attachment 5.21: List of Major Suppliers
        S5A18F1   : String(1);
        // Attachment 5.22: List of references
        S5A19F1   : String(1);
        // Attachment 5.23: Signed and stamped NIMR PO terms and conditions
        S5A20F1   : String(1);
        // Attachment 5.24: all Agency /distributorship Agreement endorse by OEM
        S5A21F1   : String(1);
        // Section 7: Acknowledgment -------------------------------------------------------
        // Attachment 5.1: Acknowledgment fields
        S7G1D1    : String(1); // Completed by
        S7G1D2    : String(1); // Designation
        S7G1D3    : String(1); // Date
        S7G1D4    : String(1); // Validation of information submitted

}

entity MASTER_REGFORM_FIELDS_VISIBLE {
    key CCODE     : String(10);
    key TYPE      : Integer;
        // Section 1: General Information -------------------------------------------------------
        // Group 1: Company Information
        // Type 1: Head Quarter Information
        S1G1T1F1  : String(1); //Company Name (English)
        S1G1T1F2  : String(1); //Company Name (Arabic)
        S1G1T1F3  : String(1); //Mailing Address
        S1G1T1F13 : String(1); //Street 2
        S1G1T1F14 : String(1); //Street 3
        S1G1T1F15 : String(1); //Street 4
        S1G1T1F4  : String(1); //City
        S1G1T1F5  : String(1); //State
        S1G1T1F6  : String(1); //Country
        S1G1T1F7  : String(1); //Postal code
        S1G1T1F8  : String(1); //Contact No.
        S1G1T1F9  : String(1); //Fax No.
        S1G1T1F10 : String(1); //Email
        S1G1T1F11 : String(1); //Website
        S1G1T1F12 : String(1); //District

        // Type 2: Other Office details
        S1G1T2F1  : String(1); //Whole Table - Registering Office Details
        S1G1T2F2  : String(1); //Add Additional Other Office Details
        S1G1T2F3  : String(1); //Office Address - Street 1
        S1G1T2F12 : String(1); //Street 2
        S1G1T2F13 : String(1); //Street 3
        S1G1T2F14 : String(1); //Street 4
        S1G1T2F4  : String(1); //City
        S1G1T2F5  : String(1); //State
        S1G1T2F6  : String(1); //Country
        S1G1T2F7  : String(1); //Postal code/ZIP Code/ PO Box No.
        S1G1T2F8  : String(1); //Office Contact No.
        S1G1T2F9  : String(1); //Fax No.
        S1G1T2F10 : String(1); //Email
        S1G1T2F11 : String(1); //District

        // Group 2: Contact Details
        // Type 1: Head of the company (MD / Chariman)
        S1G2T1F1  : String(1); //Name
        S1G2T1F2  : String(1); //Designation
        S1G2T1F3  : String(1); //Email Address
        S1G2T1F4  : String(1); //Contact Number
        S1G2T1F5  : String(1); //Mobile Number
        S1G2T1F6  : String(1); //Nationality
        S1G2T1F7  : String(1); //City
        S1G2T1F8  : String(1); //State
        S1G2T1F9  : String(1); //Postal code/ZIP Code/ PO Box No.

        // Type 2: Authorised Contact Details
        S1G2T2F1  : String(1); //Name
        S1G2T2F2  : String(1); //Other Contact Details
        S1G2T2F3  : String(1); //Designation
        S1G2T2F4  : String(1); //Email Address
        S1G2T2F5  : String(1); //Contact Number
        S1G2T2F6  : String(1); //Nationality
        S1G2T2F7  : String(1); //Passport #
        S1G2T2F8  : String(1); //Mobile Number
        S1G2T2F9  : String(1); //City
        S1G2T2F10 : String(1); //State
        S1G2T2F11 : String(1); //Postal code/ZIP Code/ PO Box No.

        // Group 3: Legal Structure
        // Type 1: Registering office legal structure
        S1G3T1F1  : String(1); //Type of legal structure

        // Group 4: Business Information
        // Type 1: A;; same Business Information type
        S1G4T1F1  : String(1); //Year of establishment
        S1G4T2F1  : String(1); //No. of Employees
        S1G4T3F1  : String(1); //No. of Employees in Engineering
        S1G4T4F1  : String(1); //No. of Employees in Quality
        S1G4T5F1  : String(1); //No. of Employees in Production
        S1G4T6F1  : String(1); //No. of Employees in Administration
        S1G4T7F1  : String(1); //No. of Employees in Other functions
        S1G4T8F1  : String(1); //Type of Business
        S1G4T9F1  : String(1); //Trade License No.

        // Group 5: Supplier Category
        // Type 1: Supplier Category's Information
        S1G5T1F1  : String(1); //Supplier Category
        S1G5T2F1  : String(1); //Supplier Type

        // Section 2: Financial Information -------------------------------------------------------
        // Group 1: Payment Information
        // Type 1: Bank Account details
        S2G1T1F1  : String(1); //Bank Name
        S2G1T1F2  : String(1); //Beneficiary Name
        S2G1T1F3  : String(1); //Account Number
        S2G1T1F4  : String(1); //Branch Name
        S2G1T1F5  : String(1); //IBAN Number
        S2G1T1F6  : String(1); //Swift code
        S2G1T1F7  : String(1); //BIC code
        S2G1T1F8  : String(1); //Routing code
        S2G1T1F9  : String(1); //Other Codes
        S2G1T1F10 : String(1); //Bank Country
        S2G1T1F11 : String(1); //Bank Currency

        // Type 2: Payment Type
        S2G1T2F10 : String(1); //Payment Method
        S2G1T2F11 : String(1); //Payment Terms / Credit Period
        S2G1T2F12 : String(1); //Invoice Currency

        // Type 3: Value Added Tax (VAT) Information
        S2G1T3F13 : String(1); //VAT Registration Number
        S2G1T3F14 : String(1); //VAT Registration Date

        // Type 4: DUNS Number
        S2G1T4F15 : String(1); //DUNS Number

        // Type 5: Additional Paymenr Details
        S2G1T5F1  : String(1); //Bank Name
        S2G1T5F2  : String(1); ////Other Payment Details
        S2G1T5F3  : String(1); //Beneficiary Name
        S2G1T5F4  : String(1); //Account Number
        S2G1T5F5  : String(1); //Branch Name
        S2G1T5F6  : String(1); //IBAN Number
        S2G1T5F7  : String(1); //Swift code
        S2G1T5F8  : String(1); //Routing code
        S2G1T5F9  : String(1); //Other Codes
        S2G1T5F10 : String(1); //Bank Country
        S2G1T5F11 : String(1); //Bank Currency
        S2G1T5F12 : String(1); //VAT Registration Number
        S2G1T5F13 : String(1); //VAT Registration Date


        // Group 2: Financial Information
        // Type 1: Bank Account details
        S2G2T1F1  : String(1); //Total Revenue
        S2G2T2F1  : String(1); //Net Profit/Loss
        S2G2T3F1  : String(1); //Total Assets
        S2G2T4F1  : String(1); //Total Equity
        S2G2T5F1  : String(1); //Currency

        // Group 3: Owner's Information
        // Type 1: Owner's Information
        S2G3T1F1  : String(1); //Owner's name
        S2G3T1F2  : String(1); //Add Additional Owner's information
        S2G3T1F3  : String(1); //Owner's Nationality
        S2G3T1F4  : String(1); //Owner's Phone No
        S2G3T1F5  : String(1); //Owner's Passport  No
        S2G3T1F6  : String(1); //Owner's % of ownership

        // Section 3: Operational Information -------------------------------------------------------
        // Group 1: Products / Service description
        // Type 1: Product/service details
        S3G1T1F1  : String(1); // Product Name
        S3G1T1F2  : String(1); // Add additional product information
        S3G1T1F3  : String(1); // Product description
        S3G1T1F4  : String(1); // Category of product
        S3G1T1F5  : String(1); // Type (eg: Products/Services)

        // Group 2: Operational capacity
        // Type 1: Production details
        S3G2T1F1  : String(1); // Production capacity
        // Type 2: Plant location
        S3G2T2F1  : String(1); // Country
        S3G2T2F2  : String(1); // Add additional Operational/production information
        S3G2T2F3  : String(1); // City
        S3G2T2F4  : String(1); // Will this plant will be used to manufacture products/services
        S3G2T2F5  : String(1); // Production capacity
        S3G2T2F6  : String(1); // Lead time to service

        // Group 3: Order Details
        // Type 1: Order size details
        S3G3T1F1  : String(1); // Minimum Order size
        S3G3T1F2  : String(1); // Maximum Order size

        // Group 4: Major Clients / customers
        // Type 1: Major Clients / customers details
        S3G4T1F1  : String(1); // Provide list of major clients / customers

        // Group 5: Original equipment manufacturer details
        // Type 1: Exclusive Distributor of OEM
        S3G5T1F1  : String(1); // Company Name
        S3G5T1F2  : String(1); // Add Addtional Exclusive Distributor of OEM
        S3G5T1F3  : String(1); // Country
        S3G5T1F4  : String(1); // Category of product

        // Type 2: Non Exclusive Distributor of OEM
        S3G5T2F1  : String(1); // Company Name
        S3G5T2F2  : String(1); // Add Addtional Non Exclusive Distributor of OEM
        S3G5T2F3  : String(1); // Country
        S3G5T2F4  : String(1); // Category of product


        // Section 4: Disclosures -------------------------------------------------------
        // Group 1: Conflict of Interest
        S4G1D1    : String(1);
        // Group 2: Legal case disclosure
        S4G2D1    : String(1);
        // Group 3: Supplier declaration
        S4G3D1    : String(1);
        // Group 4: Academic Discount
        S4G4D1    : String(1);
        // Group 5: Relatives Table
        S4G5D1    : String(1);
        // Group 6: Validation of information submitted
        //    S4G6D1 : String(1);
        // Group 7: REACH compliance
        S4G7D1    : String(1);
        // Group 8: CLP compliance
        S4G8D1    : String(1);
        // Group 9: ITAR and FCPA compliance
        S4G9D1    : String(1);
        S4G9D2    : String(1);
        S4G9D3    : String(1);
        S4G9D4    : String(1);
        // Group 10: IT Equipment and Tools
        S4G10D1   : String(1);
        S4G10D2   : String(1);
        // Group 11: Quality Certificates
        S4G11D1   : String(1);
        // Group 12: Overview
        S4G12D1   : String(1);
        S4G12D2   : String(1);
        S4G12D3   : String(1);
        S4G12D4   : String(1);
        S4G12D5   : String(1);
        S4G12D6   : String(1);
        S4G12D7   : String(1);
        S4G12D8   : String(1);
        S4G12D9   : String(1);
        S4G12D10  : String(1);
        // Group 13: Suppliers/ input material
        S4G13D1   : String(1);
        S4G13D2   : String(1);
        S4G13D3   : String(1);
        S4G13D4   : String(1);
        S4G13D5   : String(1);
        S4G13D6   : String(1);
        // Group 14: Production
        S4G14D1   : String(1);
        S4G14D2   : String(1);
        S4G14D3   : String(1);
        S4G14D4   : String(1);
        S4G14D5   : String(1);
        S4G14D6   : String(1);
        S4G14D7   : String(1);
        S4G14D8   : String(1);
        S4G14D9   : String(1);
        S4G14D10  : String(1);
        S4G14D11  : String(1);
        S4G14D12  : String(1);
        S4G14D13  : String(1);
        // Group 15: Storage
        S4G15D1   : String(1);
        S4G15D2   : String(1);
        S4G15D3   : String(1);
        S4G15D4   : String(1);
        // Group 16: Customer service
        S4G16D1   : String(1);
        // Group 17: Customer service
        S4G17D1   : String(1);
        S4G17D2   : String(1);
        // Group 18: Health, Safety & Environment
        S4G18D1   : String(1);
        S4G18D2   : String(1);
        S4G18D3   : String(1);
        S4G18D4   : String(1);
        // Group 18: Export Complaince
        S4G19D1   : String(1);
        S4G19D2   : String(1);
        // Section 5: Attachments -------------------------------------------------------
        // Attachment 5.1: Company Profile
        S5A1F1    : String(1);
        // Attachment 5.2: Catalogue of Products / services
        S5A2F1    : String(1);
        // Attachment 5.3: Production/Quality Resources
        S5A3F1    : String(1);
        // Attachment 5.4: Power of Attorney
        S5A4F1    : String(1);
        // Attachment 5.5: Passport Copy of Authorized Signatory
        S5A5F1    : String(1);
        S5A5F3    : String(1); // UID copy
        // Attachment 5.6: Passport  Representative / Authorized person
        S5A5F2    : String(1);
        S5A5F4    : String(1); // UID copy

        // Attachment 5.7: Bank Account letter issued by the Bank (In Bank's letterhead)
        S5A6F1    : String(1);
        // Attachment 5.8: If UAE Company
        S5A7F1    : String(1);
        // Attachment 5.9: If UAE Company
        S5A7F2    : String(1);
        // Attachment 5.10: Do you issue an Electronic Tax Invoice
        S5A9F1    : String(1);
        // Attachment 5.11: TRN Certificate
        S5A10F1   : String(1);
        // Attachment 5.12: Chamber of Commerce certificate
        S5A11F1   : String(1);
        // Attachment 5.14: Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
        S5A12F1   : String(1);
        // Attachment 5.15: Signed  Non-disclosure Agreement (NDA)
        S5A13F1   : String(1);
        // Attachment 5.16: Financial Statement of the past three recorded years
        S5A14F1   : String(1);
        // Attachment 5.17: ISO Certificate
        S5A15F1   : String(1);
        // Attachment 5.19: Other Quality certificates
        S5A16F1   : String(1);
        // Attachment 5.20: List of Major Customers
        S5A17F1   : String(1);
        // Attachment 5.21: List of Major Suppliers
        S5A18F1   : String(1);
        // Attachment 5.22: List of references
        S5A19F1   : String(1);
        // Attachment 5.23: Signed and stamped NIMR PO terms and conditions
        S5A20F1   : String(1);
        // Attachment 5.24: all Agency /distributorship Agreement endorse by OEM
        S5A21F1   : String(1);
        // Section 7: Acknowledgment -------------------------------------------------------
        // Attachment 5.1: Acknowledgment fields
        S7G1D1    : String(1); // Completed by
        S7G1D2    : String(1); // Designation
        S7G1D3    : String(1); // Date
        S7G1D4    : String(1); // Validation of information submitted


}

entity IVEN_ERROR_LOG {

    key LOG_ID           : String(50);
        REG_NO           : Integer64;
        SR_NO            : Integer64;
        ERROR_CODE       : Integer64;
        ERROR_DESCRPTION : String(1000);
        CREATED_ON       : Timestamp;
        USER_ID          : String(50);
        APP_NAME         : String(50);
        TYPE             : String(50);

}

entity INVOICE_APPROVAL {

    key PO_NO         : String(10);
    key INVOICE_NO    : String(10);
    key ITEM_NO       : String(6);
        MATERIAL_CODE : String(30);
        MATERIAL_DESC : String(40);
        INV_QTY       : Double;
        UOM           : String(4);
        NET_PRICE     : Double;
        CGST          : Double;
        SGST          : Double;
        IGST          : Double;
        AMOUNT        : Double;
        INVOICE_DATE  : Date;
        TRANSPORTER   : String(100);
        LR_DATE       : Date;
        LR_NO         : String(30);
        STATUS        : String(1);

}

// entity NDA_ATTACHMENTS{
//     key SR_NO : Integer;
//     key ENTITY_CODE : String(10);
//     key ATTACH_CODE : Integer;
//     ATTACH_GROUP:String(30);
//     ATTACH_DESC  : String(100);
//     FILE_NAME : String(100);
//     FILE_TYPE : String(100);
//     FILE_MIMETYPE : String(100);
//     FILE_CONTENT : LargeBinary;
//     UPLOADED_ON : Timestamp;
//     ATTACH_TYPE_CODE : String(10);
//     ATTACH_TYPE_DESC : String(100);
// }

entity NEW_VENDOR_ADMIN {
    key REQID        : Integer;
        VENDORCODE   : String(20);
        PURCHASE_ORG : String(50);
        INDUSTKEY    : String(100);
        SEARCHTERM   : String(100);
        PAYTERM      : String(100);
        ORDERCURR    : String(10);
        SCHEMAGROUP  : String(10);
        GRBASE       : String(1);
        SRVBASE      : String(1);
        AUTOPO       : String(1);
        COMPCODE     : String(10);
        ACCTGROUP    : String(10);
        SORTKEY      : String(10);
        RECONACC     : String(100);
        PAYMETHOD    : String(10);
        HOUSEBANK    : String(100);
        DUBLEINV     : String(1);
        TAXCOUNTRY   : String(20);
        TERMSPAY     : String(30);
        ACT_DAT      : Date;
}

entity NEW_VENDOR_REQ {
    key REQID                   : Integer;
        VENDOR                  : String(20);
        CNAME                   : String(200);
        STREETNO                : String(50);
        STREET2                 : String(150);
        STREET3                 : String(150);
        COUNTRY                 : String(20);
        COUNTRYD                : String(20);
        CITY                    : String(20);
        CITYD                   : String(20);
        PINCODE                 : String(20);
        DISTRICT                : String(20);
        DISTRICTD               : String(20);
        REGION                  : String(20);
        REGIOND                 : String(20);
        TELNO                   : String(20);
        MOBILENO                : String(20);
        EMAIL                   : String(50);
        EMAIL2                  : String(50);
        FAX                     : String(50);
        MANUFACTURER            : String(200);
        MANFADDRESS             : String(200);
        CONTPERSON              : String(100);
        CONTPERSONMOBILE        : String(20);
        CONTEMAIL               : String(50);
        CONTADDRESS             : String(200);
        BNKACCNO                : String(30);
        BNKNAME                 : String(200);
        NAMEINBANK              : String(200);
        IFSCCODE                : String(30);
        PANCARD                 : String(10);
        GSTN                    : String(15);
        GSTNTYPE                : String(20);
        TAXOTHINFO              : String(100);
        NOOFEMP                 : String(10);
        NOOFCONTRACTUALEMP      : String(10);
        TURNOVER                : String(30);
        PAYMENTTERMS            : String(100);
        PRODCURRMANF            : String(200);
        PROPEXPANSION           : String(200);
        TOIMANUFACTURING        : String(1);
        TOIPACKAGING            : String(1);
        TOITRADING              : String(1);
        CONSTOFCOMP             : String(200);
        OWNER                   : String(200);
        DATEOFCOMM              : Date;
        FACTSITUATED            : String(200);
        LOCATIONCOVERED         : String(200);
        COMPREGISTERED          : String(200);
        LINEOFACTIVITY          : String(200);
        MPCBACT                 : String(10);
        MPCBZONE                : String(200);
        MPCBCONSENTNO           : String(50);
        MPCBVALIDITYPERIOD      : String(20);
        CASESPENDING            : String(30);
        CASESDETAILS            : String(200);
        FACTORYACT              : String(20);
        FACTLICENSENO           : String(200);
        FACTLICENSEVALIDITYDATE : String(20);
        CHILDLABACT             : String(20);
        ANYCHILDLAB             : String(20);
        CONTLABOURACT           : String(20);
        MANCAPACITY             : String(200);
        INCHARGEEDU             : String(100);
        LISTOFMACHINARIES       : String(200);
        QCLAB                   : String(20);
        LISTOFINSTRUMENT        : String(200);
        MANFAGREEMENT           : String(200);
        WRITTENPERMISSION       : String(200);
        REQUESTDATE             : Date;
        VENDCREATEDFLAG         : String(1);
        MAILFLAG                : String(1);

}

entity ONBOARDING_ADDRESSES {
    key OBR_NO           : Integer64;
    key SR_NO            : Integer;
        ADDRESS_TYPE     : String(50);
        ADDRESS_DESC     : String(50);
        HOUSE_NUM1       : String(10);
        STREET1          : String(60);
        STREET2          : String(40);
        STREET3          : String(40);
        STREET4          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        COUNTRY          : String(100);
        POSTAL_CODE      : String(10);
        CONTACT_NO       : String(30);
        CONTACT_TELECODE : String(4);
        FAX_NO           : String(10);
        EMAIL            : String(241);
        DISTRICT         : String(35);
}

entity ONBOARDING_ADDRESSES_TEMP {
    key OBR_NO           : Integer64;
    key TEMP_ID          : Integer64;
    key SR_NO            : Integer;
        ADDRESS_TYPE     : String(50);
        ADDRESS_DESC     : String(50);
        HOUSE_NUM1       : String(10);
        STREET1          : String(60);
        STREET2          : String(40);
        STREET3          : String(40);
        STREET4          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        COUNTRY          : String(100);
        POSTAL_CODE      : String(10);
        CONTACT_NO       : String(30);
        CONTACT_TELECODE : String(4);
        FAX_NO           : String(10);
        EMAIL            : String(241);
        DISTRICT         : String(35);
}

entity ONBOARDING_ATTACH_FIELDS {
    key OBR_NO                     : Integer64;
        // If UAE Company
        IS_UAE_COMPANY             : String(5);
        // Do you issue an Electronic Tax Invoice
        ISSUE_ELEC_TAX_INV         : String(100);
        // Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
        SOLE_DIST_MFG_SER          : String(5);
        //SOLE_DIST_MFG_SER_TYPE : String(100);

        // Passport  Representative / Authorized person
        PASSPORT_OF_AUTH_SIGNATORY : String(5);
        PASSPORT_REPR_AUTH_PERSON  : String(5);
}

entity ONBOARDING_ATTACHMENTS {
    key OBR_NO           : Integer64;
    key SR_NO            : Integer;
        ATTACH_CODE      : Integer;
        ATTACH_GROUP     : String(30);
        ATTACH_DESC      : String(100);
        ATTACH_VALUE     : String(100);
        EXPIRY_DATE      : Date;
        FILE_NAME        : String(100);
        FILE_TYPE        : String(100);
        FILE_MIMETYPE    : String(100);
        FILE_CONTENT     : LargeBinary;
        UPLOADED_ON      : Timestamp;
        OT_DOC_ID        : String(10);
        OT_LAST_DOC_ID   : String(10);
        UPDATE_FLAG      : String(1);
        DELETE_FLAG      : String(1);
        ATTACH_SHORT_DEC : String(50);
        ATTACH_FOR       : String(50);
}

entity ONBOARDING_ATTACHMENTS_TEMP {
    key OBR_NO           : Integer64;
    key TEMP_ID          : Integer64;
    key SR_NO            : Integer;
        ATTACH_CODE      : Integer;
        ATTACH_GROUP     : String(30);
        ATTACH_DESC      : String(100);
        ATTACH_VALUE     : String(100);
        EXPIRY_DATE      : Date;
        FILE_NAME        : String(100);
        FILE_TYPE        : String(100);
        FILE_MIMETYPE    : String(100);
        FILE_CONTENT     : LargeBinary;
        UPLOADED_ON      : Timestamp;
        OT_DOC_ID        : String(10);
        OT_LAST_DOC_ID   : String(10);
        UPDATE_FLAG      : String(1);
        DELETE_FLAG      : String(1);
        ATTACH_SHORT_DEC : String(50);
        ATTACH_FOR       : String(50);

}

entity ONBOARDING_CAPACITY {
    key OBR_NO                : Integer64;
    key SR_NO                 : Integer;
        // TOTAL_PROD_CAPACITY : String(20);
        CITY                  : String(100);
        COUNTRY               : String(100);
        PLANT_MANF_CAPABILITY : String(5);
        PROD_CAPACITY         : Double;
        TIME_TO_SERVICE       : String(50);
}

entity ONBOARDING_CONTACTS {
    key OBR_NO           : Integer64;
    key SR_NO            : Integer;
        NAME1            : String(35);
        NAME2            : String(35);
        HOUSE_NUM1       : String(10);
        STREET1          : String(40);
        STREET2          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        POSTAL_CODE      : String(10);
        DESIGNATION      : String(50);
        NATIONALITY      : String(30);
        PASSPORT_NO      : String(30);
        EMAIL            : String(241);
        CONTACT_NO       : String(30);
        MOBILE_NO        : String(30);
        CONTACT_TYPE     : String(10);
        CONTACT_TELECODE : String(4);
        MOBILE_TELECODE  : String(4);
        BP_ID            : String(10);

}

entity ONBOARDING_CONTACTS_TEMP {
    key OBR_NO           : Integer64;
    key TEMP_ID          : Integer64;
    key SR_NO            : Integer;
        NAME1            : String(35);
        NAME2            : String(35);
        HOUSE_NUM1       : String(10);
        STREET1          : String(40);
        STREET2          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        POSTAL_CODE      : String(10);
        DESIGNATION      : String(50);
        NATIONALITY      : String(30);
        PASSPORT_NO      : String(30);
        EMAIL            : String(241);
        CONTACT_NO       : String(30);
        MOBILE_NO        : String(30);
        CONTACT_TYPE     : String(10);
        CONTACT_TELECODE : String(4);
        MOBILE_TELECODE  : String(4);
        BP_ID            : String(10);
}

entity ONBOARDING_CUSTOMERS {
    key OBR_NO         : Integer64;
    key SR_NO          : Integer;
        CUSTOMER_NAME  : String(100);
        CUSTOMER_SHARE : Double;
}

entity ONBOARDING_DISCLOSURE_FIELDS {
    key OBR_NO                    : Int64;
        // Conflict of Interest
        INTEREST_CONFLICT         : String(5);
        INTEREST_CONFLICT_TEXT    : String(100);
        // Legal case disclosure
        ANY_LEGAL_CASES           : String(5);
        ANY_LEGAL_CASES_TEXT      : String(100);
        // Supplier declaration
        AKN_SIGNATURE             : String(100);
        AKN_NAME                  : String(100);
        AKN_DESIGNATION           : String(100);
        AKN_DATE                  : Date;
        AKN_COMPANY_STAMP         : String(100);
        //Academic Discount
        ACADEMIC_DISCOUNT         : String(5);
        // Relatives Working for
        RELATIVE_WORKING          : String(5);
        // Validation of information submitted
        VALID_SIGNATORY_NAME      : String(100);
        VALID_DESIGNATION         : String(100);
        // REACH compliance
        REACH_COMPLIANCE          : String(5);
        // CLP compliance
        CLP_COMPLIANCE            : String(5);
        // ITAR and FCPA compliance
        APPLY_ITAR_REG            : String(5);
        SUPPLY_ITAR_EAR           : String(5);
        APPLY_FCPA                : String(5);
        US_ORIGIN_SUPPL           : String(5);
        ERP_MGMT_SYSTEM           : String(5);
        ERP_MGMT_SYSTEM_NAME      : String(100);
        INDUSRIAL_DESIGN_SW       : String(5);
        INDUSRIAL_DESIGN_SW_NAME  : String(100);
        // Overview
        COUNTERFIET_PARTS_PCD     : String(5);
        QUALITY_AGREEMENT         : String(5);
        MANUFACTURING_PCD         : String(5);
        TECH_SPEC_MFG_SRV         : String(5);
        PLAN_COLLECTION           : String(5);
        ANALYSIS_RISKMGMT_PROC    : String(5);
        CONFIG_CTRL_SYSTEM        : String(5);
        CTRL_PLANNING_PROC        : String(5);
        CONT_IMPROVEMENT_PROG     : String(5);
        EPI_QUALITY_SUPPL_REQ     : String(5);
        // Suppliers/ imput material
        SUPPL_EVAL_PROC           : String(5);
        NON_CONF_ANALYSIS         : String(5);
        TECH_SPEC_MATERIAL        : String(5);
        MATERIAL_INSPECTION_TESTS : String(5);
        CTRL_ORDERS_DOC_PROC      : String(5);
        TECHNICAL_DOC_PROC        : String(5);
        // Production
        QUALIFIED_STAFF           : String(5);
        QUALIFICATION_ARRAY       : String(5);
        PROC_FOR_INCOMING         : String(5);
        MFG_INSPECTION_TESTS      : String(5);
        INTERAL_QUAL_AUDITS       : String(5);
        MEASURING_EQUIP_CALIB     : String(5);
        NON_CONF_TREATMENT_PROC   : String(5);
        REPTITIVE_CAUSES_PROC     : String(5);
        IDENTIFICATION_METHOD     : String(5);
        MAINTENANCE_SCHEDULES     : String(5);
        WORK_INSTRUCTION_METHODS  : String(5);
        DOCUMENTED_PROC           : String(5);
        PLANNING_CONTROL_SYSTEM   : String(5);
        // Storage
        CRITERIA_COLLECT_PROC     : String(5);
        COMP_BASED_WMS            : String(5);
        ESTAB_CRITERIA            : String(5);
        DEFINED_POLICIES          : String(5);
        // Customer service
        CUSTOMER_SERVICE          : String(5);
        // Technology
        MASS_SERIES_PROD          : String(5);
        TECH_SUPPORT              : String(5);
        // HEALTH, SAFETY AND ENVIROMENT
        SFTY_ENVI_POLICY          : String(5);
        ENVI_FRIENDLY_PROD        : String(5);
        SUSTAINABILITY_PROG       : String(5);
        COMPLY_LABOR_REG          : String(5);
        REQUIRE_EUC               : String(5);
        EXPORT_CNTRL              : String(5);
}

entity ONBOARDING_DISCLOSURE_QACERT {
    key OBR_NO     : Int64;
    key SR_NO      : Integer;
        // Quality Certification
        CERTI_NAME : String(100);
        CERTI_TYPE : String(100);
        AVAILABLE  : String(100);
        DONE_BY    : String(100);
}

entity ONBOARDING_DISCLOSURE_RELATIVES {
    key OBR_NO       : Int64;
    key SR_NO        : Integer;
        NAME         : String(100);
        RELATIONSHIP : String(100);
}

entity ONBOARDING_FINANCIAL {
    key OBR_NO          : Int64;
    key SR_NO           : Integer;
        FIN_YEAR        : Integer;
        TOTAL_REVENUE   : Double;
        NET_PROFIT_LOSS : Double;
        TOTAL_ASSETS    : Double;
        TOTAL_EQUITY    : Double;
        CURRENCY        : String(10);
}

entity REGFORM_FOLDER_IDS {

    key IVEN_VENDOR_CODE : Int64;
        SAP_VENDOR_CODE  : String(10);
        OT_PARENT_ID     : String(10);
        OT_FOLDER1_ID    : String(25);
        OT_FOLDER2_ID    : String(25);
        OT_FOLDER3_ID    : String(25);
        OT_FOLDER4_ID    : String(25);

}

entity ONBOARDING_FORM_TEMP {
        // Official Use
    key OBR_NO                : Int64;
    key TEMP_ID               : Int64;
        STATUS                : Integer;
        APPROVER_LEVEL        : Integer;
        APPROVER_ROLE         : String(50);
        NEXT_APPROVER         : String(100);
        SAP_VENDOR_NO         : String(10);
        IVEN_VENDOR_CODE      : Int64;
        REGISTERED_ID         : String(100);
        SECONDARY_EMAILS_ID   : String(500);
        ENTITY_CODE           : String(10);
        REQUEST_TYPE          : Integer;
        CREATION_TYPE         : Integer;
        REQUEST_RESENT        : String(5);
        REQUESTER_ID          : String(100);
        MDG_CR_NO             : String(15);
        LAST_ACTIVE_REQ_NO    : Int64;
        // Company Information
        COMPANY_NAME1         : String(100);
        COMPANY_NAME2         : String(100);
        WEBSITE               : String(100);
        //Legal Structure
        LEGAL_STRUCTURE       : String(50);
        LEGAL_STRUCTURE_OTHER : String(100);
        // Business Information
        ESTAB_YEAR            : String(4);
        NO_OF_EMP             : Integer;
        NO_OF_ENGG            : Integer;
        NO_OF_QUALITY         : Integer;
        NO_OF_PROD            : Integer;
        NO_OF_ADMIN           : Integer;
        NO_OF_OTHERS          : Integer;
        BUSINESS_TYPE         : String(50);
        TRADE_LIC_NO          : String(50);
        TRADE_LIC_NO_DATE     : Date;
        VAT_REG_NUMBER        : String(25);
        VAT_REG_DATE          : Date;
        VAT_CHECK             : String(1);
        ICV_SCORE             : Decimal;
        ICV_DATE              : Date;
        ICV_CHECK             : String(1);
        // Serction 3: Operation Info
        SUPPL_CATEGORY        : String(1000);
        SUPPL_CATEGORY_DESC   : String(1500);
        SUPPL_TYPE            : String(50);
        SUPPL_TYPE_DESC       : String(30);
        BP_TYPE_CODE          : String(4);
        BP_TYPE_DESC          : String(100);
        ACTIVITY_TYPE         : String(30);
        // Order Size Details
        ORDER_SIZE_MIN        : String(50);
        ORDER_SIZE_MAX        : String(50);
        // Total Production Details from Section 4: Disclosures Info
        TOTAL_PROD_CAPACITY   : String(20);
        // STATUS base updates
        LAST_SAVED_STEP       : Integer;
        // Submission Fields
        COMPLETED_BY          : String(100);
        COMPLETED_BY_POSITION : String(50);
        ACK_VALIDATION        : String(5); //Validation of information submitted

        // Timestamps
        SUBMISSION_DATE       : Timestamp;
        LAST_UPDATED_ON       : Timestamp;
        //------------------OpenText--------------------------------
        OT_PARENT_ID          : String(10);
        OT_FOLDER1_ID         : String(25);
        OT_FOLDER2_ID         : String(25);
        OT_FOLDER3_ID         : String(25);
        OT_FOLDER4_ID         : String(25);
}

entity ONBOARDING_FORM {

        // Official Use
    key OBR_NO                : Int64;
        STATUS                : Integer;
        APPROVER_LEVEL        : Integer;
        APPROVER_ROLE         : String(50);
        NEXT_APPROVER         : String(100);
        SAP_VENDOR_NO         : String(10);
        IVEN_VENDOR_CODE      : Int64;
        REGISTERED_ID         : String(100);
        SECONDARY_EMAILS_ID   : String(500);
        ENTITY_CODE           : String(10);
        REQUEST_TYPE          : Integer;
        CREATION_TYPE         : Integer;
        REQUEST_RESENT        : String(5);
        REQUESTER_ID          : String(100);
        MDG_CR_NO             : String(15);
        LAST_ACTIVE_REQ_NO    : Int64;
        // Company Information
        COMPANY_NAME1         : String(100);
        COMPANY_NAME2         : String(100);
        WEBSITE               : String(100);
        //Legal Structure
        LEGAL_STRUCTURE       : String(50);
        LEGAL_STRUCTURE_OTHER : String(100);
        // Business Information
        ESTAB_YEAR            : String(4);
        NO_OF_EMP             : Integer;
        NO_OF_ENGG            : Integer;
        NO_OF_QUALITY         : Integer;
        NO_OF_PROD            : Integer;
        NO_OF_ADMIN           : Integer;
        NO_OF_OTHERS          : Integer;
        BUSINESS_TYPE         : String(50);
        TRADE_LIC_NO          : String(50);
        TRADE_LIC_NO_DATE     : Date;
        VAT_REG_NUMBER        : String(25);
        VAT_REG_DATE          : Date;
        VAT_CHECK             : String(1);
        ICV_SCORE             : Decimal;
        ICV_DATE              : Date;
        ICV_CHECK             : String(1);
        // Serction 3: Operation Info
        SUPPL_CATEGORY        : String(1000);
        SUPPL_CATEGORY_DESC   : String(1500);
        SUPPL_TYPE            : String(50);
        SUPPL_TYPE_DESC       : String(50);
        BP_TYPE_CODE          : String(4);
        BP_TYPE_DESC          : String(100);
        ACTIVITY_TYPE         : String(30);
        // Order Size Details
        ORDER_SIZE_MIN        : String(50);
        ORDER_SIZE_MAX        : String(50);
        // Total Production Details from Section 4: Disclosures Info
        TOTAL_PROD_CAPACITY   : String(20);
        // STATUS base updates
        LAST_SAVED_STEP       : Integer;
        // Submission Fields
        COMPLETED_BY          : String(100);
        COMPLETED_BY_POSITION : String(50);
        ACK_VALIDATION        : String(5); //Validation of information submitted

        // Timestamps
        SUBMISSION_DATE       : Timestamp;
        LAST_UPDATED_ON       : Timestamp;
        //------------------OpenText--------------------------------
        OT_PARENT_ID          : String(10);
        OT_FOLDER1_ID         : String(25);
        OT_FOLDER2_ID         : String(25);
        OT_FOLDER3_ID         : String(25);
        OT_FOLDER4_ID         : String(25);


}

entity ONBOARDING_IAS_LOG {

    key JOB_SR_NO        : Integer;
    key JOB_TASKS_COUNT  : Integer;
        OBR_NO           : Int64;
        SAP_VENDOR_NO    : String(10);
        IVEN_VENDOR_CODE : Int64;
        USER_ID          : String(100);
        DISPLAYNAME      : String(100);
        ID               : String(100);
        REMARK           : String(100);
        STATUS           : String(1);
        STATUS_CODE      : Integer;
        CREATED_ON       : Timestamp;
}

entity ONBOARDING_OEM {

    key OBR_NO       : Integer64;
    key SR_NO        : Integer;
    key OEM_TYPE     : String(10);
        COMPANY_NAME : String(100);
        COUNTRY      : String(100);
        OEM_CATEGORY : String(100);

}

entity ONBOARDING_OWNERS {

    key OBR_NO            : Integer64;
    key SR_NO             : Integer;
        NAME              : String(100);
        NATIONALITY       : String(100);
        CONTACT_NO        : String(12);
        CONTACT_TELECODE  : String(4);
        PASSPORT_NO       : String(30);
        ACTIVITY_TYPE     : String(30);
        OWNERSHIP_PERCENT : Double;

}

entity ONBOARDING_PAYMENTS {

    key OBR_NO              : Integer64;
    key SR_NO               : Integer;
        NAME                : String(100);
        BENEFICIARY         : String(100);
        ACCOUNT_NO          : String(38); //18 (account no) + 20 (BankRef)
        ACCOUNT_NAME        : String(40);
        ACCOUNT_HOLDER      : String(60);
        BANK_ID             : String(4);
        BANK_KEY            : String(15);
        BANK_COUNTRY        : String(50); //3 length
        BRANCH_NAME         : String(100);
        IBAN_NUMBER         : String(34); //34 length
        SWIFT_CODE          : String(15);
        BIC_CODE            : String(15);
        ROUTING_CODE        : String(15);
        OTHER_CODE          : String(1);
        OTHER_CODE_NAME     : String(15);
        OTHER_CODE_VAL      : String(15);
        PAYMENT_METHOD      : String(25);
        PAYMENT_METHOD_DESC : String(30);
        PAYMENT_TERMS       : String(25);
        PAYMENT_TERMS_DESC  : String(30);
        INVOICE_CURRENCY    : String(25);
        VAT_REG_NUMBER      : String(25);
        VAT_REG_DATE        : Date;
        DUNS_NUMBER         : String(10);
        BANK_CURRENCY       : String(5);
        BANK_NO             : String(15);
        PAYMENT_TYPE        : String(10);

}

entity ONBOARDING_PAYMENTS_TEMP {

    key OBR_NO              : Integer64;
    key TEMP_ID             : Integer64;
    key SR_NO               : Integer;
        NAME                : String(100);
        BENEFICIARY         : String(100);
        ACCOUNT_NO          : String(38); // 18 (account no) + 20 (BankRef)
        ACCOUNT_NAME        : String(40);
        ACCOUNT_HOLDER      : String(60);
        BANK_ID             : String(4);
        BANK_KEY            : String(15);
        BANK_COUNTRY        : String(50); //3 length
        BRANCH_NAME         : String(100);
        IBAN_NUMBER         : String(40); //34 length
        SWIFT_CODE          : String(15);
        BIC_CODE            : String(15);
        ROUTING_CODE        : String(15);
        OTHER_CODE          : String(1);
        OTHER_CODE_NAME     : String(15);
        OTHER_CODE_VAL      : String(15);
        PAYMENT_METHOD      : String(25);
        PAYMENT_METHOD_DESC : String(30);
        PAYMENT_TERMS       : String(25);
        PAYMENT_TERMS_DESC  : String(30);
        INVOICE_CURRENCY    : String(25);
        VAT_REG_NUMBER      : String(25);
        VAT_REG_DATE        : Date;
        DUNS_NUMBER         : String(10);
        BANK_CURRENCY       : String(5);
        BANK_NO             : String(15);
        PAYMENT_TYPE        : String(10);

}

entity ONBOARDING_PRODUCT_SERVICE {

    key OBR_NO            : Integer64;
    key TYPE              : String(10);
    key SR_NO             : Integer;
        PROD_NAME         : String(100);
        PROD_DESCRIPTION  : String(200);
        PROD_CATEGORY     : String(200);
        PROD_CATEGORY_DEC : String(100);

}

entity REGISTRATION_ACTIVE_STATUS {

    key REG_NO           : Integer64;
        ACTIVE           : String(1);
        TYPE             : Integer;
        UPDATED_ON       : Timestamp;
        IVEN_VENDOR_CODE : Integer64;

}

entity REGISTRATION_EVENT_COMMENTS {

    key REG_NO     : Integer64;
    key EVENT_NO   : Integer;
        EVENT_CODE : Integer;
        EVENT_TYPE : String(20);
        USER_ID    : String(100);
        USER_NAME  : String(100);
        REMARK     : String(100);
        COMMENT    : String(1000);
        CREATED_ON : Timestamp;

}

entity REQUEST_SECURITY_CODE {

    key REGISTERED_ID : String(100);
        SEC_CODE      : String(100);
        CREATED_ON    : Timestamp;

}

entity SUPPLIER_PROFILE_LOG {

    key SAP_VENDOR_CODE    : String(10);
    key EVENT_NO           : Integer;
        EVENT_CODE         : Integer;
        EVENT_TYPE         : String(20);
        USER_ID            : String(100);
        USER_NAME          : String(100);
        REMARK             : String(100);
        COMMENT            : String(1000);
        UPDATED_ON         : Timestamp;
        UPDATED_FIELD_NAME : String(100);
        CHANGE_VALUE       : String(100);
        ORG_VALUE          : String(100);
        OBR_NO             : Integer64;

}


entity USER_DELEGATION {

    key SR_NO          : Integer;
        ASSIGN_FROM    : String(50);
        ASSIGN_TO      : String(50);
        ASSIGN_TO_NAME : String(100);
        REASON         : String(1000);
        DEL_FROM_DATE  : Timestamp;
        DEL_TO_DATE    : Timestamp;
        STATUS         : String(1);
        ENTITY_CODE    : String(10);

}

entity USER_DELEGATION_HISTORY {

    key SR_NO          : Integer;
    key LOG_NO         : Integer;
        ASSIGN_FROM    : String(50);
        ASSIGN_TO      : String(50);
        ASSIGN_TO_NAME : String(100);
        REASON         : String(1000);
        DEL_FROM_DATE  : Timestamp;
        DEL_TO_DATE    : Timestamp;
        STATUS         : String(1);
        ENTITY_CODE    : String(10);
        CHANGED_BY     : String(50);
        CHANGED_DATE   : Timestamp;

}

entity USER_QUERY {

    key REQ_NO   : String(10);
        CATAGORY : String(100);
        SUBJECT  : String(100);
        QUESTION : String(100);
        UNAME    : String(10);
        CDATE    : Date;
        STATUS   : String(20);
        ACTION   : String(10);
        RDATE    : Date;
        ANSWER   : String(100);

}

entity VENDOR_INVITATION {

    key REG_NO             : Integer64;
        SAP_VENDOR_CODE    : String(10);
        VNAME              : String(100);
        VCODE              : String(50);
    key VEMAIL             : String(241);
        CREATED_ON         : Timestamp;
        UPDATED_ON         : Timestamp;
        ENTITY_CODE        : String(50);
        ENTITY_DESC        : String(100);
        STATUS             : Integer;
        COMMENT            : String(1000);
        REQUEST_TYPE       : Integer;
        CREATION_TYPE      : Integer;
        SUPPLIER_TYPE_DESC : String(100);
        SUPPLIERTYPE_CODE  : String(50);
        BP_TYPE_DESC       : String(100);
        BP_TYPE_CODE       : String(4);
        IVEN_VENDOR_CODE   : Integer64;
        CREATED_BY         : String(100);
        CREATED_BY_NAME    : String(100);
        NEXT_APPROVER      : String(100);
        NDA_TYPE           : String(50);
        REMINDER_COUNT     : Integer;
        BUYER_ASSIGN_CHECK : String(1);

}

entity VENDOR_INVITATION_LOG {

    key REG_NO         : Integer64;
    key LAST_REMINDER  : Timestamp;
    key UPDATED_ON     : Timestamp;
    key REMINDER_COUNT : Integer;

}

