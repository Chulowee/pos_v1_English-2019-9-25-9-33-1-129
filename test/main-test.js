'use strict';

describe('pos', () => {
  it('should decode barcodes', () => {
    const decodedBarcodes = {
      bacode: 'ITEM000001'
    };

    let expected = loadItems(decodedBarcodes);
    expect(expected).toEqual([{"barcode": "ITEM000001", "count": 1}]);
  });

  it('should load items with barcodes', () => {
    const decodedBarcodes = {
      bacode: 'ITEM000001'
    };

    let expected = loadItems(decodedBarcodes);
    expect(expected).toEqual([{"barcode": "ITEM000001", "name": "Diet Coke", "price": 3.00 , "unit": 'bottle'}]);
  });

  it('should combine items', () => {
    const decodedBarcodes = {
      bacode: 'ITEM000001'
    };

    let expected = loadItems(decodedBarcodes);
    expect(expected).toEqual([{"barcode": "ITEM000001", "name": "Diet Coke", "price": 3.00 , "unit": 'bottle', "count": 1}]);
  });

  it('should decode tags', () => {
    const decodedBarcodes = {
      bacode: 'ITEM000001'
    };

    let expected = decodeTags(decodedBarcodes);
    expect(expected).toEqual([{"barcode": "ITEM000001", "name": "Diet Coke", "price": 3.00 , "unit": 'bottle', "count": 1}]);
  });

  
  it('should promote receipt tags', () => {
    const items = [{
      "barcode": "ITEM000001",
      "name": "Diet Coke",
      "price": 3.00 ,
      "unit": 'bottle',
      "count": 1},
      {"barcode": "ITEM000001",
        "name": "Diet Coke",
        "price": 3.00 ,
        "unit": 'bottle',
        "count": 1},
      {"barcode": "ITEM000001",
        "name": "Diet Coke",
        "price": 3.00 ,
        "unit": 'bottle',
        "count": 1}];

      const promotions = ['ITEM000001'];

    let expected = promotedReceiptItems(items,promotions);
    expect(expected).toEqual([
      {"barcode": "ITEM000001",
      "name": "Diet Coke",
      "price": 3.00 ,
      "unit": 'bottle',
      "count": 1,
      "Subtotal": 6.00+"(yuan)"}]);
  });

  it('should calculate receipt items', () => {
    const items = [{
      "barcode": "ITEM000001",
      "name": "Diet Coke",
      "price": 3.00 ,
      "unit": 'bottle',
      "count": 1},
      {"barcode": "ITEM000001",
        "name": "Diet Coke",
        "price": 3.00 ,
        "unit": 'bottle',
        "count": 1},
      {"barcode": "ITEM000001",
        "name": "Diet Coke",
        "price": 3.00 ,
        "unit": 'bottle',
        "count": 1}];

    let expected = calculateReceiptItems(items);
    expect(expected).toEqual([
    {"barcode": "ITEM000001",
    "name": "Diet Coke",
    "price": 3.00 ,
    "unit": 'bottle',
    "count": 3,
    "Subtotal": 6.00+"(yuan)"}]);
  });

  it('should calculate receipt total', () => {
    const receipItems = [
      {"barcode": "ITEM000001",
      "name": "Diet Coke",
      "price": 3.00 ,
      "unit": 'bottle',
      "count": 3,
      "Subtotal": 6.00+"(yuan)"}];

    let expected = calculateReceiptTotal(receipItems);
    expect(expected).toEqual({"Total":6.00+"(yuan)"});
  });
  
  it('should calculate receipt savings', () => {
    const receipItems = [
      {"barcode": "ITEM000001",
      "name": "Diet Coke",
      "price": 3.00 ,
      "unit": 'bottle',
      "count": 3,
      "Subtotal": 6.00+"(yuan)"}];

    let expected = calculateReceiptSavings(receipItems);
    expect(expected).toEqual({"Savings":3.00+"(yuan)"});
  });
    
  it('should render receipt', () => {
    const receipt = "Name：Coca-Cola，Quantity：3 bottles，Unit：3.00(yuan)，Subtotal：6.00(yuan)";
      receipt
    let expected = calculateReceiptSavings(receipItems);
    expect(expected).toEqual("***<store earning no money>Receipt ***"+
    "Name：Coca-Cola，Quantity：3 bottles，Unit：3.00(yuan)，Subtotal：6.00(yuan)"+
    "----------------------"+
    "Total：6(yuan)"+
    "Discounted prices：3(yuan)"+
    "**********************`");
  });

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
