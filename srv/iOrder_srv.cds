using {iorder} from '../db/iOrder';


service iOrder {

    entity HeaderSet   as projection on iorder.Header;
    entity ItemSet     as projection on iorder.Item;
    entity citySet     as projection on iorder.CityVH;
    entity StatusSet   as projection on iorder.StatusVH;
    entity classSet    as projection on iorder.ClassVH;
    entity MaterailSet as projection on iorder.MaterailSH;
    entity IASet as projection on iorder.MaterailSH;

    //Post Operation 
    action PostOrderData(headerSet:many HeaderSet,itemSet:many ItemSet) returns array of String;
}
